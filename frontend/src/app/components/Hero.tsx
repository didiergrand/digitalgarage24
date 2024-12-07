'use client'
import Portrait from './Portrait';
import { useState, useEffect } from 'react';




const Hero = () => {
  const texts = ["Hi, I'm", "Bonjour, je suis"];
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (charIndex < texts[textIndex].length) {
        setCurrentText((prev) => prev + texts[textIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentText('');
          setCharIndex(0);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }, 3000);
      }
    }, 100);

    return() => clearInterval(interval);
  }, [charIndex, textIndex, texts]);
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
          <h1 className='h-8 text-[3rem] font-bold'>
            {currentText.split('').map((char, index) => (
              <span key={index} className="fade-in-char">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
          <h1>Didier Grand</h1> 
          <p className='text-2xl font-bold'>Frontend Develoer & Team Lead<br></br>Enthusiast of Sports and Innovative Digital Solutions Projects<br></br>Aspiring Digital Project Manager</p>
        </div>
      </div>

      {/* Portrait below on mobile, hidden on desktop */}
      <div className='md:hidden'>
        <Portrait />
      </div>

    </section>
  ) 
}

export default Hero