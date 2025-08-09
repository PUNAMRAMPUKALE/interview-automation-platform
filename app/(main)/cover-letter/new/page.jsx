import { Button } from "@/components/ui/button";
import CoverLetterGenerator from "../_components/cover-letter-generator";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";








export default function NewCoverLetterPage() {

  return (

<div className="container mx-auto py-6">
      <div className="flex flex-col space-y-2">


        <Link href="/cover-letter">
          <Button variant="link" className="gap-2 pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Cover Letters
          </Button>
        </Link>

        <div className="pb-6">
          <h1 className="text-6xl font-bold gradient-title">
            Generate Cover Letter
          </h1>
          <p className="text-muted-foreground">
            Create a tailored cover letter according to job application
          </p>
        </div>

      </div>

      <CoverLetterGenerator />
      
    </div>
  );
}