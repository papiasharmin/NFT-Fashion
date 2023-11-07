

import React, { useEffect, useState, useRef } from "react";
import superAgent from 'superagent';
import Header from './../common/header'
import LoadingIndicator from '../common/LoadingIndicator';
import './../../assets/css/App.css';
import { useMyContext } from './../../Contexts';
import {
    baseURL
} from './../common/Constant';



const Create = (props) => {
    // create contract
    const {
        currentAccount
    } = useMyContext();

    
    // アカウント用のステート変数
    const [account, setAccount] = useState(null);
    // ウォレットの名前を格納するステート変数
    const [walletName, setWalletName] = useState(null);
    // ウォレットのownerのアドレスを格納する変数
    const [owners, setOwners] = useState([]);
    // ウォレットのownerのアドレスを格納するステート変数
    const [owner, setOwner] = useState(null);
    // ウォレットの閾値を格納するステート変数
    const [required, setRequired] = useState(0);
    // トランザクションが正常に処理された場合のフラグ
    const [successFlg, setSuccessFlg] = useState(false);
    // トランザクションが異常終了した場合のフラグ
    const [failFlg, setFailFlg] = useState(false);
    // ポップアップの表示を管理するフラグ
    const [showToast, setShowToast] = useState(false);
    // ローディングを表示するためのフラグ
    const [isLoading, setIsLoading] = useState(false);

    /**
     * コンポーネントが描画されたタイミングで実行する初期化関数
     */
    const init = async() => {
     
        try {
            setAccount(currentAccount);
        } catch (error) {
            alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
            console.error(error);
        }
    };

    /**
     * 「Create」ボタンを押した時の処理
     */
    const createAction = async(e) => {
        e.preventDefault()
        console.log("owners:", owners);
         if(owners.length <2){
            prompt('Must add al least two owners');
         }
         try {
            setIsLoading(true);
            //createWalletを使うためのAPIを呼び出す。(引数に課題あり)
            superAgent
                .post(baseURL + '/api/factory/create')
                .query({
                    name: walletName,
                    owners: owners,
                    required: required
                })
                .end(async(err, res) => {
                    if (err) {
                        console.log("createWalletを使うためのAPI呼び出し中に失敗", err);
                        // popUpメソッドの呼び出し
                        popUp(false, "failfull...");
                        // フラグ OFF
                        setIsLoading(false);
                        // ownersの配列を空にする。
                        setOwners([]);
                        return err;
                    };
                    console.log(res);
                    //フラグ OFF
                    setIsLoading(false);
                    // ownersの配列を空にする。
                    setOwners([]);
                    // CIDを出力
                    popUp(true, "successfull!!");
                });
        } catch(err) {
            console.error("create wallet err:", err);
            setIsLoading(false);
            // ownersの配列を空にする。
            setOwners([]);
            // popUpメソッドを呼び出す
            popUp(false);
        }
    };

    /**
     * +ボタンが押された時の処理
     */
     const addAddress = async () => {
        // 配列にアドレスを追加する。
        setOwners(prev => {
           let arr = prev
           arr.push(owner)
           return arr;
        });
        // ステート変数を更新する。
        setOwner(null);
        alert("アドレス追加完了！");
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

    // 副作用フック
    useEffect(() => {
        setIsLoading(true);
        init();
        setIsLoading(false);
    }, [account]);

    return(
     <div>
        <div className='parent-div'>
        <Header/>
        <div className="buy-centerdiv">
            <h2 id='create-headline'>Create Multisignature Wallet</h2>
            <form className="name-input" onSubmit={createAction}>
                <input type="text" placeholder="Enter Wallet Name" required/>
                <div style={{display:'flex',gap:'20px',marginTop:'10px', marginBottom:'10px'}}>
                <input className='input' onChange={ (e) => setOwner(e.target.value) } type="text" placeholder="Enter owner address" required/>
                <button onClick={addAddress}  style={{backgroundColor:'lightgray',padding:'5px', border:'1px solid gray'}}> + </button>
                </div>
                <input  onChange={ (e) => setRequired(e.target.value) } type="text" placeholder="No. of approvals" required/>
                
                <button type='submit' className='button' >Create</button>
            </form>
        </div>
  
        </div>
        {successFlg && (
                        /* 成功時のポップアップ */
                        <div id="toast" className={showToast ? "zero-show" : ""}>
                              <div id="secdesc">Create Trasaction Successfull!!</div>
                        </div>
                  )}
                  {failFlg && (
                        /* 失敗時のポップアップ */
                        <div id="toast" className={showToast ? "zero-show" : ""}>
                              <div id="desc">Create Trasaction failfull..</div>
                        </div>
                  )}
        
        </div>
    );
}

export default Create;