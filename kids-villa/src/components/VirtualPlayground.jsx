import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

const VirtualPlayground = () => {
  const [basketPosition, setBasketPosition] = useState(window.innerWidth / 2);
  const [toys, setToys] = useState([]);
  const [points, setPoints] = useState(0);
  const [speed, setSpeed] = useState(2);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && basketPosition > 0) {
        setBasketPosition((prev) => prev - 20);
      } else if (e.key === 'ArrowRight' && basketPosition < window.innerWidth - 50) {
        setBasketPosition((prev) => prev + 20);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [basketPosition]);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setToys((prevToys) => {
        const updatedToys = prevToys.map((toy) => ({
          ...toy,
          y: toy.y + speed,
        }));

        // Check for missed toys
        const missedToys = updatedToys.filter((toy) => toy.y > window.innerHeight);
        if (missedToys.length > 0) {
          setGameOver(true);
          clearInterval(interval);
        }

        return updatedToys.filter((toy) => toy.y <= window.innerHeight);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [speed, gameOver]);

  useEffect(() => {
    if (gameOver) return;

    const toyInterval = setInterval(() => {
      const newToy = {
        id: Date.now(),
        x: Math.random() * (window.innerWidth - 50),
        y: 0,
        emoji: ['🚗', '🎈', '🧸', '🪀'][Math.floor(Math.random() * 3)],
      };
      setToys((prev) => [...prev, newToy]);
    }, 1000);

    return () => clearInterval(toyInterval);
  }, [gameOver]);

  useEffect(() => {
    // Collision detection
    setToys((prevToys) =>
      prevToys.filter((toy) => {
        const isCollected =
          toy.y >= window.innerHeight - 100 &&
          toy.x >= basketPosition - 30 &&
          toy.x <= basketPosition + 50;

        if (isCollected) {
          setPoints((prev) => prev + 1);
          if ((points + 1) % 5 === 0) {
            setSpeed((prev) => prev + 0.5); // Increase speed every 5 points
          }
        }

        return !isCollected;
      })
    );
  }, [basketPosition, points]);

  const restartGame = () => {
    setGameOver(false);
    setToys([]);
    setPoints(0);
    setSpeed(2);
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
              }}
            >
              🧺
            </motion.div>
            {toys.map((toy) => (
              <motion.div
                key={toy.id}
                className="text-4xl absolute"
                style={{ left: toy.x, top: toy.y }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {toy.emoji}
              </motion.div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default VirtualPlayground;
