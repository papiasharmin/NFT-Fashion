import React, {useEffect} from 'react';
import logo from './../../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { ConnectWallet,useAddress, useConnectionStatus } from "@thirdweb-dev/react";
import { useMyContext } from './../../Contexts/index';


const Login= (props) => {
    const {
        currentAccount,
        setCurrentAccount,
        setKey
     
    } = useMyContext();
    const navigate = useNavigate()

    function redir(){
        console.log("redirect")
        navigate('/Home')
    }
    
    let address = useAddress()
    
   useEffect(()=>{
      if(currentAccount){
        redir()
      }else if(address){
        setCurrentAccount(address)
       
      }

   },[address, currentAccount])
  

    


    return (
        <>
            <header className="App-header">
    <p>Welcome to IDQ | Soul Wallet!!</p>
    <div className="container">
    <div className="logo">
      <img src={logo} width={'100px'} alt="logo" />
    </div >
            
   <ConnectWallet/>

    </div>
  </header>
     
        </>
    );
};

export default Login;

