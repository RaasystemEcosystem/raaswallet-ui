import React from 'react';
import Navbar from '../components/Navbar'; // Adjust path if needed
import { FaLock, FaMedal, FaWallet, FaCreditCard, FaChartLine, FaNetworkWired, FaQrcode } from 'react-icons/fa';

const WalletLandingPage = () => {
  const walletAddress = "0x0917e5a68aafeb031002691248082b6a1854fad0";
  const balance = 250.75;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ✅ Reusable Navbar with mobile menu */}
      <Navbar />

      {/* Hero Section */}
      <header className="bg-indigo-700 text-white py-16 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Your Gateway to Raasystem</h1>
        <p className="text-lg max-w-xl mx-auto">Manage your Raaskoin, trade with Rabex, pay through Raaspay — all from one secure wallet.</p>
      </header>

      {/* Wallet Info */}
      <section className="text-center my-10 px-4">
        <h2 className="text-xl text-gray-700 mb-2">Your Wallet Address:</h2>
        <p className="font-mono text-lg text-indigo-700">{walletAddress}</p>
        <p className="mt-4 text-gray-800 text-xl font-semibold">Balance: {balance} RAK</p>
      </section>

      {/* Key Features */}
      <section className="my-8 p-8 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">Key Features</h2>
        <ul className="space-y-5 text-gray-700">
          <li className="flex items-start space-x-3">
            <FaLock className="text-green-600 mt-1 w-6 h-6 flex-shrink-0" />
            <p><strong>Secure & Non-Custodial:</strong> You control your keys and funds.</p>
          </li>
          <li className="flex items-start space-x-3">
            <FaMedal className="text-yellow-500 mt-1 w-6 h-6 flex-shrink-0" />
            <p><strong>Gold-Backed Assets:</strong> Manage Raaskoin and Raastoken backed by gold.</p>
          </li>
          <li className="flex items-start space-x-3">
            <FaWallet className="text-purple-600 mt-1 w-6 h-6 flex-shrink-0" />
            <p><strong>Multi-Crypto Support:</strong> Handle major cryptocurrencies effortlessly.</p>
          </li>
          <li className="flex items-start space-x-3">
            <FaCreditCard className="text-blue-500 mt-1 w-6 h-6 flex-shrink-0" />
            <p><strong>Integrated Payments:</strong> Use Raaspay for smooth transactions.</p>
          </li>
          <li className="flex items-start space-x-3">
            <FaChartLine className="text-indigo-600 mt-1 w-6 h-6 flex-shrink-0" />
            <p><strong>Advanced Trading:</strong> Powered by Rabex AI trading platform.</p>
          </li>
          <li className="flex items-start space-x-3">
            <FaNetworkWired className="text-teal-600 mt-1 w-6 h-6 flex-shrink-0" />
            <p><strong>Ecosystem Gateway:</strong> Access all Raasystem DeFi services.</p>
          </li>
          <li className="flex items-start space-x-3">
            <FaQrcode className="text-gray-800 mt-1 w-6 h-6 flex-shrink-0" />
            <p><strong>QR Code Wallet Connect:</strong> Quick and secure wallet linking.</p>
          </li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-400 mt-12 mb-4 text-sm">
        © 2025 Raasystem Team • <a href="/terms" className="underline">Terms</a> • <a href="/privacy" className="underline">Privacy</a>
      </footer>
    </div>
  );
};

export default WalletLandingPage;
