
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import superAgent from 'superagent';

import LoadingIndicator from '../../common/LoadingIndicator';
import './../../../assets/css/App.css';
import { useMyContext } from './../../../Contexts';
import {
    baseURL
} from './../../common/Constant';
import {
    getTxs
} from './../../hooks/UseContract';
import TxTable from './TxTable';
import Header from './../../common/header'


const Txs = (props) => {

    // create contract
    const {
        currentAccount
    } = useMyContext();

    // コントラクト用のステート変数
    const [contract, setContract] = useState(null); 
    // アカウント用のステート変数
    const [account, setAccount] = useState(null);
    // 作成済みのウォレットコントラクトを格納する配列
    const [wallet, setWallet] = useState (null);
    // トランザクションのデータを格納する配列
    const [txs, setTxs] = useState ([]);
    // 送金先アドレスを格納するためのステート変数
    const [to, setTo] = useState(null);
    // 送金額を格納するためのステート変数
    const [value, setValue] = useState(null);
    // インプットデータ用のステート変数 (今後0x以外を入力できるようにする予定)
    const [inputData, setInputData] = useState('0x');
    // トランザクションが正常に処理された場合のフラグ
    const [successFlg, setSuccessFlg] = useState(false);
    // トランザクションが異常終了した場合のフラグ
    const [failFlg, setFailFlg] = useState(false);
    // ポップアップの表示を管理するフラグ
    const [showToast, setShowToast] = useState(false);
    // ポップアップ時に表示する文言を格納する変数
    const [popUpDocs, setPopUpDocs] = useState("");
    // ローディングを表示するためのフラグ
    const [isLoading, setIsLoading] = useState(false);
    // createモードかどうかを切り替えるためのフラグ
    const [createFlg, setCreateFlg] = useState(false);
    // ページ番号用のステート変数
    const [page, setPage] = useState(0);
    // 1ページに表示する上限数
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // locationを使うための変数
    const location = useLocation();

    /**
     * コンポーネントが描画されたタイミングで実行する初期化関数
     */
    const init = async() => {
        // locationから取得する。
        const addr = location.state.addr;
        console.log('ADDR',addr)
        try { 
            // トランザクションの情報を取得する。
            const transactions = await getTxs(addr);
            //const nputData = await getABIEncodeedData()
            // コントラクトとアカウントの情報をステート変数に格納する。
            console.log('trans',transactions)
            setContract("");
            setAccount(currentAccount);
            setWallet(addr);
            setTxs(transactions);
        } catch (error) {
            alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
            console.error(error);
        }
    };

    /**
     * 「Create」ボタンを押した時の処理
     */
    const createAction = async() => {
        // 送金額をETHに変換する。
        const sendValue = 0//Web3.utils.toWei(value);

        try {
            setIsLoading(true);    
            console.log('valuetrans',value)
            // submit用のAPIを呼び出す
            superAgent
                .post(baseURL + '/api/wallet/submit')
                .query({
                    to: to,
                    value: value,
                    data: inputData,
                    address: wallet,
                    sender:currentAccount
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
     * 「Approve」ボタンを押した時の処理
     * @param txId トランザクションID
     */
    const approveAction = async(txId) => {
        try {
            setIsLoading(true);
            // approve用のAPIを呼び出す
            superAgent
                .post(baseURL + '/api/wallet/approve')
                .query({
                    txId: txId,
                    address: wallet,
                    sender:currentAccount
                })
                .end(async(err, res) => {
                    if (err) {
                        console.log("approveを使うためのAPI呼び出し中に失敗", err);
                        // popUpメソッドの呼び出し
                        popUp(false, "Transaction failfull...");
                        // フラグ OFF
                        setIsLoading(false);
                        return err;
                    };
                    console.log(res);
                    // フラグ OFF
                    setIsLoading(false);
                    // popUpメソッドの呼び出し
                    popUp(true, "Transaction successfull!!");
                });
        } catch(err) {
            console.error("err:", err);
            setIsLoading(false);
            // popUpメソッドの呼び出し
            popUp(false, "Transaction failfull...");
        }
    }

    /**
     * 「Revoke」ボタンを押した時の処理
     * @param txId トランザクションID
     */
    const revokeAction = async(txId) => {
        try {
            setIsLoading(true);
            
            // revoke用のAPIを呼び出す
            superAgent
                .post(baseURL + '/api/wallet/revoke')
                .query({
                    txId: txId,
                    address: wallet,
                    sender:currentAccount
                })
                .end(async(err, res) => {
                    if (err) {
                        console.log("revokeを使うためのAPI呼び出し中に失敗", err);
                        // popUpメソッドの呼び出し
                        popUp(false, "Transaction failfull...");
                        // フラグ OFF
                        setIsLoading(false);
                        return err;
                    };
                    console.log(res);
                    // フラグ OFF
                    setIsLoading(false);
                    // popUpメソッドの呼び出し
                    popUp(true, "Transaction successfull!!");
                });
        } catch(err) {
            console.error("err:", err);
            setIsLoading(false);
            // popUpメソッドの呼び出し
            popUp(false, "Transaction failfull...");
        }
    }

    /**
     * 「Execute」ボタンを押した時の処理
     * @param txId トランザクションID
     */
    const executeAction = async(txId) => {
        try {
            setIsLoading(true);
        
            // execute用のAPIを呼び出す
            superAgent
                .post(baseURL + '/api/wallet/execute')
                .query({
                    txId: txId,
                    address: wallet
                })
                .end(async(err, res) => {
                    if (err) {
                        console.log("executeを使うためのAPI呼び出し中に失敗", err);
                        // popUpメソッドの呼び出し
                        popUp(false, "Transaction failfull...");
                        // フラグ OFF
                        setIsLoading(false);
                        return err;
                    };
                    console.log(res);
                    // フラグ OFF
                    setIsLoading(false);
                    // popUpメソッドの呼び出し
                    popUp(true, "Transaction successfull!!");
                });
        } catch(err) {
            console.error("err:", err);
            setIsLoading(false);
            // popUpメソッドの呼び出し
            popUp(false, "Transaction failfull...");
        }
    }

    /**
     * ポップアップ時の処理を担当するメソッド
     * @param flg true：成功 false：失敗
     * @param docs ポップアップに出力する文言
     */
    const popUp = (flg, docs) => {
        // 成功時と失敗時で処理を分岐する。
        if(flg === true) {
            // ステート変数を更新する。
            setSuccessFlg(true);
            setShowToast(true);
            setPopUpDocs(docs);
            // 5秒後に非表示にする。
            setTimeout(() => {
                setSuccessFlg(false);
                setShowToast(false);
                setPopUpDocs("");
            }, 5000);
        } else {
            // ステート変数を更新する。
            setFailFlg(true);
            setShowToast(true);
            setPopUpDocs(docs);
            // 5秒後に非表示にする。
            setTimeout(() => {
                setFailFlg(false);
                setShowToast(false);
                setPopUpDocs("");
            }, 5000);
        }
    };

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

    // 副作用フック
    useEffect(() => {
        setIsLoading(true);
        init();
        setIsLoading(false);
    }, [wallet]);

    return(
        <div className="parent-div">
            <Header/>
           <div className="txs">
                {isLoading ? (
                    
                        <header className="loading">
                            <p><LoadingIndicator/></p>
                            <h3>Please Wait・・・・</h3>
                        </header>
                  
                ) : ( 
                    <>
                    
                      
                        {createFlg ? (
                            <>
                            <div className='overlay'></div>
                            <div className='walletdetail'>
                                   <p><strong>Please etner Transaction info</strong></p>
                                   
                                    
                                       
                                        
                                            <label>to ：</label>
                                            <input
                                                className='input'
                                                id="to" 
                                                placeholder="send address" 
                                                margin="normal" 
                                                required
                                                onChange={ (e) => setTo(e.target.value) } 
                                                
                                                
                                            />

                                            <label>value ：</label>
                                            <input
                                                className='input'
                                                id="value" 
                                                placeholder="value" 
                                                margin="normal" 
                                                type="number"
                                                required
                                                onChange={ (e) => setValue(e.target.value) } 
                                            
                                               
                                            />
                                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'20px'}}> 
                                    <button className='button' onClick={createAction}>Create</button>
                                    <button className='button' onClick={(e) => {setCreateFlg(false)}}>Cancel</button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                           
                             <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:'10px',width:'100%'}}>     
                                <h3 style={{color:'whitesmoke'}}>Transaction Info</h3>
                                  
                                { txs.length > 0 ?
                                         <> 
                                             <div className="coininfo" style={{backgroundColor:'whitesmoke',color:'black',width:'100%'}}>
                                                 <p>NO.</p>
                                                <p>Recipiant</p>
                                                <p>Amount</p>
                                                <p> Approvals/Required</p>
                                                <p> Executed </p>
                                                <p>Actions</p>
                                            </div>  
                                           {txs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row, i) => {
                                                   
                                                    return (

                                                        <TxTable 
                                                            _wallet={wallet} 
                                                     
                                                            row={row} 
                                                            index={i} 
                                                            approveAction={(e) => approveAction(i)}
                                                            revokeAction={(e) => revokeAction(i)}
                                                            executeAction={(e) => executeAction(i)}
                                                        />
                                                    );
                                            })
                                            }
                                            </>
                                            :
                                            <h2 style={{color:'whitesmoke'}}>No Transaction Yet</h2>
                                    }
                                        
                              
                           
                               
                                    <button className="button"  onClick={(e) => {setCreateFlg(true)}}>Create Transaction</button>
                                
                            </div>
                            </>
                        ) }
                    </>
                )}
            </div>
            {successFlg && (
                /* 成功時のポップアップ */
                <div id="toast" className={showToast ? "zero-show" : ""}>
                    <div id="secdesc">{popUpDocs}</div>
                </div>
            )}
            {failFlg && (
                /* 失敗時のポップアップ */
                <div id="toast" className={showToast ? "zero-show" : ""}>
                    <div id="desc">{popUpDocs}</div>
                </div>
            )}
        </div>
    );
}

export default Txs;