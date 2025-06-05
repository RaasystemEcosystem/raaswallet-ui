import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

// Connect to user's wallet and return the signer
export const getSigner = async (): Promise<ethers.Signer> => {
  if (!window.ethereum) {
    throw new Error("XDC wallet not detected");
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.BrowserProvider(window.ethereum);
  return provider.getSigner();
};

// Get current connected wallet address
export const getWalletAddress = async (): Promise<string> => {
  const signer = await getSigner();
  return signer.getAddress();
};

// Convert XDC address to Ethereum-compatible format (if needed)
export const toEthAddress = (xdcAddress: string): string => {
  return xdcAddress.startsWith("xdc")
    ? "0x" + xdcAddress.slice(3)
    : xdcAddress;
};

// Convert Ethereum-style address to XDC-style (optional)
export const toXdcAddress = (ethAddress: string): string => {
  return ethAddress.startsWith("0x")
    ? "xdc" + ethAddress.slice(2)
    : ethAddress;
};

