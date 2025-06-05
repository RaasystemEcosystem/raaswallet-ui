import { getRaaspayInstance } from '../contracts/getContractInstances';

/**
 * Check if a given merchant is registered.
 */
export const isMerchantRegistered = async (merchantAddress: string): Promise<boolean> => {
  try {
    const raaspay = getRaaspayInstance();
    const isRegistered = await raaspay.methods.isMerchant(merchantAddress).call();
    return isRegistered;
  } catch (error) {
    console.error('Error checking merchant status in Raaspay:', error);
    throw error;
  }
};

/**
 * Fetch payment history or specific transaction details — you can add more based on your contract.
 */
