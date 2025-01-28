import React from 'react';

const Header = () => {
    return (
        <header className="bg-blue-600 text-white p-4">
            <h1 className="text-2xl">School Name</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li><a href="#about">About</a></li>
                    <li><a href="#activities">Activities</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
