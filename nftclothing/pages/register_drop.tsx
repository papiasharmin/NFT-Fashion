import { ConnectWallet, useAddress, useSigner, useContract, useUnclaimedNFTSupply, useLazyMint, Web3Button, useEmbeddedWalletUserEmail, useEmbeddedWallet } from "@thirdweb-dev/react";

import NextLink from 'next/link';
import { NextPage } from "next";
import { Flex, Box, Spacer, Heading, Container, Icon,   Menu, MenuButton, MenuList, MenuItem, Button, Text, Image, 

  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,} from '@chakra-ui/react';
import { Link } from "@chakra-ui/next-js";
import { FaShopify,FaUserAstronaut, FaCamera } from "react-icons/fa";
import {FormEvent, useState, useRef, useEffect} from 'react';
import { ThirdwebSDK } from "@thirdweb-dev/react";
import { KlaytnTestnetBaobab, Mumbai} from "@thirdweb-dev/chains";
import { ContractWithMetadata, } from "@thirdweb-dev/react";
import Header from "../components/Header";


const Register: NextPage = () => {
   
    const [isCreate, setisCreate] = useState(false);
    const [mint, setMint] = useState(false);
    const [contracts, setContract] = useState<string>('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [nftimg, setImgurl] = useState<string>('');
    const [nftname, setNftName] = useState('');
    const [nftdescription, setNftDescription] = useState('');
    const [key, setKey] = useState('');
    const [getkey, setGetKey] = useState(false);
    const userAddr = useAddress();
    const email = useEmbeddedWalletUserEmail();
    const sdk = ThirdwebSDK.fromPrivateKey(
      'ae93e2399730c5f6708fe01b075b2a76e8947245dcc602b315359e052252f0c2',
      Mumbai,
      {
        clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID, // Use secret key if using on the server, get it from dashboard settings
      },
    );
    
    console.log('EMAIL',email)

    const { contract } = useContract('0x96F75E2635D4593Fe29c867E963417655918000d');
    const { mutateAsync: lazyMint} = useLazyMint(contract);
  
    //const { data} = useUnclaimedNFTSupply(contract);


   //console.log('nft',data)
    
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const [nftmetadata, setNftmetadata] = useState<{name:string,description:string,image:string}[]>([]);

    const handleClick = () => {
      
      hiddenFileInput?.current?.click();
    };
    const addnftmetadata = () =>{
        const metadata = {
          name: nftname,
          description:nftdescription,
          image:nftimg
        }
        setImgurl('');
        setNftDescription('');
        setNftName('');
        setNftmetadata((prev) =>{
          let arr = prev;
          arr.push(metadata);
          return arr;
        })
        console.log('ALLMETA',nftmetadata)
    }
    

    const handleSubmit = async (e: FormEvent) =>{
      e.preventDefault();
      console.log('detail',name,description, key, userAddr);
      const res = await fetch("/api/create-drop",{
        method:'POST',
        body: JSON.stringify({
           key:key,
           name: name,
           address:userAddr,
           description: description

        })
      });
      if(res.status === 200){
        
       await getContract(userAddr!);
      }
      setisCreate(false);
      setKey('');
    }

    const getContract = async (userAddr: string)=>{
      const res = await fetch("/api/get-contract")

      if(res.status === 200){
        let con = await res.json();
        console.log('condata',con);
        con.contract.map(async (item:{user:string,contract:string})=>{
          if(item.user === userAddr){
            const contract = await sdk.getContract(item.contract);

            const data = await contract.erc721.getAll()
            console.log('nftdata',data)
            setContract(item.contract)
          }
        })
       }
    }

    useEffect(()=>{
      if(userAddr){     
        getContract(userAddr);
      }
    },[userAddr])

    useEffect(()=>{

    },[contracts])

    return (
      <Container  maxW='100vw' h='fit-content' p={4} color='white'  bg='black'>
        <Header/>
   
          <Flex >
            <Image src='/images/aigenerate1.jpg' w='50vw' h='100vh' alt=''/>
            <Spacer/>
            <Box pr='10%' justifySelf='flex-start' alignSelf='center' mt='10px'>
              {isCreate?
                mint ?
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  addnftmetadata()
                  const contract = await sdk.getContract(contracts);
                      await contract?.erc721.lazyMint(nftmetadata)
                  
                  }}>
                   <FormControl>
                      <FormHelperText mt='5px' bgColor='whitesmoke' color='black' p='' borderRadius='lg' fontSize='2xl'>Add NFT Metadata</FormHelperText>
                      <FormLabel mt='5px'>Name of NFT</FormLabel>
                      <Input type='text' placeholder="Name" value={nftname} onChange={(e)=> setNftName(e.target.value)} required/>
                      <FormLabel mt='5px'>Give A description of the NFT</FormLabel>
                      <Input type='text' placeholder="Description" value={nftdescription} onChange={(e)=> setNftDescription(e.target.value)} required/>
                      <FormLabel mt='5px'>NFT image URL</FormLabel>
                      <Input type='text' placeholder="Key" value={nftimg} onChange={(e)=> setImgurl(e.target.value)} required/> 
                      <Button type='button' onClick={addnftmetadata}>Add another nft</Button>   
                  </FormControl>
                  <Button type="submit">Mint</Button>
                </form>
                :
                <>
                {getkey ?
                    <iframe
                      src={`https://embedded-wallet.thirdweb.com/sdk/2022-08-12/embedded-wallet/export?clientId=${"f0de2f56be44a9c35c502908aaf6a83f"}`}
                      allow="{clipboard-read 'self' https://embedded-wallet.thirdweb.com/sdk/2022-08-12/embedded-wallet/export?clientId=f0de2f56be44a9c35c502908aaf6a83f; clipboard-write 'self' https://embedded-wallet.thirdweb.com/sdk/2022-08-12/embedded-wallet/export?clientId=f0de2f56be44a9c35c502908aaf6a83f}"
                    />
                    :
                    ""
                }
                <form onSubmit={handleSubmit}>
                  
                  <FormControl>
                      <FormHelperText mt='5px' bgColor='whitesmoke' color='black' p='' borderRadius='lg' fontSize='2xl'>Need to deploy a ERC-721 Contract to create a drop</FormHelperText>
                      <FormLabel mt='5px'>Give a contract name</FormLabel>
                      <Input type='text' placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)} required/>
                      <FormLabel mt='5px'>Give contract description</FormLabel>
                      <Input type='text' placeholder="Description" value={description} onChange={(e)=> setDescription(e.target.value)} required/>
                      <FormLabel mt='5px'>Enter Your wallet private key</FormLabel>
                      <Input type='text' placeholder="Key" value={key} onChange={(e)=> setKey(e.target.value)} required/>  
                      {email ? <Button type="button" mt='5px' onClick={()=> setGetKey(true)}>Get Key!</Button> :""}
                  </FormControl>
                  <Flex mt='10px'>
                    <Button type="submit">Deploy</Button>
                    <Spacer/>
                    <Button type="button" onClick={()=> setisCreate(false)}>Cancel</Button>
                  </Flex>
                </form>
                </>
                :
                <>
                  {contracts ?
                    <Box>
                      <Text bgColor='whitesmoke' color='black' p='' borderRadius='lg' fontSize='2xl'>Contract Deployed</Text>
                        <Box  border='1px solid whitesmoke' borderRadius='lg' p='5px' fontSize='md' fontWeight='bold' mt='10px'>
                          <Text>{contracts}</Text>
                          <Button onClick={()=> {
                            setisCreate(true)
                            setMint(true)
                          }}>Lazy Mint NFT</Button>
                        </Box>
                    </Box>
                     :
                     <Text bgColor='whitesmoke' color='black' p='' borderRadius='lg' fontSize='2xl'>No Contract Deployed Yet</Text>
                  }

                  <Text my='10%' fontSize='lg' fontFamily='h2' textAlign='center'>By dropping NFTs you can allow other people to claim and purchase NFTs directly</Text>
                  <Button onClick={()=> setisCreate(true)}>
                    Create NFT Drop
                  </Button>
                </>
              }
            </Box>
          </Flex>
      </Container>
    );
  };
  
  export default Register;

  // <Web3Button
  // contractAddress={contracts}
  // action={() =>
  //         lazyMint({
  //           // Metadata of the NFTs to upload
  //            metadatas: [
  //                      {
  //                       name: "Hoodie 1",
  //                       description: "This is a cool Hoodie",
  //                       image: "https://img.joomcdn.net/cff862d46d494cc41e4d2af0840a85cbbb67881b_original.jpeg", 
  //                      },
  //                      {
  //                       name: "Sneaker 1",
  //                       description: "This is a cool Sneaker",
  //                       image: "https://i.etsystatic.com/16489875/r/il/600ab8/3790184197/il_570xN.3790184197_jj0v.jpg", 
  //                     },
  //                     {
  //                       name: "Bagpack 1",
  //                       description: "This is a cool Bag",
  //                       image: "https://i.ebayimg.com/images/g/8GYAAOSw4vRkvONW/s-l1600.png", 
  //                     },
  //             ]
  //           })
  //         }
  //    >
  //      Lazy Mint NFTs
  //   </Web3Button>

  /////////////

//   <Input type="number" onChange={(e)=>{
//     let arr = []
//    for(let i=0; i < +e.target.value; i++){
//         arr.push(nftmetadatasam); 

//    }
//    setNftmetadata(arr);
//    }
 
//    }
//    required
//    />
//  {
//    nftmetadata.length > 0 ? 
//     <>
//        <FormLabel>Edit the name, description, media and other fields for each NFT</FormLabel>
//        <Input type="text" w='100%' h='100%' defaultValue={nftmetadata} onChange={(e)=>setNftmetadataup(e.target.value)} required/>
//     </>
//      : ""
//  }