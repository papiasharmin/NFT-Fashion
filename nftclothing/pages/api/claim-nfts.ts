import {NextApiRequest, NextApiResponse} from "next";
import { ThirdwebSDK } from "@thirdweb-dev/sdk"; 
import { KlaytnTestnetBaobab} from "@thirdweb-dev/chains";

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
      

   }catch(err){
    return res.status(500).json({error:err})
   }
}