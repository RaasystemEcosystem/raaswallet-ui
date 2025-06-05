import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import RaaspayABI from '../abi/Raaspay.json';
import BaseLayout from '../components/BaseLayout'; // ✅ Use BaseLayout instead of Navbar

const RAASPAY_ADDRESS = '0xD7F5D1651C4dFb659abe57E0F946BFfffF1eFf74';

const Raaspay = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3Instance.eth.getAccounts();
        const raaspayContract = new web3Instance.eth.Contract(RaaspayABI, RAASPAY_ADDRESS);

        setWeb3(web3Instance);
        setContract(raaspayContract);
        setAccount(accounts[0]);
      }
    };
    init();
  }, []);

  const handleTransfer = async () => {
    if (contract && account && recipient && amount) {
      try {
        const result = await contract.methods.transfer(
          recipient,
          web3.utils.toWei(amount, 'ether')
        ).send({ from: account });

        console.log('Transfer successful:', result);
        alert('Transfer successful!');
      } catch (error) {
        console.error('Transfer failed:', error);
        alert('Transfer failed.');
      }
    }
  };

  return (
    <BaseLayout>
      <div className="max-w-xl mx-auto p-6 mt-8 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Raaspay Portal</h2>
        <p className="text-gray-600 mb-4">Connected Wallet: <span className="font-mono">{account}</span></p>

        <input
          type="text"
          placeholder="Recipient Address"
          className="block border border-gray-300 p-3 rounded mb-3 w-full"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount (in ETH units)"
          className="block border border-gray-300 p-3 rounded mb-4 w-full"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          onClick={handleTransfer}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded"
        >
          Transfer Now
        </button>
      </div>
    </BaseLayout>
  );
};

export default Raaspay;
