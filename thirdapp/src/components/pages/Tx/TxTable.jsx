
import React, { useEffect, useState } from "react";

import './../../../assets/css/App.css';
import {
    getApprovalCount, getRequired
} from './../../hooks/UseContract';
import { ethers } from 'ethers';

const TxTable = (props) => {
    
    const { 
        _wallet, 
        row, 
        index,
        approveAction,
        revokeAction,
        executeAction,
        signer
    } = props;

   

 
    const [isExecuted, setIsExecuted] = useState(false);

    const [approved, setApproved] = useState(0);
   
    const [account, setAccount] = useState(null);
   
    const [required, setRequired] = useState(0);

  
    const init = async(_wallet) => {
     
     
        const executed = row.executed;
      
        const approvement = await getApprovalCount(_wallet, index);

        const req = await getRequired(_wallet);

        setIsExecuted(executed);
        setAccount(signer);
        setApproved(approvement);
        setRequired(req);
    }


    useEffect(() => {
        init(_wallet);
    }, [_wallet]);


    return (
        <div className="coininfo">
        <p>{index+1}</p>
        <p>{row.to}</p>
        <p>{ethers.utils.formatEther( Number(row.value).toString())}</p>
        <p> {approved} / {required}</p>
        <p>{isExecuted ? "Executed" : "Not Executed"} </p>
        <div>
            <button className='button-outline' onClick={()=>approveAction(index)}>Approve</button>
            <button className='button-outline' onClick={()=>revokeAction(index)}>Revoke</button>
            <button className='button-outline' onClick={()=>executeAction(index)}>Execute</button>
        </div>
        </div>
    );
};

export default TxTable;

//Web3.utils.fromWei(row.value, 'ether')

