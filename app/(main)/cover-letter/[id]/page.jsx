import React from 'react'

const CoverLetter = async ({params}) => {
   const Id= await params.id
  return (
    <div>
      Cover Id:{Id}
    </div>
  )
}

export default CoverLetter
