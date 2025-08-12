import React from 'react'
import Header from "@/components/header";

const RootLayoutPage = ({children}) => {
    // Redirect user after Onboarding
    if (process.env.VERCEL) {
  console.log("Has Clerk PK at build?", Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY));
}
  return (
    <div className='container mx-auto mt-24 mb-20'>
        <Header />
      {children}
    </div>
  )
}

export default RootLayoutPage
