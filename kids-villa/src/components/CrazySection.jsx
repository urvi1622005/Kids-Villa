import React from 'react';
import { motion } from "framer-motion";

const CrazySection = () => (
  <section className="py-16 bg-gradient-to-b from-purple-900 to-indigo-900 text-white overflow-hidden">
    <div className="container mx-auto text-center relative">
      <motion.h2
        className="text-5xl font-bold mb-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Enter the Toy Dimension!
      </motion.h2>
      <motion.p
        className="text-xl mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Where imagination knows no bounds
      </motion.p>
      <motion.div
        className="relative inline-block"
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <button className="bg-yellow-400 text-purple-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-300 transition duration-300">
          Explore Now!
        </button>
      </motion.div>
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 40 + 20}px`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
        >
          🚀
        </motion.div>
      ))}
    </div>
  </section>
);

export default CrazySection;