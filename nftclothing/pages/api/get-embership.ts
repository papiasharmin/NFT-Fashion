import {NextApiRequest, NextApiResponse} from "next";
import { ThirdwebSDK } from "@thirdweb-dev/sdk"; 
import { KlaytnTestnetBaobab} from "@thirdweb-dev/chains";
import { ThirdwebStorage } from "@thirdweb-dev/storage";


export default async function handeler(
    req:NextApiRequest,
    res:NextApiResponse
) {
   try{
    const {key, name, address, description, img}= JSON.parse(req.body.key);



    const sdk = ThirdwebSDK.fromPrivateKey(
        key,
        KlaytnTestnetBaobab,
        {
          secretKey: "kLPaIW-HPpSd0y5h90iayq5FkaHxIP5O4xRlc4C1f2hY8rtQRu5i6UhLQP7g0NJ86nxxrCpXEVg56cIVAdpH9A", // Use secret key if using on the server, get it from dashboard settings
        },
      );

      //sdk.storage.upload()

    const contractAddress = await sdk.deployer.deployBuiltInContract(
        // @ts-ignore - we're excluding custom contracts from the demo
        contractSelected,
        {
          name: name,
          primary_sale_recipient: address,
          description: description,
          image: img,
          // Recipients are required when trying to deploy a split contract
          recipients: [
            {
              address,
              sharesBps: 100 * 100,
            },
          ],
        }
      );

      const metadatas = [{
        name: "Cool NFT",
        description: "This is a cool NFT",
        image: '', // This can be an image url or file
      }, {
        name: "Cool NFT",
        description: "This is a cool NFT",
        image: '',
      }];

      const contract = await sdk.getContract(contractAddress);
      
      const results = await contract.erc721.lazyMint(metadatas);

      const presaleStartTime = new Date();
const publicSaleStartTime = new Date(Date.now() + 60 * 60 * 24 * 1000);
const claimConditions = [
  {
    startTime: presaleStartTime, // start the presale now
    maxClaimableSupply: 2, // limit how many mints for this presale
    price: 0.01, // presale price
    snapshot: ['0x...', '0x...'], // limit minting to only certain addresses
  },
  {
    startTime: publicSaleStartTime, // 24h after presale, start public sale
    price: 0.08, // public sale price
  }
]
 await contract.erc721.claimConditions.set(claimConditions);

      

      return res.status(500).json({address: contract})

   }catch(err){
      return res.status(500).json({error:err})
   }
}