import React from 'react';
import { 
  FaLock, FaMedal, FaWallet, FaCreditCard, 
  FaChartLine, FaNetworkWired, FaQrcode 
} from 'react-icons/fa';

const WalletFeatures = () => (
  <section className="my-8 p-8 bg-white rounded-lg shadow-md max-w-xl mx-auto">
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
);

const WalletDashboard = () => {
  const walletAddress = "0x0917e5a68aafeb031002691248082b6a1854fad0";
  const balance = 250.75;

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-900">Raaswallet</h1>

        <section className="mb-8 text-center">
          <p className="text-gray-700 mb-2">Your Wallet Address:</p>
          <p className="font-mono text-lg text-indigo-700">{walletAddress}</p>
          <p className="mt-4 text-gray-800 text-xl font-semibold">Balance: {balance} RAK</p>
        </section>

        <WalletFeatures />

        <footer className="text-center text-gray-400 mt-12 text-sm">
          © 2025 Raasystem Team
        </footer>
      </div>
    </main>
  );
};

export default WalletDashboard;
