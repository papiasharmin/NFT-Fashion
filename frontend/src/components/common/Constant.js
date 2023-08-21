/**
 * 各種定数を管理するためのファイル
 */

// contract Address (WalletFactory)
export const CONTRACT_ADDRESS = "0x8e1e5f5Ee60AbBEf21Ae80b5295D97b6f50227f7";
// contract Address (MyToken)
export const MYTOKEN_ADDRESS = "0x03816f4A868A3e11CE6D2e71811D78fF91477ee7";
// chain ID 
export const CHAIN_ID = '80001';
// rpc URL 
export const RPC_URL = `https://polygon-mumbai.g.alchemy.com/v2/${process.env.PROJECT_ID}`;
// API Base URL
export const baseURL = 'http://localhost:3001';
// PINTA API Base URL
export const PINTABaseURL = 'https://api.pinata.cloud';
// PINTA Gateway API Base URL
export const PINTAGatewayURL = 'https://gateway.pinata.cloud/ipfs';
// width threshold
export const WIDTH_THRESHOLD = 768;