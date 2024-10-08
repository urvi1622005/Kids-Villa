import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact';
import ToyLab from './components/ToyLab';
import VirtualPlayground from './components/VirtualPlayground';
import FloatingNavbar from './components/FloatingNavbar';
import MovingBackground from './components/MovingBackground';

const App = () => {
  return (
    <Router>
      <div className="font-sans bg-gray-900 text-white min-h-screen">
        <MovingBackground />
        <FloatingNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/toy-lab" element={<ToyLab />} />
          <Route path="/virtual-playground" element={<VirtualPlayground />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;