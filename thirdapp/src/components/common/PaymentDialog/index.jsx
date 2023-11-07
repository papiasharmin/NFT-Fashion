
import React from 'react';
import PaymentElement from '../PaymentElement';
import ActionButton from "./../ActionButton";
import './PaymentDialog.CSS';

/**
 * PaymentDialogコンポーネント
 * @param props 引数
 */
const PaymentDialog = (props) => {
      // 引数から値を取得する。
      const { 
            open, 
            handleClose, 
            buyAction
      } = props;
      
      return (
            <>
                  <div className='pay-centerdiv'>
                        <p>
                              Payment Page
                        </p>
                        <div>
                              <div style={{width:'inherit'}}>
                                    <PaymentElement/>
                              </div>
                        </div>
                        <div>
                              <button className='button' onClick={buyAction}>Pay</button> 
                        </div>
                  </div>
            </>
      );
};

export default PaymentDialog;