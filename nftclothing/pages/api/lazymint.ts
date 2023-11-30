import {NextApiRequest, NextApiResponse} from "next";
import { ThirdwebSDK } from "@thirdweb-dev/sdk"; 
import { KlaytnTestnetBaobab, Mumbai} from "@thirdweb-dev/chains";
import { ContractWithMetadata } from "@thirdweb-dev/sdk";

export default async function handeler(
    req:NextApiRequest,
    res:NextApiResponse
) {
   try{
    //const {key, address}= JSON.parse(req.body.key);

    const key = "ae93e2399730c5f6708fe01b075b2a76e8947245dcc602b315359e052252f0c2"

    const sdk = ThirdwebSDK.fromPrivateKey(
        key,
        Mumbai,
        {
          secretKey: process.env.THIRDWEB_SECRET_KEY ,
        },
      );



      //sdk.storage.upload()
      const metadatas = [
        {
          name: "Hoodie 1",
          description: "This is a cool Hoodie",
          image: "https://img.joomcdn.net/cff862d46d494cc41e4d2af0840a85cbbb67881b_original.jpeg", 
        },
        {
          name: "Sneaker 1",
          description: "This is a cool Sneaker",
          image: "https://i.etsystatic.com/16489875/r/il/600ab8/3790184197/il_570xN.3790184197_jj0v.jpg", 
        },
        {
          name: "Bagpack 1",
          description: "This is a cool Bag",
          image: "https://i.ebayimg.com/images/g/8GYAAOSw4vRkvONW/s-l1600.png", 
        },
      ];
      
      const contracts:ContractWithMetadata[] = await sdk.getContractList('0x202E34b639EEE7377aB5d80606f933b8c9c7Bae6');

      console.log(contracts)

      const contract = await sdk.getContract(contracts[0].address);

      console.log('CONTRACT',contract.metadata, contract.publishedMetadata)
     
      const results = await contract.erc721.lazyMint(metadatas);
     
       console.log('result',results)

      

      return res.status(200).json({metadata: results})
      

   }catch(err){
    return res.status(500).json({error:err})
   }
}