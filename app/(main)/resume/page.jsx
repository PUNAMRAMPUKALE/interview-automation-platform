// app/(main)/resume/page.jsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { auth } from "@clerk/nextjs/server";      // ✅ server-safe
import { getResume } from "@/actions/resume";
import ResumeBuilder from "./_components/resume-builder"; // client component
import { safeProtect } from "@/lib/authSafe.server";

export default async function ResumePage() {
 safeProtect();
  const resume = await getResume();

  return (
    <div className="container mx-auto py-6">
      <ResumeBuilder initialContent={resume?.content || ""} />
    </div>
  );
}
