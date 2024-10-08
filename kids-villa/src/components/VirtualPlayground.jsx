import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

const VirtualPlayground = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [toys, setToys] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'ArrowUp':
          setPosition(prev => ({ ...prev, y: prev.y - 10 }));
          break;
        case 'ArrowDown':
          setPosition(prev => ({ ...prev, y: prev.y + 10 }));
          break;
        case 'ArrowLeft':
          setPosition(prev => ({ ...prev, x: prev.x - 10 }));
          break;
        case 'ArrowRight':
          setPosition(prev => ({ ...prev, x: prev.x + 10 }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addToy = () => {
    const newToy = {
      id: Date.now(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      emoji: ['🚗', '🎈', '🧸', '🪀'][Math.floor(Math.random() * 4)]
    };
    setToys(prev => [...prev, newToy]);
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
      {toys.map(toy => (
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