import TypeWriterTitle from "@/components/TypeWriterTitle";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-semibold text-5xl text-center">
          AI <span className="text-yellow-600 font-bold"> Note Taking </span>Assistant
        </h1>
        <div className="mt-4">
          <h2 className="font-semibold text-3xl text-center text-slate-700">
           <TypeWriterTitle />
          </h2>
        </div>
        <div className="mt-8 flex justify-center">
          <Link 
            href="/dashboard"
          >
            <Button className="bg-yellow-600 hover:bg-yellow-800">
              Get started
              <ArrowRight className="w-5 h-5 ml-2 animate-pulse" strokeWidth={3}/>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
