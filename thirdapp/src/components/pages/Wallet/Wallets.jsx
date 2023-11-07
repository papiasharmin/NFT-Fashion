


import React, { useEffect, useState } from "react";
import superAgent from 'superagent';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode,faCopy  } from "@fortawesome/free-solid-svg-icons";
import LoadingIndicator from "../../common/LoadingIndicator";
import './../../../assets/css/App.css';
import { useMyContext } from './../../../Contexts';
import {
    baseURL
} from './../../common/Constant';

import {
    getWallets, walletsCount, getWalletInfo, getRequired, getTxs
} from './../../hooks/UseContract';

import { Link } from "react-router-dom";
import WalletDialog from "../../common/Dialog";

import Header from './../../common/header'


import chart from './../../../assets/images/chart.jpg'

/**
 * 表の最上位ヘッダー部の配列
 */



const Wallets = (props) => {
  const {
    currentAccount
} = useMyContext();


const [account, setAccount] = useState(null);

const [wallets, setWallets] = useState([]);

const [isZero, setIsZero] = useState(false);

const [page, setPage] = useState(0);

const [rowsPerPage, setRowsPerPage] = useState(10);

const [isLoading, setIsLoading] = useState(false);
const [isLoadingdetail, setIsLoadingdetail] = useState(false);

const [successFlg, setSuccessFlg] = useState(false);

const [failFlg, setFailFlg] = useState(false);

const [showToast, setShowToast] = useState(false);

const [open, setOpen] = useState(false);

const [depositAddr, setDepositAddr] = useState(null);
// depozit amount
const [amount, setAmount] = useState(0);
const [showWalletDetails, setShowWalletDetails] = useState(false);
const [walletDetails, setWalletDetails] = useState(null);
const [qrOpen, setQrOpen] = useState(false);
const [deposite,setdeposite] = useState(false)

/**
 * コンポーネントが描画されたタイミングで実行する初期化関数
 */
const init = async() => {
    try {
        var multiSigWallets;

       
        const count = await walletsCount();
      

        if (count === '0n') {
            setIsZero(true);
        } else {
            multiSigWallets = await getWallets(10, 0);
            setAccount(currentAccount);
            setWallets(multiSigWallets);
        }
       console.log('WALLET',multiSigWallets,count)
      
        //console.log('RESSSS',res)
       
    } catch (error) {
        alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
        console.error(error);
    }
};

/**
 * 入金用のメソッド
 * @param wallet ウォレットアドレス
 */
const depositAction = async () => {
    console.log('BURNN')
    try {
        setOpen(false);
        setIsLoading(true);
        // 入金額を16進数に変換する。
        const value = 0//Web3.utils.toWei(amount.toString());
        
        // 償却用APIを呼び出す
        superAgent
            .post(baseURL + '/api/burnToken')
            .query({
                to: currentAccount,
                amount: amount,
                walletAddr: depositAddr
            })
            .end(async(err, res) => {
                if (err) {
                    console.log("償却用API呼び出し中に失敗", err);
                    // popUpメソッドの呼び出し
                    popUp(false, "failfull...");
                    setIsLoading(false);
                    return err;
                }
            });
        
        setdeposite(true)
        setDepositAddr("");
        setAmount(0);
        setIsLoading(false);
        // popUpメソッドを呼び出す
        popUp(true);
    } catch(err) {
        console.error("err:", err);

        setDepositAddr("");
        setAmount(0);
        setOpen(false);
        setIsLoading(false);
        // popUpメソッドを呼び出す
        popUp(false);
    }
}

const deleteaction = async(id) => {
     console.log('id',id)

    try {
        setIsLoading(true);    
        
        // submit用のAPIを呼び出す
        superAgent
            .post(baseURL + '/api/factory/delete')
            .query({
                id: id
            })
            .end(async(err, res) => {
                if (err) {
                    console.log(err);
                
                    popUp(false, "Transaction failfull...");
                
                    setIsLoading(false);
                    return err;
                };
                console.log(res);
               
                setIsLoading(false);
            
                popUp(true, "Transaction successfull!!");
            });
    } catch(err) {
        console.error("err:", err);
        setIsLoading(false);
     
        popUp(false, "Transaction failfull...");
    }
}

/**
 * Open Dialog
 * @param wallet MultoSig Wallet Addr
 */
 const handleOpen = (wallet) => {
    setDepositAddr(wallet);
    setOpen(true);
}

/**
 * Close Dialog
 */
 const handleClose = () => {
    setDepositAddr("");
    setOpen(false);
}

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
 * ページングするための関数
 * @param e イベント内容
 * @param newPage 新しいページ
 */
const handleChangePage = (e, newPage) => {
    setPage(newPage);
};
    
/**
 * 1ページに表示する取引履歴の上限を引き上げる関数
 * @param e イベント内容
 */
const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
};

