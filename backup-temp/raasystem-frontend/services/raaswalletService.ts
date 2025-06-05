import { getRaaswalletInstance } from '../contracts/getContractInstances';

let walletContract: ReturnType<typeof getRaaswalletInstance> | null = null;

const getInstance = () => {
  if (!walletContract) {
    walletContract = getRaaswalletInstance();
  }
  return walletContract;
};

/**
 * Fetch the current token balance of a user from Raaswallet.
 * @param address - Wallet address
 * @returns Token balance as a string
 */
export const fetchWalletBalance = async (address: string): Promise<string> => {
  try {
    const contract = getInstance();
    const balance = await contract.methods.getWalletBalance(address).call();
    return balance;
  } catch (error) {
    console.error('Error fetching wallet balance from Raaswallet:', error);
    throw error;
  }
};

/**
 * Check if a wallet address is registered in the Raaswallet contract.
 * @param address - Wallet address
 * @returns Boolean string ("true" or "false")
 */
export const isWalletRegistered = async (address: string): Promise<string> => {
  try {
    const contract = getInstance();
    const isRegistered = await contract.methods.isRegistered(address).call();
    return isRegistered;
  } catch (error) {
    console.error('Error checking wallet registration:', error);
    throw error;
  }
};
