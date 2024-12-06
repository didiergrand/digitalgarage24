import React from 'react'
import Image from 'next/image';


const Portrait = () => {
  return (
    <>
    <div className='flex flex-row items-center justify-center h-full'>   
      <Image src='/didiergrand.jpg' alt='portrait' width={900} height={960} priority />
    </div>
    </>
  )
}

export default Portrait;