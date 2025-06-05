import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { motion } from 'framer-motion';
import { FaWallet, FaCoins } from 'react-icons/fa'; // Icons for wallet and balance

const RaaswalletSummary = () => (
  <div className="mb-6 p-6 bg-gray-800 text-gray-100 rounded-lg shadow-xl">
    <strong className="block text-xl font-bold text-white">Raaswallet</strong>
    <p className="text-sm mt-2">
      The secure, non-custodial gateway to the Raasystem ecosystem. Seamlessly manage gold-backed Raaskoin, Raastoken, major crypto assets, and make effortless payments through Raaspay. Integrated with Rabex, enabling advanced trading and liquidity management.
    </p>
  </div>
);

const WalletConnect = ({ walletAddress, balance, onConnect, walletLink }) => {
  const [showQRCode, setShowQRCode] = useState(false);

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-gradient-to-b from-blue-900 to-blue-700 text-white rounded-2xl shadow-2xl">
      <RaaswalletSummary />

      {walletAddress ? (
        <div className="mt-6 p-6 bg-gray-700 rounded-lg shadow-xl">
          <div className="flex items-center mb-4">
            <FaWallet size={24} className="text-blue-400 mr-3" />
            <p className="text-xl font-semibold">
              <strong>Wallet Address:</strong> {walletAddress}
            </p>
          </div>
          <div className="flex items-center">
            <FaCoins size={24} className="text-green-400 mr-3" />
            <p className="text-lg">
              <strong>Balance:</strong> {balance} RAK
            </p>
          </div>

          {/* Microinteraction: Checkmark when wallet is connected */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-green-500 text-lg font-medium"
          >
            ✔ Wallet Connected
          </motion.div>
        </div>
      ) : (
        <div className="text-center mt-8">
          <button
            onClick={onConnect}
            className="w-full py-4 text-lg font-semibold text-blue-600 bg-white rounded-full hover:bg-blue-100 transition transform hover:scale-105 shadow-xl mb-4"
          >
            Connect Wallet
          </button>

          <button
            onClick={() => setShowQRCode(!showQRCode)}
            className="text-blue-200 font-medium text-lg hover:underline"
          >
            {showQRCode ? 'Hide QR Code' : 'Show QR Code'}
          </button>

          {/* QR Code with smooth fade-in animation */}
          {showQRCode && walletLink && (
            <motion.div
              className="mt-6 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <QRCode value={walletLink} size={256} fgColor="#5A5A5A" />
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
