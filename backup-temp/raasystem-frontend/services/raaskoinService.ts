// /frontend/services/raaskoinService.ts
import { ethers } from "ethers";
import { getRaaskoinContract } from "@/abis/contractAPI";

export const getBalance = async (address: string): Promise<string> => {
  const contract = getRaaskoinContract();
  if (!contract) return "0";
  const balance = await contract.balanceOf(address);
  return ethers.utils.formatUnits(balance, 18);
};

export const transferTokens = async (
  recipient: string,
  amount: string
): Promise<void> => {
  const contract = getRaaskoinContract();
  if (!contract) throw new Error("Contract not loaded");
  const value = ethers.utils.parseUnits(amount, 18);
  const tx = await contract.transfer(recipient, value);
  await tx.wait();
};

export const approveSpender = async (
  spender: string,
  amount: string
): Promise<void> => {
  const contract = getRaaskoinContract();
  if (!contract) throw new Error("Contract not loaded");
  const value = ethers.utils.parseUnits(amount, 18);
  const tx = await contract.approve(spender, value);
  await tx.wait();
};
