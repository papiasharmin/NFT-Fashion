import {NextApiRequest, NextApiResponse} from "next";
import { ThirdwebSDK } from "@thirdweb-dev/sdk"; 
import { KlaytnTestnetBaobab, Mumbai} from "@thirdweb-dev/chains";
import { contractdata } from "../../components/data";
import fs from 'fs';
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

      if(contractAddress){
       

// Data to be written to the JSON file
const dataToWrite = {
    user:address,
    contract:[contractAddress]
};

// Specify the file path
const filePath = '../../components/data';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading JSON file:', err);
  } else {
    // Parse the JSON string into a JavaScript object

    
    fs.writeFile(filePath, jsonData, (err) => {
      if (err) {
        console.error('Error writing to JSON file:', err);
      } else {
        console.log('Data has been written to the JSON file successfully!');
      }
    });
    console.log('Data read from the JSON file:', data);
  }
});

// Convert JavaScript object to JSON string
const jsonData = JSON.stringify(dataToWrite, null, 2);

// Writing to the JSON file
fs.writeFile(filePath, jsonData, (err) => {
  if (err) {
    console.error('Error writing to JSON file:', err);
  } else {
    console.log('Data has been written to the JSON file successfully!');
  }
});

      }
      
  console.log('adress',contractAddress)
  
  


      

      return res.status(200).json({address: contractAddress})
      

   }catch(err){
    console.log(err)
    return res.status(500).json({error:err})
   }
}