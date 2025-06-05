import { useState, useEffect } from "react";
import { ethers } from "ethers";
import raaskoinAbi from "../abis/Raaskoin.json";

const contractAddress = "0x1f1ddc9ecC8a82267188c699f472B70D599a3055";

export const useRaaskoin = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState<string | null>(null);
  const [tokenName, setTokenName] = useState("");
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [decimals, setDecimals] = useState(18);

  const connectWallet = async () => {
    if (!window.ethereum) throw new Error("MetaMask not found");
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const address = accounts[0];
    const _provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = _provider.getSigner();
    const raaskoinContract = new ethers.Contract(contractAddress, raaskoinAbi, signer);

    const name = await raaskoinContract.name();
    const rawBalance = await raaskoinContract.balanceOf(address);
    const _decimals = await raaskoinContract.decimals();

    setWalletAddress(address);
    setProvider(_provider);
    setContract(raaskoinContract);
    setTokenName(name);
    setDecimals(_decimals);
    setBalance(ethers.utils.formatUnits(rawBalance, _decimals));
  };

  return { walletAddress, balance, tokenName, provider, contract, decimals, connectWallet };
};
