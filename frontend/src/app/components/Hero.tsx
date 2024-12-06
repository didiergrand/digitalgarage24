import { motion } from 'framer-motion';
import Portrait from './Portrait';


const Hero = () => {
  return (
    <section className='relative top-48 h-screen mx-auto'>
      {/* Desktop: side-by-side columns, Mobile: stacked */}
      <div className='flex flex-col gap-8 md:flex-row h-full'>
        {/* Left column with Portrait (visible only on desktop) */}
        <div className='w-full md:w-1/2'>
          <div className='hidden md:block'>
            <Portrait />
          </div>
        </div>
        
        {/* Right column */}
        <div className='w-full md:w-1/2'>
          {/* Add your content for the right column */}
          <h1>Hi, I&apos;m <br/><span>Didier Grand</span></h1> 
          <p className='text-2xl'>Frontend Develoer & Team Lead<br></br>Enthusiast of Sports and Innovative Digital Solutions Projects<br></br>Aspiring Digital Project Manager</p>
        </div>
      </div>

      {/* Portrait below on mobile, hidden on desktop */}
      <div className='md:hidden'>
        <Portrait />
      </div>

      {/* Gradient overlay */}
      <div className='absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-transparent to-black'></div>
    </section>
  ) 
}

export default Hero