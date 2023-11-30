import { ConnectWallet } from "@thirdweb-dev/react";
import NextLink from 'next/link';
import { NextPage } from "next";
import { Flex, Box, Spacer, Heading, Container, Icon,   Menu, MenuButton, MenuList, MenuItem, Button, Text, Image, FormControl, FormLabel, Input} from '@chakra-ui/react';
import { Link } from "@chakra-ui/next-js";
import { FaShopify,FaUserAstronaut } from "react-icons/fa";
import {useState} from 'react';
import Header from "../components/Header";
import { json } from "stream/consumers";
import {FormEvent} from 'react';


const AIcustomize: NextPage = () => {
    const [isMember, setisMember] = useState(false);
    const [imgtext, setimgtext] = useState<string>("");
    const [img, setimg] = useState();

    const genarateImg = async(e: FormEvent)=>{
      e.preventDefault()
      const res = await fetch('https://api.openai.com/v1/images/generations',{
        method:'POST',
        headers:{
          "Content-Type": "application/json",
          "Authorization": "Bearer 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",
          "User-Agent":"Chrome"

        },
        body:JSON.stringify({
          prompt:`${imgtext}`,
          n:1,
          size:"512x512"
        })


      });
      let i = await res.json();

      console.log('responseai',i[0].url)

    }
  
    return (
      <Container  maxW='100vw' h='100vh' p={4} color='white'  bgColor='black'>
          <Header/>
          <Flex width='100%' height='100%'>
          <Box >
            <Image src='/images/aigeneratehood.jpeg' alt='' w='350px' h='350px'/>
            <Image src='' alt ='' />

          </Box>
          <Box>
            <form onSubmit={genarateImg}>
                <FormControl>
                      
                      <FormLabel mt='5px'>Give a contract name</FormLabel>
                      <Input type='text' placeholder="Name" value={imgtext} onChange={(e)=> setimgtext(e.target.value)} required/>
                  
                      <Button type="submit" mt='5px'>Generate </Button>
                </FormControl>
              </form>
            
          </Box>
          </Flex>
  
 
  
  
  
      </Container>
    );
  };
  
  export default AIcustomize;