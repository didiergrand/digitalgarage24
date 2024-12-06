import React from 'react'
import Image from 'next/image';

import { SectionWrapper } from '../hoc'

const Portrait = () => {
  return (
    <>
    <div className='flex flex-row items-center justify-center h-full'>   
      <Image src='/didiergrand.jpg' alt='portrait' width={900} height={960} priority />
    </div>
    </>
  )
}

export default SectionWrapper(Portrait, "portrait")