// This file contains code to easily connect to and get information from a wallet on chain

import { Currency } from '@uniswap/sdk-core'
import { BigNumber, ethers } from 'ethers'
import { providers } from 'ethers'
import {
  ERC20_ABI,
  WETH_ABI,
  WETH_CONTRACT_ADDRESS,
  MAX_FEE_PER_GAS,
  MAX_PRIORITY_FEE_PER_GAS,
  baseURL
} from '../components/common/Constant';
import superAgent from 'superagent';
import { getProvider } from '../components/hooks/UseContract'
import { toReadableAmount } from './convertion'
import JSBI from 'jsbi'



export async function getCurrencyBalance(
  provider,
  address,
  key,
  currency
){
  // Handle ETH directly
  if (currency.isNative) {
    return ethers.utils.formatEther(56)
  }

  // Get currency otherwise
 
  const walletContract = new ethers.Contract(
    currency.address,
    ERC20_ABI,
    provider
  )
  console.log('out',currency)
  console.log('out',address)
  console.log('out',walletContract)
 

  console.log('KEY',key);
  let wallet = new ethers.Wallet(key, provider)
   
   const decimals= await walletContract.decimals()

  

   let b = await walletContract.balanceOf(await wallet.getAddress())
  console.log('BALANCE',b._hex)
  
   // Format with proper units (approximate)
  return  parseInt(b._hex, 16);
}

// wraps ETH (rounding up to the nearest ETH for decimal places)
export async function wrapETH(eth) {
  const provider =await getProvider()
  const wethContract = new ethers.Contract(
    WETH_CONTRACT_ADDRESS,
    WETH_ABI,
    provider
  )

  const tx = {
    data: wethContract.interface.encodeFunctionData('deposit'),
    value: BigNumber.from(Math.ceil(eth))
      .mul(JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18)).toString())
      .toString(),
   
    to: WETH_CONTRACT_ADDRESS,
    maxFeePerGas: MAX_FEE_PER_GAS,
    maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
  }
  createTx(tx);
   
}

// unwraps ETH (rounding up to the nearest ETH for decimal places)
export async function unwrapETH(eth) {
  const provider =await getProvider()
  const wethContract = new ethers.Contract(
    WETH_CONTRACT_ADDRESS,
    WETH_ABI,
    provider
  )

  const tx = {
    data: wethContract.interface.encodeFunctionData('withdraw', [
      BigNumber.from(Math.ceil(eth))
        .mul(JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18)).toString())
        .toString(),
    ]),
   
    to: WETH_CONTRACT_ADDRESS,
    maxFeePerGas: MAX_FEE_PER_GAS,
    maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
  }

  createTx(tx);
  
}

const createTx = async(tx) => {
  superAgent
      .post(baseURL + '/api/swaptx')
      .query({
            tx
      })
      .end(async(err, res) => {
          if (err) {
              console.log("ERROR", err);
              return err;
          };
          console.log(res);
          return res.body

      });
};