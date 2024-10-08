import React, { useState } from 'react';
import { motion } from "framer-motion";

const ToyLab = () => {
  const [toyParts, setToyParts] = useState({
    head: '🤖',
    body: '🦄',
    legs: '🐘'
  });

  const partOptions = {
    head: ['🤖', '👽', '🦁', '🐰'],
    body: ['🦄', '🐢', '🦊', '🐼'],
    legs: ['🐘', '🦘', '🦙', '🐊']
  };

  const handlePartChange = (part, option) => {
    setToyParts(prev => ({ ...prev, [part]: option }));
  };

  return (
    <section className="py-16 bg-gradient-to-b from-purple-900 to-indigo-900 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Toy Lab: Create Your Own Toy!
        </motion.h1>
        <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
          <motion.div 
            className="text-center mb-8 text-6xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {toyParts.head}
            {toyParts.body}
            {toyParts.legs}
          </motion.div>
          {Object.entries(partOptions).map(([part, options]) => (
            <div key={part} className="mb-4">
              <h2 className="text-xl font-semibold mb-2 capitalize">{part}</h2>
              <div className="flex justify-center space-x-2">
                {options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handlePartChange(part, option)}
                    className="text-3xl bg-gray-700 p-2 rounded-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToyLab;