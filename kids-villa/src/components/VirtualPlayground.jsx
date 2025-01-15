import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

const VirtualPlayground = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 }); // Start position
  const [toys, setToys] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      setPosition((prev) => {
        let newPosition = { ...prev };
        switch (e.key) {
          case 'ArrowUp':
            newPosition.y -= 10;
            break;
          case 'ArrowDown':
            newPosition.y += 10;
            break;
          case 'ArrowLeft':
            newPosition.x -= 10;
            break;
          case 'ArrowRight':
            newPosition.x += 10;
            break;
        }
        return newPosition;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    // Check for collision each time position changes
    setToys((prevToys) =>
      prevToys.filter((toy) => {
        const distance = Math.sqrt(
          Math.pow(position.x - toy.x, 2) + Math.pow(position.y - toy.y, 2)
        );
        return distance > 50; // Adjust this distance as needed
      })
    );
  }, [position]);

  const addToy = () => {
    const newToy = {
      id: Date.now(),
      x: Math.random() * (window.innerWidth - 50),
      y: Math.random() * (window.innerHeight - 50),
      emoji: ['🚗', '🎈', '🧸', '🪀'][Math.floor(Math.random() * 4)]
    };
    setToys((prev) => [...prev, newToy]);
  };

  return (
    <section className="bg-gradient-to-b from-purple-900 to-indigo-900 min-h-screen relative overflow-hidden">
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          className="text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Virtual Playground
        </motion.h1>
        <motion.p
          className="text-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Use arrow keys to move the player (👧) and collect toys!
        </motion.p>
        <motion.button
          onClick={addToy}
          className="block mx-auto mb-8 bg-yellow-400 text-purple-900 font-bold py-2 px-4 rounded-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add Random Toy
        </motion.button>
      </div>
      <motion.div
        className="text-4xl absolute"
        style={{ left: position.x, top: position.y }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        👧
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
    </section>
  );
};

export default VirtualPlayground;
