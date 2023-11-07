/**
 * 各種定数を管理するためのファイル
 */

import { SupportedChainId, Token } from '@uniswap/sdk-core'
console.log('evn',process.env.PROJECT_ID)

// contract Address (MyToken)
export const MYTOKEN_ADDRESS = "0x99E0601Eb3c7fc4d7ac807FaBde35C1FF38053D3";//"0x8AE069aCb6ddF7B32b92fef419d30c30e4ED9D95";//"0xf01605c54Cc3b0C45bbA011b028eF6e05C46Cc1e";//

// contract Address (WalletFactory)
export const CONTRACT_ADDRESS = "0xf2827c8B87eEe32C31208a9A3a09FB00E2223da9";//"0x80d6c044a4b9c1D969673cA750B669ADAAD9d5fe";//"0x3Bdf037317Af5be7f623cEb0b94FB9a5dD5480db";//
export const LOYALTY_CONTRACT_ADRESS = "0x0124c5Ee2614b64b10143CB8ae0CdE761347fa49"
// chain ID 
export const CHAIN_ID = '80001';//'11155111''1440002';//
// rpc URL 
export const RPC_URL = `https://polygon-mumbai.g.alchemy.com/v2/EgiLkcIuRCG4PwoZiyRTVkYMcZrT8ynP`;//`https://eth-sepolia.g.alchemy.com/v2/3fMr3CwsUtbgtcenWRgX9A0Cx9tkOfVr`;//`https://rpc-evm-sidechain.xrpl.org`;//
export const baseURL =`http://localhost:3001`;//`https://idq-api.vercel.app`;

export const THIRDWEB_CLIENT_ID='5a03bef726be21435934217a8422c761';
// PINTA API Base URL
export const PINTABaseURL = 'https://api.pinata.cloud';
// PINTA Gateway API Base URL
export const PINTAGatewayURL = 'https://gateway.pinata.cloud/ipfs';

export const WIDTH_THRESHOLD = 768;

/////
//swap token config
// Addresses

export const V3_SWAP_ROUTER_ADDRESS =
  '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45'
export const WETH_CONTRACT_ADDRESS =
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'

// Currencies and Tokens

// export const XRP_TOKEN = new Token(
//   SupportedChainId.POLYGON_MUMBAI,
//   '0xCc2a9051E904916047c26C90f41c000D4f273456',
//   6,
//   'XRP',
// )

export const MTN_TOKEN = new Token(
  80001,
  MYTOKEN_ADDRESS,
  18,
  'MTN',
  'MyToken'
)

export const USDC_TOKEN = new Token(
  80001,
  '0xFEca406dA9727A25E71e732F9961F680059eF1F9',
  6,
  'USDC',
  'USD//C'
)

export const DAI_TOKEN = new Token(
 80001,
  '0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F',
  18,
  'DAI',
  'Dai Stablecoin'
)

// ABI's

export const ERC20_ABI = [
  // Read-Only Functions
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',

  // Authenticated Functions
  'function transfer(address to, uint amount) returns (bool)',
  'function approve(address _spender, uint256 _value) returns (bool)',

  // Events
  'event Transfer(address indexed from, address indexed to, uint amount)',
]

export const WETH_ABI = [
  // Wrap ETH
  'function deposit() payable',

  // Unwrap ETH
  'function withdraw(uint wad) public',
]

// Transactions

export const MAX_FEE_PER_GAS = 100000000000
export const MAX_PRIORITY_FEE_PER_GAS = 100000000000
export const TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER = 10000