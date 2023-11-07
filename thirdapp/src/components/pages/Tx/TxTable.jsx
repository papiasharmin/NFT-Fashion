
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
        <div className="coininfo" style={{width:'100%'}}>
        <p>{index+1}.</p>
        <p>{ (row.to).substr(0, 12) + '...' + row.to.substr(row.to.length - 3, 3)}</p>
        <p>{ethers.utils.formatEther( Number(row.value).toString())}</p>
        <p> {approved} / {required}</p>
        <p>{isExecuted ? "Executed" : "Not Executed"} </p>
        <div style={{display:'flex',flexDirection:'column', gap:'5px'}}>
            <button className='button-outline' onClick={()=>approveAction(index)}>Approve</button>
            <button className='button-outline' onClick={()=>revokeAction(index)}>Revoke</button>
            <button className='button-outline' onClick={()=>executeAction(index)}>Execute</button>
        </div>
        </div>
    );
};

export default TxTable;

//Web3.utils.fromWei(row.value, 'ether')

