import React from 'react';
import { motion } from "framer-motion";
import { IconCarousel } from "@tabler/icons-react";

const Header = () => (
  <header className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-3xl font-bold">Kids Villa Toys</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="#" className="hover:text-yellow-300">Home</a></li>
          <li><a href="#" className="hover:text-yellow-300">Toys</a></li>
          <li><a href="#" className="hover:text-yellow-300">About</a></li>
          <li><a href="#" className="hover:text-yellow-300">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
);

const HeroSection = () => (
  <section className="bg-gradient-to-b from-purple-500 to-purple-600 text-white py-20">
    <div className="container mx-auto text-center">
      <h2 className="text-5xl font-bold mb-4">Welcome to Toy Wonderland!</h2>
      <p className="text-xl mb-8">Discover a world of fun and imagination</p>
      <button className="bg-yellow-400 text-purple-700 font-bold py-2 px-6 rounded-full hover:bg-yellow-300 transition duration-300">
        Explore Toys
      </button>
    </div>
  </section>
);

const FeaturedToys = () => {
  const toys = [
    { id: 1, name: "Colorful Blocks", image: "https://i.imgur.com/XqDif6O.jpg", price: "$19.99" },
    { id: 2, name: "Plush Teddy Bear", image: "https://i.imgur.com/vIVQZ6R.jpg", price: "$24.99" },
    { id: 3, name: "Wooden Train Set", image: "https://i.imgur.com/bdx4XtH.jpg", price: "$34.99" },
    { id: 4, name: "Rainbow Xylophone", image: "https://i.imgur.com/qCEBqLL.jpg", price: "$29.99" },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-purple-600">Featured Toys</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {toys.map((toy) => (
            <motion.div
              key={toy.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img src={toy.image} alt={toy.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{toy.name}</h3>
                <p className="text-gray-600">{toy.price}</p>
                <button className="mt-4 bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition duration-300">
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonial = () => (
  <section className="bg-purple-100 py-16">
    <div className="container mx-auto text-center">
      <h2 className="text-4xl font-bold mb-8 text-purple-600">What Parents Say</h2>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
        <p className="text-xl mb-4">
          "Kids Villa Toys has the best selection of educational and fun toys. My children love every toy we've bought from here!"
        </p>
        <p className="font-semibold text-purple-600">- Sarah, Happy Parent</p>
      </div>
    </div>
  </section>
);

const Newsletter = () => (
  <section className="bg-gradient-to-r from-pink-500 to-purple-500 py-16">
    <div className="container mx-auto text-center">
      <h2 className="text-4xl font-bold mb-4 text-white">Stay Updated</h2>
      <p className="text-xl mb-8 text-white">Subscribe to our newsletter for the latest toy releases and exclusive offers</p>
      <form className="max-w-md mx-auto">
        <div className="flex">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-grow py-2 px-4 rounded-l-full focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            type="submit"
            className="bg-yellow-400 text-purple-700 font-bold py-2 px-6 rounded-r-full hover:bg-yellow-300 transition duration-300"
          >
            Subscribe
          </button>
        </div>
      </form>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-purple-800 text-white py-8">
    <div className="container mx-auto text-center">
      <p>&copy; 2023 Kids Villa Toys. All rights reserved.</p>
      <div className="mt-4">
        <a href="#" className="mx-2 hover:text-yellow-300">Privacy Policy</a>
        <a href="#" className="mx-2 hover:text-yellow-300">Terms of Service</a>
        <a href="#" className="mx-2 hover:text-yellow-300">Contact Us</a>
      </div>
    </div>
  </footer>
);

const App = () => {
  return (
    <div className="font-sans">
      <Header />
      <HeroSection />
      <FeaturedToys />
      <Testimonial />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default App;