
import React from 'react';
import ActionButton from "./../ActionButton";
import './WalletDialog.css';

/**
 * WalletDialogコンポーネント
 * @param props 引数
 */
const WalletDialog = (props) => {
    // 引数から値を取得する。
    const { 
        open, 
        amount, 
        handleClose, 
        depositAction, 
        setAmountAction
    } = props;

    return (
        <>
        <div className='overlay'></div>
            <div className='walletdetail'>
                <p>
                    Deposit to Wallet 
                </p>
                
                <div>
                    <p>
                            Plaese enter amount 
                    </p>
                       
                    <input
                                className='input'
                                id="component-simple" 
                                value={amount} 
                                onChange={setAmountAction} 
                                placeholder="0.00" 
                    />
                       
                </div>
                
                <div>
                    <button className='button' onClick={depositAction}>Deposit</button> 
                    <button className='button' onClick={handleClose}>Cancel</button> 
                </div>
             </div>
        </>
    );
};

export default WalletDialog;