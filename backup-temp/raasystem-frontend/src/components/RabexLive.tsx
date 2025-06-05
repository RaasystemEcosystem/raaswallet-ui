'use client';

import React, { useEffect, useState } from 'react';
import { getRabexContract } from '@/lib/rabex-contract';

const RabexLive = () => {
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const contract = await getRabexContract();
        const currentPrice = await contract.getCurrentPrice(); // Example function
        setPrice(currentPrice.toString());
      } catch (err) {
        console.error(err);
      }
    };

    fetchPrice();
  }, []);

  return (
    <div className="text-white bg-gray-900 p-4 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-2">🔥 RABEX: The Beast</h2>
      <p>Current Price: {price} Raaskoin</p>
    </div>
  );
};

export default RabexLive;
