import { ConnectWallet } from "@thirdweb-dev/react";
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


const Cart: NextPage = () => {
    const [allcontract,setallcontract] = useState<string[]>([]);

    const getContract = async ()=>{
      const res = await fetch("/api/get-contract")

      if(res.status === 200){
        let con = await res.json();
        let arr:string[];
        con.contract.map((item:{user:string,contract:string})=>{

            // arr.push(item.contract)
            // setallcontract(arr);
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
                data={data} 
                emptyText={"No NFTs found"}
        /> 
      </Container>
    );
  };
  
  export default Cart;


