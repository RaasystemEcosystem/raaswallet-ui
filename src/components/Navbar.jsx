// src/components/Navbar.jsx
import React, { useState } from 'react';
import { RiSunLine, RiMenu3Line, RiCloseLine } from 'react-icons/ri';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <a href="/" className="text-xl font-bold text-indigo-700">Raaswallet</a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
          <a href="/download" className="hover:text-indigo-600">Download</a>
          <a href="/assets" className="hover:text-indigo-600">Assets</a>
          <a href="/raaspay" className="hover:text-indigo-600">Raaspay</a>
          <a href="/rabex" className="hover:text-indigo-600">Rabex</a>
          <a href="/features" className="hover:text-indigo-600">Features</a>
          <a href="/docs" className="hover:text-indigo-600">Docs</a>
          <a href="/about" className="hover:text-indigo-600">About</a>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="text-sm text-indigo-600 border border-indigo-600 rounded px-3 py-1 hover:bg-indigo-600 hover:text-white">
            Connect Wallet
          </button>
          <select className="text-sm bg-transparent border-none outline-none">
            <option>🌐 EN</option>
            <option>FR</option>
            <option>SW</option>
          </select>
          <button className="text-gray-600 hover:text-yellow-500">
            <RiSunLine className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-600 hover:text-indigo-700 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <RiCloseLine className="w-6 h-6" /> : <RiMenu3Line className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu with Animation */}
      <div
        className={`md:hidden bg-white border-t border-gray-200 transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen ? 'max-h-screen py-4' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col px-6 space-y-4 text-sm font-medium text-gray-700">
          {[
            { label: 'Download', href: '/download' },
            { label: 'Assets', href: '/assets' },
            { label: 'Raaspay', href: '/raaspay' },
            { label: 'Rabex', href: '/rabex' },
            { label: 'Features', href: '/features' },
            { label: 'Docs', href: '/docs' },
            { label: 'About', href: '/about' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="hover:text-indigo-600"
              onClick={handleLinkClick}
            >
              {label}
            </a>
          ))}

          <hr className="border-gray-200" />

          <button className="text-sm text-indigo-600 border border-indigo-600 rounded px-3 py-1 hover:bg-indigo-600 hover:text-white">
            Connect Wallet
          </button>
          <select className="text-sm bg-gray-100 p-1 rounded">
            <option>🌐 EN</option>
            <option>FR</option>
            <option>SW</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
