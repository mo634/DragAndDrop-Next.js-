import React from 'react'
import DropZone from './components/DropZone'

const page = () => {
  return (
    <div className='flex justify-center items-center h-screen'><DropZone
      className="flex justify-center items-center w-[250px] h-[250px] bg-[#eee] rounded-md border-2 border-dashed border-gray-400 text-black"
    /></div>
  )
}

export default page