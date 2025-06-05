import Web3 from 'web3';
import dotenv from 'dotenv';
import RaaskoinABI from './abis/Raaskoin.json';
import RaastokenABI from './abis/Raastoken.json';
import RabexABI from './abis/Rabex.json';
import RaaspayABI from './abis/Raaspay.json';
import GoldPriceOracleABI from './abis/GoldPriceOracle.json';

dotenv.config();

// Initialize Web3 (you can also inject your provider like MetaMask)
const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

// Load contract addresses from environment variables
const {
  RAASKOIN_ADDRESS,
  RAASTOKEN_ADDRESS,
  RABEX_ADDRESS,
  RAASPAY_ADDRESS,
  GOLDPRICEORACLE_ADDRESS
} = process.env;

// Define contract getters
export const getRaaskoinInstance = () =>
  new web3.eth.Contract(RaaskoinABI as any, RAASKOIN_ADDRESS);

export const getRaastokenInstance = () =>
  new web3.eth.Contract(RaastokenABI as any, RAASTOKEN_ADDRESS);

export const getRabexInstance = () =>
  new web3.eth.Contract(RabexABI as any, RABEX_ADDRESS);

export const getRaaspayInstance = () =>
  new web3.eth.Contract(RaaspayABI as any, RAASPAY_ADDRESS);

export const getGoldPriceOracleInstance = () =>
  new web3.eth.Contract(GoldPriceOracleABI as any, GOLDPRICEORACLE_ADDRESS);
