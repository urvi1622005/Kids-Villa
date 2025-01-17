import React, { useState } from 'react';
import { motion } from "framer-motion";

const ToyCard = ({ toy }) => (
  <motion.div
    className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    whileHover={{ scale: 1.05, rotate: [0, -2, 2, -2, 0] }}
    transition={{ duration: 0.3 }}
  >
    <img src={toy.image} alt={toy.name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2 text-white">{toy.name}</h3>
      <p className="text-yellow-400 font-bold">${toy.price.toFixed(2)}</p>
      <p className="text-gray-400 mt-2">{toy.category}</p>
      <motion.button
        className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700 transition duration-300"
        whileTap={{ scale: 0.95 }}
      >
        Add to Cart
      </motion.button>
    </div>
  </motion.div>
);

const ToyCategories = () => {
  const categories = ['Action Figures', 'Board Games', 'Building Blocks', 'Dolls', 'Educational', 'Outdoor'];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const toys = [
    { id: 1, name: "Space Explorer", image: "../src/assets/stunt.jpeg", price: 600, category: "Action Figures" },
    { id: 2, name: "Cuddly Bear", image: "../src/assets/babyDoll.jpeg", price: 400, category: "Dolls" },
    { id: 3, name: "Wooden Train", image: "../src/assets/thomastrack.jpeg", price: 550, category: "Building Blocks" },
    { id: 4, name: "Rainbow Xylophone", image: "../src/assets/studybook.jpeg", price: 450, category: "Educational" },
    { id: 5, name: "Superhero Squad", image: "../src/assets/melody.jpeg", price: 350, category: "Action Figures" },
    { id: 6, name: "Puzzle Master", image: "../src/assets/musicduck.jpeg", price: 420, category: "Board Games" },
    { id: 7, name: "Mega Blocks Set", image: "../src/assets/blocks.jpeg", price: 250, category: "Building Blocks" },
    { id: 8, name: "Soccer Ball", image: "../src/assets/teddyboy.jpeg", price: 300, category: "Outdoor" },
  ];

  const filteredToys = toys.filter(toy => toy.category === selectedCategory);

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Toy Categories</h2>
        <div className="flex justify-center space-x-4 mb-8">
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-full ${selectedCategory === category ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </motion.button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredToys.map((toy) => (
            <ToyCard key={toy.id} toy={toy} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToyCategories;