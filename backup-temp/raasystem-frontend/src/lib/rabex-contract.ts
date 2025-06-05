import { ethers } from "ethers";
import { getSigner, toEthAddress } from "@/lib/xdc";

// Replace with your actual deployed Rabex contract address
const RABEX_ADDRESS = "0xa10d7d11e86dc791f70cfb73f248d2068ac23ea3";

const RABEX_ABI = [
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "addLiquidity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "removeLiquidity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenIn", type: "address" },
      { internalType: "address", name: "tokenOut", type: "address" },
      { internalType: "uint256", name: "amountIn", type: "uint256" },
    ],
    name: "swap",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenIn", type: "address" },
      { internalType: "address", name: "tokenOut", type: "address" },
    ],
    name: "getPrice",
    outputs: [{ internalType: "uint256", name: "price", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

export const getRabexContract = async (): Promise<ethers.Contract> => {
  const signer = await getSigner();
  return new ethers.Contract(RABEX_ADDRESS, RABEX_ABI, signer);
};

// Optional helper: get token price
export const getTokenPrice = async (
  tokenIn: string,
  tokenOut: string
): Promise<string> => {
  const contract = await getRabexContract();
  const rawPrice = await contract.getPrice(toEthAddress(tokenIn), toEthAddress(tokenOut));
  return ethers.formatEther(rawPrice);
};
