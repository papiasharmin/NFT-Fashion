import { ConnectWallet, NFT } from "@thirdweb-dev/react";
import NextLink from 'next/link';
import { NextPage } from "next";
import {  Heading, Container, Text, } from '@chakra-ui/react';
import { Link } from "@chakra-ui/next-js";

import {useState} from 'react';
import Header from "../components/Header";
import { Appearance, StripeElementsOptions, loadStripe } from "@stripe/stripe-js";

import React from "react";
import { useEffect } from "react";
import NFTGrid from "../components/nftGrid";
import { nft_drop } from "../components/constant"; 
import { useContract, useNFTs } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/react";
import {Mumbai} from "@thirdweb-dev/chains";

const Cart: NextPage = () => {
    const [alldata,setalldata] = useState<NFT[]>([]);

    const sdk = ThirdwebSDK.fromPrivateKey(
      process.env.KEY!,
      Mumbai,
      {
        clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID, // Use secret key if using on the server, get it from dashboard settings
      },
    );

    const getContract = async ()=>{
      const res = await fetch("/api/get-contract")

      if(res.status === 200){
        let con = await res.json();
        let arr:string[];
        con.contract.map(async(item:{user:string,contract:string})=>{
          const contract = await sdk.getContract(item.contract);

          const data = await contract.erc721.getAll()

          if(data.length > 0){
            data.map((item:NFT )=>{
              setalldata(prev=>{
                let arr = prev;
                arr.push(item)
                return arr;
              })
            })
          }

         
        })
        console.log('condata',con);

       }
    }

    useEffect(()=>{    
        getContract();    
    },[])
    

    const { contract } = useContract(nft_drop);
    
    const { data, isLoading } = useNFTs(contract);
    
    return (
      <Container  maxW='100vw' h='fit-content' p={4} color='white'  bgColor='black'>
         <Header/>
         <Heading fontFamily='h1' fontSize='2xl' bgColor='' p='10px' textAlign='center'>Collet Your Unique Dapper wear</Heading>
        
        <NFTGrid 
                isLoading={isLoading} 
                data={alldata} 
                emptyText={"No NFTs found"}
        /> 
      </Container>
    );
  };
  
  export default Cart;


