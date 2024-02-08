// Import necessary modules
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { generateImage, generateImagePrompt } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { defineServerAction, defineAction } from "next/server";

// Define type for the response body
interface NoteIdResponse {
  note_id: number;
}

export const runtime = "edge";

export const createNoteBook = defineServerAction(
  async ({ req }) => {
    try {
      // Check authentication
      const { userId } = auth();
      console.log("userId:", userId);
      if (!userId) {
        throw new Error("Unauthorized");
      }

      // Retrieve and log request body
      const body = await req.json();
      console.log("Request Body:", body);
      const { name } = body;

      // Generate image description
      const image_description = await generateImagePrompt(name);
      console.log("Image Description:", image_description);
      if (!image_description) {
        console.error("Failed to generate image description");
        throw new Error("Failed to generate image description");
      }

      // Generate image
      const image_url = await generateImage(image_description);
      console.log("Image URL:", image_url);
      if (!image_url) {
        console.error("Failed to generate image");
        throw new Error("Failed to generate image");
      }

      // Insert into the database
      const note_ids = await db
        .insert($notes)
        .values({
          name,
          userId,
          imageUrl: image_url,
        })
        .returning({
          insertedId: $notes.id,
        });

      console.log("Inserted Note IDs:", note_ids);

      // Explicitly specify the type of the response body
      const responseBody: NoteIdResponse = {
        note_id: note_ids[0].insertedId,
      };

      // Return JSON response
      return defineAction({
        status: 200,
        json: responseBody,
      });
    } catch (error) {
      console.error("Error in createNoteBook endpoint:", error);
      // Log more details about the error
      console.error(error);

      // Return Internal Server Error
      throw new Error("Internal Server Error");
    }
  }
);
