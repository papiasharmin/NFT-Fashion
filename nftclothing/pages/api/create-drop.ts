import {NextApiRequest, NextApiResponse} from "next";
import { ThirdwebSDK } from "@thirdweb-dev/sdk"; 
import { KlaytnTestnetBaobab, Mumbai} from "@thirdweb-dev/chains";
import path from 'path';
import fsPromises from 'fs/promises';


export default async function handeler(
    req:NextApiRequest,
    res:NextApiResponse
) {

  
   try{
    const {key, name, address, description}= JSON.parse(req.body);

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

    const dataFilePath = path.join(process.cwd(), "/pages/api/json/userData.json");

    // Read the existing data from the JSON file
    const jsonData = await fsPromises.readFile(dataFilePath,'utf8');
    const objectData = JSON.parse(jsonData);

    console.log('data',objectData)

    const dataToWrite = {
        user: address,
        contract: contractAddress
    }
    let jData;

    if(objectData.length > 0){
      
      if(objectData.find((item:{user:string,contract:string})=> item.user === address)){
        objectData.map((item:{user:string,contract:string})=>{
          if(item.user == address){
            item.contract = contractAddress
          }
        })
        console.log('yeasdata',objectData)
      }else{
        objectData.push(dataToWrite);
      }
      jData = JSON.stringify(objectData, null, 2);
       
    }else{
      jData = {
        data:[dataToWrite],
      };

      jData = JSON.stringify(jsonData, null, 2);
  }
 
    // Convert the object back to a JSON string
    const updatedData = JSON.stringify(objectData);

    console.log('updata',updatedData)
    
    // Write the updated data to the JSON file
    await fsPromises.writeFile(dataFilePath, updatedData);

      // if(contractAddress){
      //   const filePath = 'data.json';


// fs.readFile(filePath, 'utf8', (err, data) => {
//   if (err) {
//     console.error('Error reading JSON file:', err);
//   } else {
//     // Parse the JSON string into a JavaScript object
//     let jdata = JSON.parse(data)
//     const dataToWriteob = {
//       user:address,
//       contract:contractAddress
//   };
//   let dataToWrite
//   let jsonData
//     console.log('Data read from the JSON file:', jdata, jdata.data, typeof jdata);
   
//     //  dataToWrite = jdata.data?.push(dataToWrite)


  

//     fs.writeFile(filePath, jsonData, (err) => {
//       if (err) {
//         console.error('Error writing to JSON file:', err);
//       } else {
//         console.log('Data has been written to the JSON file successfully!');
//       }
//     });
    
//   }
// });



//       }
      
//   console.log('adress',contractAddress)
  
  


      

    return res.status(200).json({address: contractAddress})
      

   }catch(err){
    console.log(err)
    return res.status(500).json({error:err})
   }
}