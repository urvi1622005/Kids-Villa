import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { IconRocket, IconBalloon, IconBuildingCastle, IconCar } from "@tabler/icons-react";

const MovingBackground = () => {
  const [stars, setStars] = useState([]);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    const starCount = 100;
    const toyCount = 20;
    const newStars = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
    setStars(newStars);

    const toyIcons = [IconBalloon, IconRocket, IconBuildingCastle, IconCar];
    const newToys = Array.from({ length: toyCount }, (_, i) => ({
      id: i,
      Icon: toyIcons[Math.floor(Math.random() * toyIcons.length)],
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      rotation: Math.random() * 360,
    }));
    setToys(newToys);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{ x: star.x, y: star.y, opacity: 0 }}
          animate={{
            x: [star.x, star.x + Math.random() * 10 - 5],
            y: [star.y, star.y + Math.random() * 10 - 5],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
        />
      ))}
      {toys.map((toy) => (
        <motion.div
          key={toy.id}
          className="absolute text-primary-500"
          initial={{ x: toy.x, y: toy.y, rotate: toy.rotation, opacity: 0 }}
          animate={{
            x: [toy.x, toy.x + Math.random() * 100 - 50],
            y: [toy.y, toy.y + Math.random() * 100 - 50],
            rotate: [toy.rotation, toy.rotation + 360],
            opacity: [0, 0.5, 0],
          }}
          transition={{ duration: 10 + Math.random() * 5, repeat: Infinity }}
        >
          <toy.Icon size={24} />
        </motion.div>
      ))}
    </div>
  );
};

export default MovingBackground;