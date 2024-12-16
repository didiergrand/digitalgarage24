'use client'
import React from 'react';
import Image from 'next/image';
import Tilt from 'react-parallax-tilt';

const cards = [
  {
    image: "/skills-dev.png",
    alt: "Front-end Developer",
    title: "Front-end Developer"
  },
  {
    image: "/skills-designer.png",
    alt: "UX/UI Designer",
    title: "UX/UI Designer"
  },
  {
    image: "/skills-project.png",
    alt: "Digital Project Manager",
    title: "Digital Project Manager"
  },
  {
    image: "/skills-photgraphy.png",
    alt: "Photographer",
    title: "Photographer"
  }
];

const TiltCard = () => {
  return (
    <>
      {cards.map((card, index) => (
        <Tilt key={index}>
          <div className="flex flex-col items-center justify-center bg-black rounded-lg text-center p-10 max-w-[60vw] min-h-96 sm:max-w-full">
            <Image 
              src={card.image} 
              alt={card.alt} 
              width={280} 
              height={234} 
              className="max-w-full"
            />
            <h3 className="text-white uppercase">{card.title}</h3>
          </div>
        </Tilt>
      ))}
    </>
  )
}

export default TiltCard;