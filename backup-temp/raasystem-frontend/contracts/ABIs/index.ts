// /abis/index.ts
import dotenv from 'dotenv';
dotenv.config();

import {
  getRaaskoinInstance,
  getRaastokenInstance,
  getRabexInstance,
  getRaaspayInstance,
  getGoldPriceOracleInstance,
  getRaaswalletInstance,
} from './contractAPI';

export {
  getRaaskoinInstance,
  getRaastokenInstance,
  getRabexInstance,
  getRaaspayInstance,
  getGoldPriceOracleInstance,
  getRaaswalletInstance,
};
