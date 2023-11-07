
import React, { useEffect } from "react";
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './../assets/css/App.css';
import { useMyContext } from './../Contexts';

import {
  connectWallet
} from './hooks/UseContract';
import Buy from './pages/Buy';
import Create from './pages/Create';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Nfts from "./pages/Nfts";
import Txs from './pages/Tx/Txs';
import Upload from './pages/Upload';
import MyVC from './pages/Vc/MyVc';
import Verify from './pages/Verify';
import Wallets from './pages/Wallet/Wallets';
import Example from './pages/SwapToken';
import Login from "./pages/Login";
import { ethers } from 'ethers';
import logo from '../assets/imgs/logo.png'
import superAgent from 'superagent';
import { baseURL } from './common/Constant';
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

//const connectthird = useConnect();

// async function handleConnect() {
//   try {
//     const wallet = await connect(
//       walletConfig, // pass the wallet config object
//        // pass options required by the wallet (if any)
//     );

//     console.log("connected to", wallet);
//   } catch (e) {
//     console.error("failed to connect", e);
//   }
// }

const [anchorEl, setAnchorEl] = useState(null);
// メニュー用の変数
const open = Boolean(anchorEl);

/**
 * メニューアイコンをクリックした時の処理
 * @param {*} event イベントハンドラ
 */
const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
};

/**
 * メニューバーを閉じる時の処理
 */
const handleClose = () => {
      setAnchorEl(null);
};

  // const [data, setdata] = useState({
  //   address: "",
  //   Balance: null,
  // });


  // const [pass,setpass] = useState(null)
  // const [conpass,setconpass] = useState(null)
   const [isLoading, setIsLoading] = useState(false);
   const [web3auth, setweb3auth] = useState(null)
  // const [usercreated, setusercreated] = useState(null)
  // const [qrOpen, setQrOpen] = useState(false);

  const activeChain = "ethereum";
  /**
   * ウォレット接続ボタンを押した時の処理
   */

  function createuser(userdata){
      setIsLoading(true);
   
      // 送金用のAPIを呼び出す
      superAgent
          .post(baseURL + '/api/createuser')
          .query({
              data: userdata,   
          })
          .end(async(err, res) => {
              if (err) {
                  console.log("Token送金用API呼び出し中に失敗", err);
                  // popUpメソッドの呼び出し
                 // popUp(false, "failfull...");
                  setIsLoading(false);
                  return err;
              }
              console.log('RESPONSEBODY',res.body)
              setIsLoading(false);
              setCurrentAccount(res.body.addr)
              // popUpメソッドの呼び出し
              //popUp(true, "successfull!!");
          });
  }






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
              
              <Route path="/Swaptoken" exact element={ <Example/> } />
              <Route path="*" exact element={ <NoPage/> } />
            </Routes>
           
        
   
      </Router>
     
    </>
 
  );
}

export default App;

//<Route path="/Nfts" exact element={ <Nfts/> } />