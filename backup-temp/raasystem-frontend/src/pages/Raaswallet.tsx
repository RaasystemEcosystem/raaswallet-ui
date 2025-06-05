import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

const RAASWALLET_ADDRESS = "0xd6709aa1b0225830eb7a3a5c0fc43770bd8094e5";

const RAASWALLET_ABI = [
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
];

declare global {
  interface Window {
    ethereum?: any;
  }
}

const Raaswallet: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [symbol, setSymbol] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return alert("Please install MetaMask");
      const accounts: string[] = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  const loadWalletData = async () => {
    if (!account || !window.ethereum) return;
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(RAASWALLET_ADDRESS, RAASWALLET_ABI, provider);
      const [decimals, tokenSymbol, rawBalance] = await Promise.all([
        contract.decimals(),
        contract.symbol(),
        contract.balanceOf(account),
      ]);
      setSymbol(tokenSymbol);
      setBalance(ethers.utils.formatUnits(rawBalance, decimals));
    } catch (error) {
      console.error("Error loading wallet data:", error);
    }
  };

  const transferTokens = async () => {
    if (!account || !recipient || !amount) return alert("Please fill all fields.");
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(RAASWALLET_ADDRESS, RAASWALLET_ABI, signer);
      const decimals = await contract.decimals();
      const tx = await contract.transfer(recipient, ethers.utils.parseUnits(amount, decimals));
      await tx.wait();
      alert("✅ Transfer successful!");
      setRecipient("");
      setAmount("");
      await loadWalletData();
    } catch (error) {
      console.error("Transfer failed:", error);
      alert("❌ Transfer failed");
    }
  };

  useEffect(() => {
    if (account) loadWalletData();
  }, [account]);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow space-y-6">
      <h2 className="text-xl font-bold">🦊 Raaswallet Interface</h2>

      {!account ? (
        <button
          onClick={connectWallet}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <p><strong>Connected:</strong> {account}</p>
          <p><strong>Balance:</strong> {balance} {symbol}</p>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Recipient address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
            <button
              onClick={transferTokens}
              className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Send Tokens
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Raaswallet;


