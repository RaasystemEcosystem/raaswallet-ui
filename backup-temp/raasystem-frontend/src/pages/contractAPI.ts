// /frontend/abis/contractAPI.ts
import { ethers } from "ethers";
import RaaskoinABI from "./abis/Raaskoin.json";

const RAASKOIN_ADDRESS = "0xYourDeployedContractAddress";

export const connectWallet = async (): Promise<string | null> => {
  if (typeof window.ethereum === "undefined") return null;

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  return address;
};

export const getRaaskoinContract = (): ethers.Contract | null => {
  if (typeof window.ethereum === "undefined") return null;

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(RAASKOIN_ADDRESS, RaaskoinABI, signer);
};
