import Web3 from 'web3';

// ABI Imports
import RaaskoinABI from '../abi/Raaskoin.json';
import RaastokenABI from '../abi/Raastoken.json';
import RabexABI from '../abi/Rabex.json';
import RaaspayABI from '../abi/Raaspay.json';
import GoldPriceOracleABI from '../abi/GoldPriceOracle.json';

// Your XDC Network Web3 Provider URL
const web3 = new Web3(new Web3.providers.HttpProvider('https://rpc.xdc.org'));

const getContractInstance = (contractAddress: string, abi: any) => {
  return new web3.eth.Contract(abi, contractAddress);
};

// Example: Interacting with Raaskoin contract
export const getRaaskoinInstance = (contractAddress: string) => {
  return getContractInstance(contractAddress, RaaskoinABI);
};

// Example: Interacting with Raastoken contract
export const getRaastokenInstance = (contractAddress: string) => {
  return getContractInstance(contractAddress, RaastokenABI);
};

// Example: Interacting with Rabex contract
export const getRabexInstance = (contractAddress: string) => {
  return getContractInstance(contractAddress, RabexABI);
};

// Example: Interacting with Raaspay contract
export const getRaaspayInstance = (contractAddress: string) => {
  return getContractInstance(contractAddress, RaaspayABI);
};

// Example: Interacting with GoldPriceOracle contract
export const getGoldPriceOracleInstance = (contractAddress: string) => {
  return getContractInstance(contractAddress, GoldPriceOracleABI);
};
