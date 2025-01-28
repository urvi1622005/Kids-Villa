import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ActivitiesSection from './components/ActivitiesSection';
import ContactSection from './components/ContactSection';
import './App.css';

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Header />
            <HeroSection />
            <AboutSection />
            <ActivitiesSection />
            <ContactSection />
            <div>
                <h1>Vite + React</h1>
                <div className="card">
                    <button onClick={() => setCount((count) => count + 1)}>
                        count is {count}
                    </button>
                    <p>
                        Edit <code>src/App.jsx</code> and save to test HMR
                    </p>
                </div>
                <p className="read-the-docs">
                    Click on the Vite and React logos to learn more
                </p>
            </div>
        </>
    );
}

export default App;
