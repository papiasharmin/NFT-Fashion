import React, { useCallback, useEffect, useState } from 'react'
import './../../assets/css/App.css'
import { CurrentConfig } from '../../utils/config'
import { getCurrencyBalance, wrapETH } from '../../utils/walletinfoswap'
import { getProvider } from '../hooks/UseContract'
import { executeRoute, generateRoute } from './../../utils/routing'
import { SwapRoute } from '@uniswap/smart-order-router'
import SwapVertIcon from '@mui/icons-material/SwapVert';

import ActionButton from '../common/ActionButton'

import LoadingIndicator from '../common/LoadingIndicator';
import { useMyContext } from './../../Contexts';





const Example = () => {
  const [tokenInBalance, setTokenInBalance] = useState(0);
  const [tokenOutBalance, setTokenOutBalance] = useState(0);
  const [tokenOutAmt, setTokenOutAmt] = useState(0);
  const [tokenInAmt, setTokenInAmt] = useState(0);
  const [route, setRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [slippage,setSlippage] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [tokenOut, setTokenOut] = useState(null);

  const {
    currentAccount,
    key
} = useMyContext();



  // Update wallet state given a block number
  const refreshBalances = useCallback(async () => {
    const provider = await getProvider()
    let d =await getCurrencyBalance(provider, currentAccount, key, CurrentConfig.tokens.in);
    let ot = await getCurrencyBalance(provider, currentAccount, key, CurrentConfig.tokens.out)
    console.log('frommainout',d,ot)
    setTokenInBalance(d)
    setTokenOutBalance(ot)
  }, [])


  const onCreateRoute = useCallback(async () => {
    setRoute(await generateRoute(currentAccount))
  }, [])

  const executeSwap = useCallback(async (route) => {
    if (!route) {
      return
    }

  }, [])

  useEffect(()=>{
    // const route = onCreateRoute()
    // console.log(route)
    refreshBalances()

  },[])

  return (
    <div>
                        {isLoading ? (
                            
                                <div className="loading">
                                    <p><LoadingIndicator/></p>
                                    <h3>Please Wait・・・・</h3>
                                </div>
                           
                        ) : ( 
                            <>
                              <div
                                
                              >
                              <div style={{display:'flex',justifyContent:'center', alignItems:'center', border:'1px sold gray',borderRadius:'10px', gap:'10px'}}>
                                  <label>Slippage：</label>
                                  <input
                                                id="Slippage" 
                                                placeholder="50%" 
                                                margin="normal" 
                                                required
                                                onChange={ (e) => setSlippage(e.target.value) } 
                                               
                                                

                                  />
                                  <label>Transaction Deadline：</label>
                                  <input
                                                id="TransactionDeadline" 
                                                placeholder="Time" 
                                                margin="normal" 
                                                required
                                                onChange={ (e) => setDeadline(e.target.value) } 
                                             
                                  />
                              </div>
                                
                              <div
                      
                                          
                              >
                                 
                                            <p><strong>Token In</strong></p>
                                            <div style={{display:'flex',justifyContent:'center', alignItems:'center', gap:'10px'}}> 
                                              <input
                                                id="tokeninamt" 
                                                placeholder="AMOUNT" 
                                                margin="normal" 
                                                required
                                                onChange={ (e) => setTokenInAmt(e.target.value) } 
                                           
                                              />
                                              <button onClick={()=>{}} > MTN Token</button>
                                            </div>
                                            <div style={{display:'flex',justifyContent:'flex-end', alignItems:'center', width:'100%'}}>
                                              
                                              <p style={{fontSize:'12px',marginRight:'20px'}}>Balance : {`${tokenInBalance}`}</p>

                                            </div>

                                            

                                          
                                 
                                </div>
                                           
                                <SwapVertIcon/>
                                <div
                                >
                                        
                                            <p><strong>Token Out</strong></p>
                                            <div style={{display:'flex',justifyContent:'center', alignItems:'center', gap:'10px'}}> 
                                              <input
                                                id="tokenoutamt" 
                                                placeholder="AMOUNT" 
                                                margin="normal" 
                                                required
                                                onChange={ (e) => setTokenOutAmt(e.target.value) } 
                                             
                                              />
                                               <ActionButton buttonName="DAI Token" color="primary" clickAction={()=>{}} />
                                            </div>
                                              <div style={{display:'flex',justifyContent:'flex-end', alignItems:'center', width:'100%'}}>
                                              
                                                      
                                              <p style={{fontSize:'12px', marginRight:'20px'}}>Balance : {`${tokenOutBalance}`}</p>

                                              </div>

                                           

                                          
                                              
                              </div>
                              <p>
                                    {route &&
                                         `Route: ${CurrentConfig.currencies.amountIn} ${
                                         CurrentConfig.currencies.in.symbol
                                    } to ${route.quote.toExact()} ${
                                  route.quote.currency.symbol
                                  } using $${route.estimatedGasUsedUSD.toExact()} worth of gas`}
                              </p>
                              <p>
                                 {route &&
                                    route.route
                                   .map((r) => r.tokenPath.map((t) => t.symbol).join(' -> '))
                                  .join(', ')}
                               </p>
                              <button onClick={route? executeRoute: onCreateRoute}>{route ? 'Swap': 'Create Route'}</button>
                                            
                             </div>        
                             
                               
                     </>
                        )}
                    </div>

  )
}

export default Example


// {route &&
//   `Route: ${CurrentConfig.tokens.amountIn} ${
//     CurrentConfig.tokens.in.symbol
//   } to ${route.quote.toExact()} ${
//     route.quote.currency.symbol
//   } using $${route.estimatedGasUsedUSD.toExact()} worth of gas`}

// {route &&
//   route.route
//     .map((r) => r.tokenPath.map((t) => t.symbol).join(' -> '))
//     .join(', ')}


// (
//   <div className="App">


//     <h3>{`Block Number: ${blockNumber + 1}`}</h3>
//     <h3>{`Transaction State: ${''}`}</h3>
//     <h3>{`Token In (${CurrentConfig.tokens.in.symbol}) Balance: ${tokenInBalance}`}</h3>
//     <h3>{`Token Out (${CurrentConfig.tokens.out.symbol}) Balance: ${tokenOutBalance}`}</h3>
//     <button
//       onClick={onCreateRoute}
//       disabled={
//         //txState === TransactionState.Sending ||
//         getProvider() === null 
//       }>
//       <p>Create Route</p>
//     </button>
//     <h3>

//     </h3>
//     <h3>
   
//     </h3>
//     <button
//       onClick={() => wrapETH(100)}
//       disabled={getProvider() === null }>
//       <p>Wrap ETH</p>
//     </button>
//     <button
//       onClick={() => executeSwap(route)}
//       disabled={
//         //txState === TransactionState.Sending ||
//         getProvider() === null ||
       
//         route === null
//       }>
//       <p>Swap Using Route</p>
//     </button>
//   </div>
// )