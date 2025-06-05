// Import the service you created
import { fetchRaaskoinBalance } from '../services/raaskoinService';

const showBalance = async () => {
  const userAddress = '0x123...abc'; // Replace with the actual user's wallet address
  const balance = await fetchRaaskoinBalance(userAddress);
  console.log(`Balance: ${balance}`);
};
