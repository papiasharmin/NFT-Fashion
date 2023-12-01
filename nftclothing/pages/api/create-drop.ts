import {NextApiRequest, NextApiResponse} from "next";
import { ThirdwebSDK } from "@thirdweb-dev/sdk"; 
import { KlaytnTestnetBaobab, Mumbai} from "@thirdweb-dev/chains";

export default async function handeler(
    req:NextApiRequest,
    res:NextApiResponse
) {

  
   try{
    const {key, name, address, description}= JSON.parse(req.body);

    console.log('request',req.body, key, name, address, description)

    const sdk = ThirdwebSDK.fromPrivateKey(
        key,
        Mumbai,
        {
          secretKey: process.env.THIRDWEB_SECRET_KEY , // Use secret key if using on the server, get it from dashboard settings
        },
      );

      

    const contractAddress = await sdk.deployer.deployBuiltInContract (
     
      "nft-drop",
        {
          name: name,
          primary_sale_recipient:address,
          description: description,
        },
        '4.1.0'
  
      );
      
  console.log('adress',contractAddress)
  
  


      

      return res.status(200).json({address: contractAddress})
      

   }catch(err){
    console.log(err)
    return res.status(500).json({error:err})
   }
}