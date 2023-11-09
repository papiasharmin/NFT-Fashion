
import React, { useEffect } from "react";
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './../assets/css/App.css';
import { useMyContext } from './../Contexts';
import Buy from './pages/Buy';
import Create from './pages/Create';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Txs from './pages/Tx/Txs';
import Upload from './pages/Upload';
import MyVC from './pages/Vc/MyVc';
import Verify from './pages/Verify';
import Wallets from './pages/Wallet/Wallets';
import Login from "./pages/Login";
import { ConnectWallet,useAddress, useConnectionStatus } from "@thirdweb-dev/react";
import './../stylesheets/header.css'
import './../stylesheets/login.css'
import './../stylesheets/verification.css'
import './../stylesheets/register.css'
import './../stylesheets/wallet.css'
import './../stylesheets/home.css'
import './../stylesheets/buy.css'
import './../stylesheets/buytoken.css'
import './../stylesheets/myvc.css'
import './../stylesheets/verify-vc.css'
import './../stylesheets/create.css'
import './../stylesheets/upload.css'

import './../stylesheets/app.css'

function App() {
  // create contract
  const {
    currentAccount,
    setCurrentAccount,
    setKey
 
} = useMyContext();

const address = useAddress();


const [anchorEl, setAnchorEl] = useState(null);

const open = Boolean(anchorEl);

const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
};

const handleClose = () => {
      setAnchorEl(null);
};

   const [isLoading, setIsLoading] = useState(false);
   const [web3auth, setweb3auth] = useState(null)

  const activeChain = "ethereum";

const copy = () => {
  //コピー
  navigator.clipboard.writeText(currentAccount)
      .then(function() {
          console.log('Async: Copyed to clipboard was successful!');
          alert("Copying to clipboard was successful!")
      }, function(err) {
          console.error('Async: Could not copy text: ', err);
      });
};
  
  return (

    <>
  
      
      <Router>
           
  
            
            <Routes>
              <Route path="/" exact element={ <Login />} />
              <Route path="/Home" exact element={ <Home /> } />
              <Route path="/Wallets" exact element={ <Wallets /> } />
              <Route path="/Create" exact element={ <Create /> } />
              <Route path="/Buy" exact element={ <Buy /> } />
              <Route path="/txs" exact element={ <Txs /> } />
              <Route path="/Myvc" exact element={ <MyVC /> } />
              <Route path="/Upload" exact element={ <Upload /> } />
              <Route path="/Verify" exact element={ <Verify/> } />
              <Route path="*" exact element={ <NoPage/> } />
            </Routes>
           
        
   
      </Router>
     
    </>
 
  );
}

export default App;

