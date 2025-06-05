import { getGoldPriceOracleInstance } from '../contracts/getContractInstances';

let oracleContract: ReturnType<typeof getGoldPriceOracleInstance> | null = null;

const getInstance = () => {
  if (!oracleContract) {
    oracleContract = getGoldPriceOracleInstance();
  }
  return oracleContract;
};

export const fetchGoldPrice = async (): Promise<string> => {
  try {
    const contract = getInstance();
    const price = await contract.methods.getLatestGoldPrice().call();
    return price;
  } catch (error) {
    console.error('Error fetching gold price:', error);
    throw error;
  }
};
