import React, {useEffect, useState} from 'react';
import logo from './../../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { ConnectWallet,useAddress, useConnectionStatus, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { useMyContext } from './../../Contexts/index';
import Header from './../common/header'
import { LOYALTY_CONTRACT_ADRESS } from '../common/Constant';
import { Web3Button } from '@thirdweb-dev/react';
import superAgent from 'superagent';
import { baseURL } from '../common/Constant';
import Nft from '../common/Nft';
import { useWallet } from "@thirdweb-dev/react"; // or /react-native



const Nfts= (props) => {

    const [key, setkey]= useState(false)
    const [open, setopen]= useState(false)
    const [embedded, setembeded]= useState(false)
    const {
        currentAccount,
        setCurrentAccount,
        setKey
     
    } = useMyContext();
    const navigate = useNavigate()

    const embeddedWallet = useWallet("embeddedWallet");
   


    function redir(){
        console.log("redirect")
        navigate('/Home')
    }
    
    let address = useAddress();
    const {
       contract
    } = useContract(LOYALTY_CONTRACT_ADRESS);

    const {
       data:ownedNFTs,
       isLoding: isOwnedNFTsLoading
    } = useOwnedNFTs(contract,address)
    

    const claimloyaltynft = async () =>{
     
        if(ownedNFTs.length > 0){
            return
        }

        if(key){

        console.log('KEY',key)
        superAgent
        .post(baseURL + '/api/claimnft')
        .query({
           addr:currentAccount,
           key:key
        })
        .end(async(err, res) => {
            if (err) {
                console.log( err);
                return err;
            }
            console.log(res);
            const signedpayload = JSON.parse(res.body.response)
            const loyaltycard = await contract?.erc721.signature.mint(signedpayload)
            console.log(loyaltycard)

        });
    }

    }

    // const claimsoulnft = async () =>{

  
    //     if(ownedNFTs.length > 0){
    //         return
    //     }
    //     superAgent
    //     .post(baseURL + '/api/claimnft')
    //     .query({
    //        addr:currentAccount
    //     })
    //     .end(async(err, res) => {
    //         if (err) {
    //             console.log( err);
    //             return err;
    //         }
    //         console.log(res);
    //         const signedpayload = JSON.parse(res.body.response)
    //         const loyaltycard = await contract?.erc721.signature.mint(signedpayload)
    //         console.log(loyaltycard)

    //     });

    // }

    useEffect(()=>{

    },[ownedNFTs])

    


    return (
        <>
         

        <div className="parent-div">
            <Header/>
            <div className="buy-centerdiv">
                {!isOwnedNFTsLoading && (
                    ownedNFTs && ownedNFTs.length > 0 ? (
                        <>
                        <p>Your NFT</p>
                        <ul>
                            {
                                ownedNFTs.map(item=>{
                                    console.log('nftotem',item)
                                    return (
                                        <Nft nft={item} tokenid={item.metadata?.id}/>
                                    )
                                })
                            }
                        </ul>
                        </>
                    ):(
                        <div style={{display:'flex', flexDirection:'column',gap:'15px'}}>
                        <p>No NFTs</p>
        
                        <Web3Button
                           contractAddress={LOYALTY_CONTRACT_ADRESS}
                           action={async ()=>{
                       
                                setopen(true)
                            
                            
                            }}
                        >
                            Claim Loyalty Card
                        </Web3Button>
                        </div>
                    )
                )}
                                                
                { open && (
                    <div style={{zIndex:'10',width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center', padding:'10px'}}>
                        
                        
                     <iframe
                          src={`https://embedded-wallet.thirdweb.com/sdk/2022-08-12/embedded-wallet/export?clientId=${"e01373535c6d045f7c0aaf2a4c9c5386"}`}
                          allow="{clipboard-read 'self' https://embedded-wallet.thirdweb.com/sdk/2022-08-12/embedded-wallet/export?clientId=e01373535c6d045f7c0aaf2a4c9c5386; clipboard-write 'self' https://embedded-wallet.thirdweb.com/sdk/2022-08-12/embedded-wallet/export?clientId=e01373535c6d045f7c0aaf2a4c9c5386}"
                       />
                     
                       <input className='input' style={{marginTop:'25px'}}onChange={ (e) => setkey(e.target.value) } type="text" placeholder="Enter Key" />
                       <button onClick={()=>{
                        
                        setopen(false)
                        setembeded(false)
                        claimloyaltynft()}}className="button">close
                        </button>
                    </div>
                )

                }                  
            </div>
        </div>

     
        </>
    );
};

export default Nfts;