'use client';
import { useEffect } from 'react';
const RotatingText =  ({ quote1, quote2, quote3 }: { quote1: string, quote2: string, quote3: string }) => {
  
  const quotes = [quote1, quote2, quote3];
  const randomNumber = Math.floor(Math.random() * quotes.length);
  const str = quotes[randomNumber];
  
  useEffect(() => {
    const textElement = document.getElementById("text");
    if (textElement) {
      for (let i = 0; i < str.length; i++) {
        let span = document.createElement('span');
        span.innerHTML = str[i];
        textElement.appendChild(span);
        span.style.transform = `rotate(${11 * i}deg)`;
      }
    }
  }, [quote1, quote2, quote3]);

  return (
    <div className="circleanimation absolute top-3 z-10">
    <div id="text" className="relative inline-block">
    </div></div>
  );
};

export default RotatingText;