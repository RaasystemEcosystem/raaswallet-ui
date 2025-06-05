import dotenv from 'dotenv';
dotenv.config();

import {
  getRaaskoinInstance,
  getRaastokenInstance,
  getRabexInstance,
  getRaaspayInstance,
  getGoldPriceOracleInstance
} from './contractAPI';

// Load contract addresses from .env
const contractAddressRaaskoin = process.env.RAASKOIN_ADDRESS!;
const contractAddressRaastoken = process.env.RAASTOKEN_ADDRESS!;
const contractAddressRabex = process.env.RABEX_ADDRESS!;
const contractAddressRaaspay = process.env.RAASPAY_ADDRESS!;
const contractAddressGoldPriceOracle = process.env.GOLDPRICEORACLE_ADDRESS!;

// ---- Raaskoin Example ----
const raaskoinContract = getRaaskoinInstance(contractAddressRaaskoin);

const getRaaskoinBalance = async (address: string) => {
  try {
    const balance = await raaskoinContract.methods.balanceOf(address).call();
    console.log(`Raaskoin balance of ${address}: ${balance}`);
  } catch (error) {
    console.error('Raaskoin balance error:', error);
  }
};

// ---- Raastoken Example ----
const raastokenContract = getRaastokenInstance(contractAddressRaastoken);

const getRaastokenTotalSupply = async () => {
  try {
    const supply = await raastokenContract.methods.totalSupply().call();
    console.log(`Total Raastoken supply: ${supply}`);
  } catch (error) {
    console.error('Raastoken supply error:', error);
  }
};

// ---- Rabex Example ----
const rabexContract = getRabexInstance(contractAddressRabex);

const getRabexOrderBookDepth = async () => {
  try {
    const depth = await rabexContract.methods.getOrderBookDepth().call(); // Replace with actual method
    console.log(`Rabex order book depth: ${depth}`);
  } catch (error) {
    console.error('Rabex interaction error:', error);
  }
};

// ---- Raaspay Example ----
const raaspayContract = getRaaspayInstance(contractAddressRaaspay);

const getMerchantBalance = async (merchant: string) => {
  try {
    const balance = await raaspayContract.methods.getMerchantBalance(merchant).call(); // Replace with actual method
    console.log(`Raaspay merchant balance: ${balance}`);
  } catch (error) {
    console.error('Raaspay balance error:', error);
  }
};

// ---- GoldPriceOracle Example ----
const oracleContract = getGoldPriceOracleInstance(contractAddressGoldPriceOracle);

const getCurrentGoldPrice = async () => {
  try {
    const price = await oracleContract.methods.getLatestPrice().call();
    console.log(`Current gold price (oracle): ${price}`);
  } catch (error) {
    console.error('Gold price oracle error:', error);
  }
};

// ---- Run Some Tests ----
(async () => {
  const userAddress = '0xYourTestAddressHere'; // Replace with actual address

  await getRaaskoinBalance(userAddress);
  await getRaastokenTotalSupply();
  await getRabexOrderBookDepth();
  await getMerchantBalance(userAddress); // or a test merchant address
  await getCurrentGoldPrice();
})();