const getwalletDetails = async(wallet)=>{
    
    const { 
        wName,
        required,
        counts,
        ownersaddr,
         balance
        
    } = await getWalletInfo(wallet);
        
        
        if(wName || required || counts ||ownersaddr||balance ){

        setIsLoadingdetail(false)
        //setShowWalletDetails(true)
    }
    console.log('details',   wName,
    required,
    counts,
    ownersaddr,
     balance)
    setWalletDetails({
        wName,
        required,
        counts,
        ownersaddr,
         balance,
         wallet
    })
   

}

console.log('walletdetail',walletDetails, showWalletDetails)

const copy = () => {
    //コピー
    navigator.clipboard.writeText(walletDetails.wallet)
        .then(function() {
            console.log('Async: Copyed to clipboard was successful!');
            alert("Copying to clipboard was successful!")
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
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

//  const getdata = async() =>{
//    let data = await getWalletInfo("0x202E34b639EEE7377aB5d80606f933b8c9c7Bae6");
//    //let data1 = await getRequired("0x202E34b639EEE7377aB5d80606f933b8c9c7Bae6")
//    //let data2 = await getTxs("0x202E34b639EEE7377aB5d80606f933b8c9c7Bae6")
//    console.log('walletinfo', data)
//  }

// 副作用フック
useEffect(() => {
    setIsLoading(true);
    init();
    setIsLoading(false);
}, [account]);

useEffect(()=>{
    if(walletDetails){
        setShowWalletDetails(true)
    }
},[deposite, walletDetails])

    return (
        <div className='parent-div'>
            <Header/>
            <div className="basebox">
               <div className="upperportion">
                 <img src={chart} alt="" />
                 <div className="status">
                    <h1>Your MultiSignature Wallets</h1>
                 </div>
               </div>
               <div className="lowerportion">
                  {Wallets.length > 0 ? (
                      <ul style={{display:'flex',flexDirection:'column',width:'100%', gap:'15px'}}>
                       { wallets.map((item,index) => {
                           return(<li className="coininfo" >
                              <h3 style={{color:'whitesmoke'}}>{`${index+1}.`}</h3>
                              <h3 style={{color:'whitesmoke'}}>{item}</h3>
                              <button className="button-outline" onClick={async ()=>{ 
                                    setShowWalletDetails(true);
                                    setIsLoadingdetail(true);
                                    getwalletDetails(item); 
                              }}>
                                     Dtails
                              </button>
                              <button className="button-outline" onClick={()=>setOpen(true) }>Deposite</button>
                              <button className="button-outline" onClick={()=>deleteaction(index)} >Remove</button>
                           </li>)
                          })
                       }

  
                      </ul>
                  )
                    : (<div style={{backgroundColor:'whitesmock', padding:'20px', border:'1px solid gray',borderRadius:'10px'}}>
                        <p style={{color:'black', textAlign:'center'}}>No Wallets created</p>
                     </div>)
                   }
                </div>
            </div>
            {
                open &&
                    <WalletDialog 
                          open={open} 
                          amount={amount}
                          handleClose={(e) => {handleClose()}} 
                          depositAction={(e) => {depositAction(depositAddr)}} 
                          setAmountAction={(e) => {setAmount(e.target.value)}} 
                    />
            }
            { showWalletDetails && <>
             {!isLoadingdetail ?

            <>
         

                  <div  className='walletdetail' style={{width:'60%',height:'65%'}}>
                                  <p style={{fontSize:'20px', fontWeight:400, color:'rgb(14, 77, 185)'}}>{`${walletDetails.wName} Deatils`}</p>
                                  <p style={{backgroundColor:'whitesmoke', padding:'10px', color:'white',width:'40%', borderRadius:'5px'}}>EVM XRP Sidechain</p>
                                  <p><span style={{color:'rgb(14, 77, 185)', fontSize:'18px'}}>Address</span> : { `${walletDetails.wallet}`}</p>
                                  <div style={{display:'flex', justifyContent:'center',alignContent:'center', gap:'20px', border:'1px solid gray',padding:'5px', width:'25%'}}>
                                  <FontAwesomeIcon icon={faCopy} />
                                  <FontAwesomeIcon icon={faQrcode} />
                                  </div>
                                  <p><span style={{color:'rgb(14, 77, 185)', fontSize:'18px'}}>Required</span> : {`${walletDetails.required}/${walletDetails.counts}`}</p>
                                  <p><span style={{color:'rgb(14, 77, 185)', fontSize:'18px'}}>Total Balance</span> : {`${walletDetails.balance} XRP`}</p>
                                  
                                  <Link to={"/txs"} state={{addr: walletDetails.wallet}} style={{borderRadius:'5px',textDecoration:'none',backgroundColor:'rgb(14, 77, 185)',color:'white', padding:'10px',width:'50%', fontSize:'18px', fontWeight:400}}>
                                      Transactions
                                  </Link>

                                  <button className='button-outline' onClick={()=>setShowWalletDetails(false)}>Close</button>
                                  
                  </div> 
              
             
            
            </>
            
            
            
            
            : 
            <div className='walletdetail' style={{width:'60%',height:'65%'}}>
                <LoadingIndicator/>
            </div>
             }
            </>
              }
        </div>
      )
    
}

export default Wallets;