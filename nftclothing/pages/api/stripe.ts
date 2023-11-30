import {NextApiRequest, NextApiResponse} from "next";
import { ThirdwebSDK } from "@thirdweb-dev/sdk"; 
import { KlaytnTestnetBaobab, Mumbai} from "@thirdweb-dev/chains";
import { ContractWithMetadata } from "@thirdweb-dev/sdk";
import Stripe from "stripe";

export default async function handeler(
    req:NextApiRequest,
    res:NextApiResponse
) {
   try{
    if (!process.env.STRIPE_SECRATE_KEY) {
        throw 'Server misconfigured. Did you forget to add a ".env.local" file?';
      }
    
      const { address } = JSON.parse(req.body);
      if (!address) {
        throw 'Request is missing "buyerWalletAddress".';
      }
      console.log(address)
      // Create a Stripe payment intent for $100 USD.
      const stripe = new Stripe('sk_test_51NhSR2E8TmXICSjPWOwCOQSVssuKk8Fo0ARomQHboq2ZPczEGDIrwUgOtw5lL6OPqDGL9jyxktw9iijqT7Bn5tt600KFDiUJAL', {
        apiVersion: "2023-10-16",
      });
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 100_00,
        currency: "jpy",
        description: "Example NFT delivered by thirdweb Engine",
        payment_method_types: ["card"],
        metadata: { address },
      });



      

      return res.status(200).json({clientSecret: paymentIntent.client_secret})
      

   }catch(err){
    return res.status(500).json({error:err})
   }
}