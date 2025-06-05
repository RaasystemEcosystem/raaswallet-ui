// /scripts/demoUsage.ts
import dotenv from 'dotenv';
dotenv.config();

import {
  fetchRaaskoinBalance,
  fetchRaaskoinTotalSupply,
  fetchRaastokenTotalSupply,
  fetchRaaswalletOwner,
} from '../services';

const runDemo = async () => {
  const userAddress = '0x123...'; // Replace with actual address

  const raaskoinBalance = await fetchRaaskoinBalance(userAddress);
  console.log(`Raaskoin Balance: ${raaskoinBalance}`);

  const raaskoinSupply = await fetchRaaskoinTotalSupply();
  console.log(`Raaskoin Total Supply: ${raaskoinSupply}`);

  const raastokenSupply = await fetchRaastokenTotalSupply();
  console.log(`Raastoken Total Supply: ${raastokenSupply}`);

  const walletOwner = await fetchRaaswalletOwner();
  console.log(`Raaswallet Contract Owner: ${walletOwner}`);
};

runDemo().catch(console.error);
