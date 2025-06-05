import { getRaaspayInstance } from '../contracts/getContractInstances';

let raaspayContract: ReturnType<typeof getRaaspayInstance> | null = null;

const getInstance = () => {
  if (!raaspayContract) {
    raaspayContract = getRaaspayInstance();
  }
  return raaspayContract;
};

export const fetchMerchantBalance = async (merchantAddress: string): Promise<string> => {
  try {
    const contract = getInstance();
    const balance = await contract.methods.getMerchantBalance(merchantAddress).call();
    return balance;
  } catch (error) {
    console.error('Error fetching merchant balance from Raaspay:', error);
    throw error;
  }
};
