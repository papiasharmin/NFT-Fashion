import {NextApiRequest, NextApiResponse} from "next";
import { ThirdwebSDK } from "@thirdweb-dev/sdk"; 
import { KlaytnTestnetBaobab, Mumbai} from "@thirdweb-dev/chains";
import { contractdata } from "../../components/data";
import { contractdatas } from "../../components/mydata";
import fs from 'fs';
import path from 'path';
import { json } from "stream/consumers";
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


// Specify the file path
// const abpath = path.resolve("../../components/mydata");
// console.log(abpath)
const filePath = 'data.ts';
const filePaths = 'mydata.ts';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading JSON file:', err);
  } else {
    // Parse the JSON string into a JavaScript object
    let jdata = JSON.parse(data)
    const dataToWriteob = {
      user:address,
      contract:contractAddress
  };
  let dataToWrite
  let jsonData
    console.log('Data read from the JSON file:', jdata, jdata.data, typeof jdata);
   
    //  dataToWrite = jdata.data?.push(dataToWrite)
    if(jdata.data?.length > 0){
      console.log('length',jdata.data?.length)
      if(jdata.data.find((item:{user:string,contract:string})=> item.user === address)){
        jdata.data.map((item:{user:string,contract:string})=>{
          if(item.user == address){
            item.contract = contractAddress
          }
        })
        console.log('yeasdata',jdata)
      }else{
        jdata.data.push(dataToWriteob)
      }

      
       jsonData = JSON.stringify(jdata, null, 2);
       
    }else{
     jsonData = {
      data:[dataToWriteob],
   };

    jsonData = JSON.stringify(jsonData, null, 2);
  }

  

    fs.writeFile(filePath, jsonData, (err) => {
      if (err) {
        console.error('Error writing to JSON file:', err);
      } else {
        console.log('Data has been written to the JSON file successfully!');
      }
    });
    
  }
});

// fs.readFile(filePaths, 'utf8', (err, data) => {
//   if (err) {
//     console.error('Error reading JSON file:', err);
//   } else {
//     // Parse the JSON string into a JavaScript object
//     let jdata = JSON.parse(data)

//     console.log('Data read from the JSON file:', jdata);
//     const dataToWrite = {
//       user:address,
//       contract:contractAddress
//   };
//   //0x9531c7816022b9194cd3e984b74acaa9926609259fdcaf487466295b1165a14c

//   const jsonData = JSON.stringify(dataToWrite, null, 2);
// }
// });

// Convert JavaScript object to JSON string


// Writing to the JSON file
// fs.writeFile(filePath, jsonData, (err) => {
//   if (err) {
//     console.error('Error writing to JSON file:', err);
//   } else {
//     console.log('Data has been written to the JSON file successfully!');
//   }
// });

      }
      
  console.log('adress',contractAddress)
  
  


      

      return res.status(200).json({address: contractAddress})
      

   }catch(err){
    console.log(err)
    return res.status(500).json({error:err})
   }
}