import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getSigner, toEthAddress } from "@/lib/xdc";

// Replace with your deployed Raaswallet contract address
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

export const useRaaswallet = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");

  // Connect wallet
  const connect = async () => {
    try {
      const address = await getWalletAddress();
      setAccount(address);
    } catch (err) {
      console.error("Wallet connection error:", err);
    }
  };

  // Load balance & token info
  const load = async () => {
    if (!account) return;

    try {
      const signer = await getSigner();
      const contract = new ethers.Contract(
        RAASWALLET_ADDRESS,
        RAASWALLET_ABI,
        signer
      );

      const [rawBalance, decimals, tokenSymbol] = await Promise.all([
        contract.balanceOf(account),
        contract.decimals(),
        contract.symbol(),
      ]);

      setBalance(ethers.formatUnits(rawBalance, decimals));
      setSymbol(tokenSymbol);
    } catch (err) {
      console.error("Failed to load wallet data:", err);
    }
  };

  // Transfer tokens
  const transfer = async (recipient: string, amount: string) => {
    if (!account) throw new Error("Wallet not connected");

    try {
      const signer = await getSigner();
      const contract = new ethers.Contract(
        RAASWALLET_ADDRESS,
        RAASWALLET_ABI,
        signer
      );

      const decimals: number = await contract.decimals();
      const tx = await contract.transfer(
        toEthAddress(recipient),
        ethers.parseUnits(amount, decimals)
      );

      await tx.wait();
      await load(); // Refresh balance
      return true;
    } catch (err) {
      console.error("Transfer failed:", err);
      return false;
    }
  };

  useEffect(() => {
    if (account) load();
  }, [account]);

  return {
    account,
    balance,
    symbol,
    connect,
    transfer,
  };
};

// Utility to get wallet address using the XDC helper
const getWalletAddress = async (): Promise<string> => {
  const signer = await getSigner();
  return signer.getAddress();
};
