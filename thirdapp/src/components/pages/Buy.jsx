import React, { useState } from "react";
import superAgent from 'superagent';
import LoadingIndicator from '../common/LoadingIndicator';
import PaymentDialog from '../common/PaymentDialog';
import { useMyContext } from './../../Contexts';
import { baseURL } from "./../common/Constant";
import MainContainer from './../common/MainContainer';
import Header from './../common/header'

const Buy = (props) => {
      // create contract
      const {
            currentAccount
      } = useMyContext();

      const [isLoading, setIsLoading] = useState(false);
      const [successFlg, setSuccessFlg] = useState(false);
      const [failFlg, setFailFlg] = useState(false);
      const [showToast, setShowToast] = useState(false);
      const [amount, setAmount] = useState(0);
      const [open, setOpen] = useState(false);

      /**
       * Buy function 
       */
      const buyAction = async() => {
            setIsLoading(true);
            console.log('buyaction',amount);
            // IDQToken発行APIを呼び出す
            superAgent
                  .post(baseURL + '/api/mintToken')
                  .query({
                        to: currentAccount,
                        amount: amount
                  })
                  .end(async(err, res) => {
                        if (err) {
                              console.log("IDQToken発行用API呼び出し中に失敗", err);
                              // popUpメソッドの呼び出し
                              popUp(false, "failfull...");
                              setIsLoading(false);
                              return err;
                        }
                        // popUpメソッドの呼び出し
                        popUp(true, "successfull!!");
                        setIsLoading(false);   
                  });
      };


      const popUp = (flg) => {
            // 成功時と失敗時で処理を分岐する。
            if(flg === true) {
                  // ステート変数を更新する。
                  setSuccessFlg(true);
                  setShowToast(true);       
                  // 5秒後に非表示にする。
                  setTimeout(() => {
                        setSuccessFlg(false);
                        setShowToast(false);             
                  }, 5000);
            } else {
                  // ステート変数を更新する。
                  setFailFlg(true);
                  setShowToast(true);     
                  // 5秒後に非表示にする。
                  setTimeout(() => {
                        setFailFlg(false);
                        setShowToast(false);
                  }, 5000);
            }
      };

      /**
       * Open Dialog
       * @param wallet MultoSig Wallet Addr
       */
      const handleOpen = (wallet) => {
            setOpen(true);
      }

      /**
       * Close Dialog
       */
      const handleClose = () => {
            setOpen(false);
      }

   

      return (
            <>
                  { /* Payment Dialog */ } 

                 {open &&<PaymentDialog 
                        open={open} 
                        handleClose={(e) => {handleClose()}} 
                        buyAction={(e) => {buyAction()}}
                       
                  />}
  
                        {isLoading ? (
                          
                                    <div className="loading">
                                          <p><LoadingIndicator/></p>
                                          <h3>Please Wait・・・・</h3>
                                    </div>
                          
                        ) : ( 
                              <>
              
                                          <div className="parent-div">
                                          <Header/>
                                          <div className="buy-centerdiv">
                                                <p><strong>You can buy IDQ Token</strong></p>
                                                
                                                <input
                                                      id="amount" 
                                                      placeholder="enter amount" 
                                                 
                                                      required
                                                      onChange={ (e) => setAmount(e.target.value) } 
                                                    
                                                     
                                                />
                                                <button className='button' onClick={()=>{
                                                      if(!amount){

                                                      }
                                                
                                                       handleOpen()}} >Buy</button> 
                                          </div>
                                          </div>

                              </>
                        )}
                
                {successFlg && (
                        /* 成功時のポップアップ */
                        <div id="toast" className={showToast ? "zero-show" : ""}>
                              <div id="secdesc">Trasaction Successfull!!</div>
                        </div>
                )}
                {failFlg && (
                        /* 失敗時のポップアップ */
                        <div id="toast" className={showToast ? "zero-show" : ""}>
                              <div id="desc">Trasaction failfull..</div>
                        </div>
                )}
           </>
      );
};

export default Buy;