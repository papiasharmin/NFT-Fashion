import {NextApiRequest, NextApiResponse} from "next";
import { ThirdwebSDK } from "@thirdweb-dev/sdk"; 
import { KlaytnTestnetBaobab, Mumbai} from "@thirdweb-dev/chains";
import { ethers } from "ethers";

export default async function handeler(
    req:NextApiRequest,
    res:NextApiResponse
) {
   try{
    const { address, }= JSON.parse(req.body);
    const key = "ae93e2399730c5f6708fe01b075b2a76e8947245dcc602b315359e052252f0c2"//"c5e30a676c5bfef2c6ab4e71ef40cb0b82154caa9ee2adb686ab1dddd88b258a"


    const sdk = ThirdwebSDK.fromPrivateKey(
        key,
        Mumbai,
        {
          secretKey: process.env.THIRDWEB_SECRET_KEY ,
        },
      );
    
      const contracts = await sdk.getContractList(address);
      
      console.log(contracts)
      return res.status(200).json({contract: contracts})

   }catch(err){
    return res.status(500).json({error:err})
   }
}