'use client';
import { useEffect } from 'react';

const ProgressBar = ({ value, line }: { value: number, line: string }) => {
useEffect(() => {
    const progressBar = document.querySelector(`.progress-bar[data-line="${line}"]`) as HTMLElement;
    
    if (progressBar) {
        progressBar.style.width = value + '%';
    }
}, [value]);

return (
    <>
        <div className="progress skill-bar">
            <div
                className="progress-bar progress-bar-primary"
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={100}
                data-line={line}
            >
        </div>
        <div className="in-progress">In progress : {value}% completed</div>
    </div>
    </>
);
};

export default ProgressBar;

// https://codepen.io/jh3y/pen/LYBdKXE