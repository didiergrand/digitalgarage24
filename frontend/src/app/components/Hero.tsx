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

    return () => clearInterval(interval);
  }, [charIndex, textIndex, texts]);

  return (
    <section className='relative top-48 sm:h-screen mx-auto'>
      <div className='flex flex-col gap-8 sm:flex-row sm:h-full'>
        <div className='w-full sm:w-1/2'>
          <div className='hidden sm:block'>
            <Portrait />
          </div>
        </div>
        
        <div className='w-full sm:w-1/2'>
          <p className='h-6 sm:h-8 text-[2rem] sm:text-[3rem] font-bold'>
            {currentText.split('').map((char, index) => (
              <span key={index} className="fade-in-char">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </p>
          <p className='h1'>Didier Grand</p> 
          <h1 className='text-2xl font-bold'>Frontend Developer & Team Lead<br></br>Enthusiast of Sports and Innovative Digital Solutions Projects<br></br>Aspiring Digital Project Manager</h1>
        </div>
      </div>

      <div className='sm:hidden'>
        <Portrait />
      </div>
    </section>
  );
};

export default Hero;