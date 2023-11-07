import {
    AlphaRouter,
    POLYGON_MUMBAI,
    SwapOptionsSwapRouter02,
    SwapRoute,
    SwapType,
  } from '@uniswap/smart-order-router'
  import { TradeType, CurrencyAmount, Percent, Token } from '@uniswap/sdk-core'
  import { CurrentConfig } from './config'
//   import {
//     getMainnetProvider,
//     getWalletAddress,
//     sendTransaction,
//     TransactionState,
//     getProvider,
//   } from './providers'
   import { getProvider, mainnetProvider } from './../components/hooks/UseContract'
  import {
    MAX_FEE_PER_GAS,
    MAX_PRIORITY_FEE_PER_GAS,
    ERC20_ABI,
    TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER,
    V3_SWAP_ROUTER_ADDRESS,
    baseURL,
  } from  './../components/common/Constant'
  import { fromReadableAmount } from './convertion'
  import { ethers } from 'ethers';
  import superAgent from 'superagent';
 

  
  export async function generateRoute(walletaddr) {
    const router = new AlphaRouter({
      chainId: 137,
      provider: mainnetProvider,
    })
  
    const options = {
      recipient: walletaddr,
      slippageTolerance: new Percent(50, 10_000),
      deadline: Math.floor(Date.now() / 1000 + 1800),
      type: SwapType.SWAP_ROUTER_02,
    }

    console.log('ROUTER',router, options)
  
    const route = await router.route(
      CurrencyAmount.fromRawAmount(
        CurrentConfig.tokens.in,
        
        CurrentConfig.tokens.amountIn
      ),
      CurrentConfig.tokens.out,
      TradeType.EXACT_INPUT,
      options
    )

    console.log('ROUTE',route)
  
    return route
  }
  
  export async function executeRoute(
    route
  ){
    const tokenApproval = await getTokenTransferApproval(CurrentConfig.tokens.in)
  
    // Fail if transfer approvals do not go through
    if (tokenApproval) {
      return 'failed';
    }
  
    const tx = {
      data: route.methodParameters?.calldata,
      to: V3_SWAP_ROUTER_ADDRESS,
      value: route?.methodParameters?.value,
      maxFeePerGas: MAX_FEE_PER_GAS,
      maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
    }

    const res = await createTx(tx);
  
    return res
  }
  
  export async function getTokenTransferApproval(
    token
  ) {
    try {
      const provider = await getProvider();
      const tokenContract = new ethers.Contract(
        token.address,
        ERC20_ABI,
        provider
      )
  
      const transaction = await tokenContract.populateTransaction.approve(
        V3_SWAP_ROUTER_ADDRESS,
        fromReadableAmount(
          TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER,
          token.decimals
        ).toString()
      )

      const tx = {...transaction}
      createTx(tx)
    } catch (e) {
      console.error(e)
      return e
    }
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


  // fromReadableAmount(
  //   CurrentConfig.tokens.amountIn,
  //   CurrentConfig.tokens.in.decimals
  // ).toString()