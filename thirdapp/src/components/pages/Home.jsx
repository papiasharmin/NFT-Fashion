import Grid from '@mui/material/Grid';

import Header from './../common/header'
import React, { useEffect, useState } from "react";
import superAgent from 'superagent';

import LoadingIndicator from '../common/LoadingIndicator';
import SendDialog from '../common/SendDialog';
import './../../assets/css/App.css';
import { useMyContext } from './../../Contexts';
import {
    baseURL,
    WIDTH_THRESHOLD
} from './../common/Constant';

import QrCodeDialog from './../common/QrCodeDialog';
import QrCodeReader from './../common/QrCodeReader';
import {
    getDid, getRegisterStatus, getTokenBalanceOf
} from './../hooks/UseContract';
import { Link } from "react-router-dom";
import { ConnectWallet} from "@thirdweb-dev/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faLinkedin, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope,} from '@fortawesome/free-solid-svg-icons'

const Home = (props) => {
    // create contract
    const {
        currentAccount,
        updateWidth,
        width,
        setWidth,
        fullDid, 
        setFullDid,
        isOpenQRCamera, 
        setIsOpenQRCamera,
        setQrResult,
        clickOpenQrReader
    } = useMyContext();

    const [balance, setBalance] = useState(0);
    const [did, setDid] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [successFlg, setSuccessFlg] = useState(false);
    const [failFlg, setFailFlg] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [to, setTo] = useState(null);
    const [amount, setAmount] = useState(0);
    const [open, setOpen] = useState(false);
    const [qrOpen, setQrOpen] = useState(false);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    /**
     * Register function 
     */
    const registerAction = async() => {
        setIsLoading(true);

        if(!currentAccount){
            
        }
        
        // DID作成APIを呼び出す
        superAgent
            .post(baseURL + '/api/create')
            .query({addr: currentAccount})
            .end(async(err, res) => {
                if (err) {
                    console.log("DID作成用API呼び出し中に失敗", err);
                    // popUpメソッドの呼び出し
                    popUp(false, "failfull...");
                    //setIsLogined(false);
                    setIsLoading(false);
                    return err;
                }

                // DIDを取得する。
                const result = await getDid(currentAccount);
                var modStr = result.substr(0, 9) + '...' + result.substr(result.length - 3, 3);
                console.log('RESULT',result, modStr)
                setDid(modStr);
                setFullDid(result);
                console.log("DID作成用API呼び出し結果：", result);  

                // Token発行APIを呼び出す
                superAgent
                    .post(baseURL + '/api/mintToken')
                    .query({
                        to: currentAccount,
                        amount: 10000
                    })
                    .end(async(err, res) => {
                        if (err) {
                            console.log("Token発行用API呼び出し中に失敗", err);
                            // popUpメソッドの呼び出し
                            popUp(false, "failfull...");
                            setIsLoading(false);
                            return err;
                        }
                        console.log('RES',res)
                    });

                // popUpメソッドの呼び出し
                popUp(true, "successfull!!");
                checkStatus();
                setIsLoading(false);   
            });
    }

    /**
     * send function
     */
    const sendAction = async(to, amount) => {
        setIsLoading(true);
        console.log('AMOUNT',to,amount, fullDid)
        // 送金用のAPIを呼び出す
        superAgent
            .post(baseURL + '/api/send')
            .query({
                from: fullDid,
                to: to,
                amount: amount
            })
            .end(async(err, res) => {
                if (err) {
                    console.log("Token送金用API呼び出し中に失敗", err);
                    // popUpメソッドの呼び出し
                    popUp(false, "failfull...");
                    setIsLoading(false);
                    return err;
                }
                await getBalance();
                setIsLoading(false);
                // popUpメソッドの呼び出し
                popUp(true, "successfull!!");
            });
    };

    /**
     * ポップアップ時の処理を担当するメソッド
     * @param flg true：成功 false：失敗
     */
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

    /**
     * Open Dialog
     * @param wallet MultoSig Wallet Addr
     */
    const handleQrOpen = (wallet) => {
        setQrOpen(true);
    }

    /**
     * Close Dialog
     */
    const handleQrClose = () => {
        setQrOpen(false);
    }

    /**
     * クリップボードでDIDをコピーするための機能
     */
    const copy = () => {
        //コピー
        navigator.clipboard.writeText(fullDid)
            .then(function() {
                console.log('Async: Copyed to clipboard was successful!');
                alert("Copying to clipboard was successful!")
            }, function(err) {
                console.error('Async: Could not copy text: ', err);
            });
    };

    /**
     * getBalance function
     */
    const getBalance = async() => {
        // 残高を取得する
        const num = await getTokenBalanceOf(currentAccount);
        console.log('NUMBALANCE',num)
        setBalance(num);
    }

    /**
     * checkStatus function
     */
    const checkStatus = async() => {
        
        // 登録ステータスを確認する。
        var status = await getRegisterStatus(currentAccount);
        
        setIsRegistered(status);
        
        if(status) {
            // DIDを取得する。
            const didData = await getDid(currentAccount);
            console.log("didData :", didData);
            // short
            var modStr = didData.substr(0, 9) + '...' + didData.substr(didData.length - 3, 3)
            setDid(modStr);
            setFullDid(didData);
        }
    };

    useEffect(()=> {
        console.log('currentaccount',currentAccount)
        if(currentAccount){
        getBalance();
        checkStatus();
        setWidth(window.innerWidth);
       
        }

        window.addEventListener(`resize`, updateWidth, {
            capture: false,
            passive: true,
        })
      
        return () => window.removeEventListener(`resize`, updateWidth)
    }, [currentAccount,fullDid]);

    useEffect(()=>{

    },[isRegistered])

 

    return (
        <div className='parent-div'>
            
        <Header/>
        
        <div className="backdiv">
            <div className="headback">
                <div className="headlines">
                    <h1>Your Soul</h1>
                    <h1>Wallet</h1>  
                </div>
            </div>
            <div className="data">
                {isRegistered ? <div>
                <h1>My Soul</h1>
                <div style={{display:'flex', gap:'20px',marginTop:'25px',marginBottom:'10px'}}>
                <Link to={'/buy'}>
                    <button className='button'>Buy Token</button>
                </Link>
               {/**/}
                </div>
                <h3 style={{marginBlock:'10px'}}>Your DID: {did}</h3>
                <h3>IDQ Token Balance: {balance}</h3>
                <div style={{display:'flex', gap:'20px',marginTop:'25px'}}>
                    <button className='button-outline' onClick={handleOpen}>Send Token</button>
                    <button className='button-outline'onClick={handleQrOpen}>My QR Code</button>
                </div>
                </div>
                :
                <button className='button' onClick={registerAction}>Register</button>}

            </div>
            <Link id='wallet-connecting-button' to={'https://community.metamask.io/t/log-in-to-meta-mask/17904'}> <button>Tive ◎</button> </Link>
            <div className="contacts">
                <h3>Contacts</h3>
                <div className="media">
                    <Link to={'https://www.linkedin.com/authwall?trk=qf&original_referer=https://www.linkedin.com/&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2F%3Foriginal_referer%3D'}><FontAwesomeIcon icon={faLinkedin} size='lg' style={{color: "#b4bac5",}} /></Link>
                    <Link to={'https://www.instagram.com/'}><FontAwesomeIcon icon={faInstagram} size='lg' style={{color: "#b4bac5",}} /></Link>
                    <Link to={'https://www.google.com/intl/en_in/gmail/about/'}><FontAwesomeIcon icon={faEnvelope} size='lg' style={{color: "#b4bac5",}}/></Link>
                    <Link to={'https://twitter.com/i/flow/login'}><FontAwesomeIcon icon={faTwitter}  size='lg' style={{color: "#b4bac5",}}/></Link>
                </div>
            </div>
            {successFlg && (
                       
                        <div id="toast" className={showToast ? "zero-show" : ""}>
                              <div id="secdesc">Create Trasaction Successfull!!</div>
                        </div>
                  )}
            {failFlg && (
                       
                        <div id="toast" className={showToast ? "zero-show" : ""}>
                              <div id="desc">Create Trasaction failfull..</div>
                        </div>
            )}
            {isOpenQRCamera &&
                <QrCodeReader 
                  onRead={e => {
                    setIsOpenQRCamera(false);
                    setQrResult(e);
                    setTo(e.text);
                  }} 
                   setOpen={setIsOpenQRCamera} 
                />
            }

            {open &&
                    <SendDialog 
                                    open={open} 
                                    amount={amount}
                                    to={to}
                                    handleClose={(e) => {handleClose()}} 
                                    sendAction={(e) => {sendAction(to, amount)}} 
                                    setTo={(e) => {setTo(e.target.value)}}
                                    setAmountAction={(e) => {setAmount(e.target.value)}} 
                                    clickOpenQrReader={clickOpenQrReader}
                    />           
            }

            {qrOpen &&
                <QrCodeDialog
                                              tag={'My DID'}
                                              open={qrOpen}
                                              did={fullDid}
                                              handleClose={(e) => {handleQrClose()}} 
                />
            }
            
        </div>
    </div>

    );
};

export default Home;


<Link to={'/nfts'}>
<button className='button'>NFTs</button>
</Link>