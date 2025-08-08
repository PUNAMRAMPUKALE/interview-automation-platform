import React from 'react'

const RootLayoutPage = ({children}) => {
    // Redirect user after Onboarding
  return (
    <div className='container mx-auto mt-24 mb-20'>
      {children}
    </div>
  )
}

export default RootLayoutPage
