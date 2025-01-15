import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

const VirtualPlayground = () => {
  const [basketPosition, setBasketPosition] = useState(window.innerWidth / 2);
  const [toy, setToy] = useState(null);
  const [points, setPoints] = useState(0);
  const [speed, setSpeed] = useState(1); // Slower initial speed
  const [gameOver, setGameOver] = useState(false);
  const [basketSize, setBasketSize] = useState(50); // Initial basket size

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && basketPosition > 0) {
        setBasketPosition((prev) => prev - 20);
      } else if (e.key === 'ArrowRight' && basketPosition < window.innerWidth - basketSize) {
        setBasketPosition((prev) => prev + 20);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [basketPosition, basketSize]);

  useEffect(() => {
    if (gameOver) return;

    // Falling toy logic
    const interval = setInterval(() => {
      setToy((prevToy) => {
        if (!prevToy) {
          // Generate a new toy if no toy exists
          return {
            id: Date.now(),
            x: Math.random() * (window.innerWidth - 30),
            y: 0,
            emoji: ['🚗', '🎈', '🧸', '🪀'][Math.floor(Math.random() * 4)],
          };
        }

        const updatedToy = { ...prevToy, y: prevToy.y + speed };

        // Check for collision with the basket
        if (
          updatedToy.y >= window.innerHeight - 100 &&
          updatedToy.x >= basketPosition - 30 &&
          updatedToy.x <= basketPosition + basketSize
        ) {
          setPoints((prev) => {
            const newPoints = prev + 1;

            // Increase basket size every 5 points
            if (newPoints % 5 === 0) {
              setBasketSize((prevSize) => prevSize + 10);
            }

            return newPoints;
          });
          setSpeed((prev) => prev + 0.1); // Gradual speed increase
          return null; // Remove toy after collection
        }

        // Game over if the toy falls beyond the screen
        if (updatedToy.y > window.innerHeight) {
          setGameOver(true);
          clearInterval(interval);
        }

        return updatedToy;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [speed, gameOver, basketPosition, basketSize]);

  const restartGame = () => {
    setGameOver(false);
    setToy(null);
    setPoints(0);
    setSpeed(1);
    setBasketSize(50);
    setBasketPosition(window.innerWidth / 2);
  };

  return (
    <section className="bg-gradient-to-b from-purple-900 to-indigo-900 min-h-screen relative overflow-hidden">
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          className="text-4xl font-bold text-center mb-8 text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Virtual Playground
        </motion.h1>
        {gameOver ? (
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-2xl font-bold">Game Over!</p>
            <p className="text-xl mt-4">Your Score: {points}</p>
            <motion.button
              onClick={restartGame}
              className="mt-6 bg-yellow-400 text-purple-900 font-bold py-2 px-4 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Restart Game
            </motion.button>
          </motion.div>
        ) : (
          <>
            <p className="text-center text-white mb-4">Score: {points}</p>
            <motion.div
              className="text-4xl absolute"
              style={{
                left: basketPosition,
                bottom: '20px',
                width: `${basketSize}px`,
                height: '30px',
              }}
            >
              🧺
            </motion.div>
            {toy && (
              <motion.div
                className="text-4xl absolute"
                style={{ left: toy.x, top: toy.y }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {toy.emoji}
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default VirtualPlayground;
