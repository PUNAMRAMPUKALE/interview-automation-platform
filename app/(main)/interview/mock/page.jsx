export const dynamic = "force-dynamic";
export const revalidate = 0;

import { auth } from "@clerk/nextjs/server";     // ✅server-safe
import OnboardingForm from "../../onboarding/_components/onboarding-form";
import { industries } from "@/data/industries";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import { safeProtect } from "@/lib/authSafe.server";

export default async function OnboardingPage() {
 safeProtect();

  const { isOnboarded } = await getUserOnboardingStatus();
  if (isOnboarded) {
    redirect("/dashboard");
  }

  return (
    <main>
      <OnboardingForm industries={industries} />
    </main>
  );
}
