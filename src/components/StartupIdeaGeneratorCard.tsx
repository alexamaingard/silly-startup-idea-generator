import { useRef, useState } from 'react';

import { generateSillyIdea } from '../generator';
import ReactConfetti from 'react-confetti';

export const StartupIdeaGeneratorCard = () => {
  const [generatedIdea, setGeneratedIdea] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);
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

  return (
    <>
      <div>
        {generatedIdea}
        <button onClick={handleOnGenerate}>
          Generate!
        </button>
      </div>
      {showConfetti && (
        <ReactConfetti
          key={confettiKey} // force remount on each click
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={250}
          gravity={0.25}
          wind={0.01}
          initialVelocityX={{ min: -10, max: 10 }}
          initialVelocityY={{ min: -10, max: 0 }}
        />
      )}
    </>
  );
};
