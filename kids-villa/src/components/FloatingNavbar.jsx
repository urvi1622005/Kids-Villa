import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from "framer-motion";

const FloatingNavbar = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      transition: { duration: 2, repeat: Infinity },
    });
  }, [controls]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-4"
      initial={{ y: -100 }}
      animate={controls}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <motion.h1
            className="text-3xl font-bold"
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
          >
            Kids Villa Toys
          </motion.h1>
        </Link>
        <ul className="flex space-x-4">
          {[
            { name: 'Home', path: '/' },
            { name: 'Toy Lab', path: '/toy-lab' },
            { name: 'Virtual Playground', path: '/virtual-playground' },
            { name: 'Contact', path: '/contact' },
          ].map((item) => (
            <motion.li key={item.name} whileHover={{ scale: 1.1, y: -5 }}>
              <Link to={item.path} className="hover:text-yellow-300">
                {item.name}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};

export default FloatingNavbar;