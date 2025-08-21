import { useEffect, useRef, useState } from 'react';

import { generateSillyIdea } from '../generator';
import ReactConfetti from 'react-confetti';

export const StartupIdeaGeneratorCard = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const [generatedIdea, setGeneratedIdea] = useState('');

  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);
  const [numberOfPieces, setNumberOfPieces] = useState(width <= 768 ? 200 : 400);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerConfetti = () => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setShowConfetti(true);
    setConfettiKey((prev) => prev + 1); // force remount

    // Fixed timeout to hide confetti after 5s.
    // Could calculate duration based on gravity, velocity and screen size
    // ==> (v0 + Math.sqrt(v0 * v0 + 2 * g * h)) / g
    // but a fixed delay is simpler and good enough for such a project.
    timeoutRef.current = setTimeout(() => {
      setShowConfetti(false);
      timeoutRef.current = null;
    }, 5000);
  };

  const handleOnGenerate = () => {
    setGeneratedIdea(generateSillyIdea());
    triggerConfetti();
  }

  useEffect(() => {
    const handleResize = () => {
      setNumberOfPieces(width <= 768 ? 100 : 200);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

  return (
    <>
      <div className='flex flex-col gap-30'>
        {generatedIdea && (
          <div className="text-4xl font-bold text-white text-center drop-shadow-lg reveal-text">
            {generatedIdea}
          </div>
        )}
        <button
          onClick={handleOnGenerate}
          className='relative px-6 py-3 rounded-lg bg-[#1c1f2b] text-white font-semibold gradient-border cursor-pointer self-center'
        >
          Generate!
        </button>
      </div>
      {showConfetti && (
        <ReactConfetti
          key={confettiKey} // force remount on each click
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={numberOfPieces}
          gravity={0.4}
          wind={0.01}
          initialVelocityX={{ min: -10, max: 10 }}
          initialVelocityY={{ min: -10, max: 0 }}
        />
      )}
    </>
  );
};
