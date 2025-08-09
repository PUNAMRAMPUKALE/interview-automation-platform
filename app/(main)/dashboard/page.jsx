import React from 'react'
import { getUserOnboardingStatus } from "@/actions/user";

const IndustryInsightsPage = async() => {

  const { isOnboarded } = await getUserOnboardingStatus();
  return (
    <div>
      IndustryInsightsPage
    </div>
  )
}

export default IndustryInsightsPage;
