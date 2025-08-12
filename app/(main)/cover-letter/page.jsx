// app/(main)/cover-letter/page.jsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { auth } from "@clerk/nextjs/server";
import { getCoverLetters } from "@/actions/cover-letter";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

// Load client component only in the browser (avoids touching Clerk during build)
const CoverLetterList = dynamic(
  () => import("./_components/cover-letter-list"),
  { ssr: false }
);

export default async function CoverLetterPage() {
  // Protect on the server (safe at build-time)
  auth().protect();

  const coverLetters = await getCoverLetters();

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title">My Cover Letters</h1>
        <Link href="/cover-letter/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create New
          </Button>
        </Link>
      </div>

      <CoverLetterList coverLetters={coverLetters} />
    </div>
  );
}
