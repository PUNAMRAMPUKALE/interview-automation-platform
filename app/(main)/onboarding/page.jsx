export const dynamic = "force-dynamic";
export const revalidate = 0;

import { auth } from "@clerk/nextjs/server";
import OnboardingForm from "./_components/onboarding-form";
import { industries } from "@/data/industries";
import { getUserOnboardingStatus, updateUser } from "@/actions/user";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  auth().protect(); // safe at build/runtime

  const { isOnboarded } = await getUserOnboardingStatus();
  if (isOnboarded) {
    redirect("/dashboard");
  }

  // ⬇️ Pass the server action as a prop (don’t import it in the client file)
  return (
    <main>
      <OnboardingForm industries={industries} updateUserAction={updateUser} />
    </main>
  );
}
