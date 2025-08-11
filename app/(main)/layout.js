import React from 'react'
import Header from "@/components/header";

const RootLayoutPage = ({children}) => {
    // Redirect user after Onboarding
  return (
    <div className='container mx-auto mt-24 mb-20'>
        <Header />
      {children}
    </div>
  )
}

export default RootLayoutPage
