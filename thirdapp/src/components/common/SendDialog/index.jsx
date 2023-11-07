
import React, { useState } from 'react';
import './SendDialog.css';


const SendDialog = (props) => {
    const [readFlg, setReadFlg] = useState(false);
   
    const { 
        open, 
        to, 
        amount, 
        handleClose, 
        sendAction, 
        setTo,
        setAmountAction,
        clickOpenQrReader
    } = props;

    return (
        <>
        <div className="overlay" onClick={handleClose}>

        </div>
        <div className='walletdetail'>
                <div>
                    Send Token
                </div>
              
                
                        <p>
                            Plaese enter addr & amount 
                        </p>
                        <form>
                              <input className='input'
                                id="component-simple" 
                                value={to} 
                                onChange={setTo} 
                                placeholder="did:ion..." 
                            />
                            <br/>
                            <input className='input'
                                id="component-simple2" 
                                value={amount} 
                                onChange={setAmountAction} 
                                placeholder="0.00" 
                            />
                        </form>
                         <div style={{display:'flex'}}>
                        <button className='button' onClick={sendAction}>Send</button>
                        <button className='button' onClick={clickOpenQrReader}>Scan</button>
                        </div>
                        <button onClick={handleClose} className="buton-outline">Close</button>
                        </div>
        </>
    );
};

export default SendDialog;