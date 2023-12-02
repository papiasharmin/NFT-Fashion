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
    const [isMember, setisMember] = useState(false);
    const [isCreate, setisCreate] = useState(false);
    const [isembadded, setisembaded] = useState(false);
    const [mint, setMint] = useState(false);
    const [contracts, setContract] = useState<string>('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [key, setKey] = useState('');
    const [getkey, setGetKey] = useState(false);
    const [deployedContract, setdeployedContract ] = useState([]);//0x3576d5E1c1797102a4d9702dD7D6714928bCF241
    const userAddr = useAddress();
    const email = useEmbeddedWalletUserEmail();
    


    const { contract } = useContract('0x611D059db8ad17a13167b2373267Fc7a334b7be0');
  const { mutateAsync: lazyMint} = useLazyMint(contract);
  
  const { data} = useUnclaimedNFTSupply(contract);
    
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const [nftmetadatasam, setNftmetadatasam] = useState('{name: "Hoodie 1",description: "This is a cool Hoodie",image: "", }');
    const [nftmetadata, setNftmetadata] = useState<string[]>([]);
    const [nftmetadataup, setNftmetadataup] = useState<string>("");

    const readOnlySdk = new ThirdwebSDK(
      Mumbai,
    {
      clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID, 
    });

    const handleClick = () => {
      
      hiddenFileInput?.current?.click();
    };
    
    

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
      const res = await fetch("/api/get-contract",{
        method:'POST',
        body: JSON.stringify({
           
           address:userAddr,
        })
      })

      if(res.status === 200){
        let con = await res.json();
        console.log('condata',con);
        con.contract?.data?.map((item:{user:string,contract:string})=>{
          if(item.user === userAddr){
            setContract(item.contract)
          }
        })
        
       }
      
      
    }

    useEffect(()=>{
      if(userAddr && readOnlySdk){
        
        getContract(userAddr);
      }

    },[])

    console.log('data',data)

    


  



 
    return (
      <Container  maxW='100vw' h='fit-content' p={4} color='white'  bg='black'>
        <Header/>
   
          <Flex >
            <Image src='/images/aigenerate1.jpg' w='50vw' h='100vh' alt=''/>
            <Spacer/>
            <Box pr='10%' justifySelf='flex-start' alignSelf='center' mt='10px'>
              {isCreate?
                mint ?
                <form onSubmit={()=>lazyMint({metadatas:nftmetadata})}>
                  <FormLabel>How Many NFTs you Want To Mint</FormLabel>
                  <Input type="number" onChange={(e)=>{
                     let arr = []
                    for(let i=0; i < +e.target.value; i++){
                         arr.push(nftmetadatasam); 

                    }
                    setNftmetadata(arr);
                    }
                  
                    }
                    required
                    />
                  {
                    nftmetadata.length > 0 ? 
                     <>
                        <FormLabel>Edit the name, description, media and other fields for each NFT</FormLabel>
                        <Input type="text" w='100%' h='100%' defaultValue={nftmetadata} onChange={(e)=>setNftmetadataup(e.target.value)} required/>
                     </>
                      : ""
                  }
                  
                  <Button>Mint</Button>

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
           
                          <Web3Button
                            contractAddress={contracts}
                            action={() =>
                                    lazyMint({
                                      // Metadata of the NFTs to upload
                                       metadatas: [
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
                                        ]
                                      })
                                    }
                               >
                                 Lazy Mint NFTs
                              </Web3Button>
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

  // <FormLabel>Upload image for contract</FormLabel>
  // {img && <Image src={`${img}`} alt="" w='30px' h='30px'/>
 
  // }
  //   <label htmlFor="inputTag" >
  //     Select Image <br/>
      
  //     <Icon as={FaCamera} boxSize={8}  onClick={handleClick}/>
  //    <input id="inputTag" type="file" style={{display:'none'}} onChange={(e)=> setImg(e.target.value)} ref={hiddenFileInput}/>
  //    <br/>

  //   </label>
  
//kLPaIW-HPpSd0y5h90iayq5FkaHxIP5O4xRlc4C1f2hY8rtQRu5i6UhLQP7g0NJ86nxxrCpXEVg56cIVAdpH9A