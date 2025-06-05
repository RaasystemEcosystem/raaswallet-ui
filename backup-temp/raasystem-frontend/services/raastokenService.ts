import { getRaastokenInstance } from '../contracts/getContractInstances';

/**
 * Fetches the total supply of Raastoken.
 */
export const fetchRaastokenTotalSupply = async (): Promise<string> => {
  try {
    const raastoken = getRaastokenInstance();
    const totalSupply = await raastoken.methods.totalSupply().call();
    return totalSupply;
  } catch (error) {
    console.error('Error fetching Raastoken total supply:', error);
    throw error;
  }
};

/**
 * Fetch balance of Raastoken for a given address.
 */
export const fetchRaastokenBalance = async (address: string): Promise<string> => {
  try {
    const raastoken = getRaastokenInstance();
    const balance = await raastoken.methods.balanceOf(address).call();
    return balance;
  } catch (error) {
    console.error('Error fetching Raastoken balance:', error);
    throw error;
  }
};
