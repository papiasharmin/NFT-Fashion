import { ConnectWallet } from "@thirdweb-dev/react";
import NextLink from 'next/link';
import { NextPage } from "next";
import { Flex, Box, Spacer, Heading, Container, Icon,   Menu, MenuButton, MenuList, MenuItem, Button, Text, Image} from '@chakra-ui/react';
import { Link } from "@chakra-ui/next-js";
import { FaChevronDown, FaShopify,FaUserAstronaut } from "react-icons/fa";
import {useState} from 'react';
import Header from "../components/Header";


const Home: NextPage = () => {
  const [isMember, setisMember] = useState(false);

  







  return (
    
 

    <Container  maxW='100vw' h='fit-content' p={4} color='white'  bgGradient='linear(red.300 0%, orange.500 40%, yellow.500 80%)'>
       <Header/>
        <Flex p='5%' flexDirection='column'>

          <Flex justifyContent='space-between'>
            <Flex position='relative' flexGrow='2'>
              <Box boxShadow='2xl' border='12px solid whitesmoke'  borderTopRadius='full' borderBottomRadius='full' overflow='hidden' w='300px' h='500px'>
                <Image src={`/images/nftclothimg12.png`} w='100%' h='100%' alt=""></Image>
              </Box>
              <Box  boxShadow='2xl' dropShadow='2px 2px 5px whitesmoke' position='absolute' left='150px' top='10%' border='12px solid whitesmoke' borderTopRadius='full' borderBottomRadius='full' overflow='hidden' w='300px' h='500px'>
                <Image src={`/images/nftclothimg13.jpg`} w='100%' h='100%'  alt=""></Image>
              </Box>
              <Box  boxShadow='2xl' border='12px solid whitesmoke' borderTopRadius='full' borderBottomRadius='full' overflow='hidden' w='300px' h='500px'>
                <Image src={`/images/nftclothimg14.png`} w='100%' h='100%'  alt=""></Image>
              </Box>
            </Flex>
            
            <Box position='relative' textAlign='center' fontSize='70px' pl='20px' letterSpacing='3px'>
  
              <Text textShadow='-1px -1px lightgray' zIndex='10' fontFamily='h1'>
                 Make This
              </Text>
              <Text zIndex='10' fontFamily='h2'>
                 Signature
              </Text>
              <Text zIndex='10' fontFamily='h1'>
                 Style Of
              </Text>
              <Text zIndex='10' fontFamily='h2'>
                 Clothing
              </Text>
              <Button fontFamily='h2' boxShadow='2xl' w='50%' fontSize='2xl' color='gray' p='5px' textShadow='2px 2px lightgray' >Buy Dapper NFTs</Button>
            </Box>
          </Flex>
          
              <Text border='2px solid whitesmoke'  borderRadius='lg' fontSize='lg' textAlign='center' my='95px' w='100%' p='40px 10px' h='fit-content' bgGradient={[
                                                                           'linear(to-tr, teal.300, yellow.400)',

  ]}>
                *** Shop Now HURRY! Collect Your Unique Wear ***
              </Text>
                  
          <Flex justifyContent='space-between'>
            <Box textAlign='center' fontSize='70px' pl='20px' letterSpacing='3px'>
              <Text fontFamily='h1'>
                 Genarate Own
              </Text>
              <Text fontFamily='h2'>
                 Signature
              </Text>
              <Text fontFamily='h1'>
                 Style With
              </Text>
              <Text fontFamily='h2'>
                 AI
              </Text>
              <Button fontFamily='h2' boxShadow='2xl'  fontSize='2xl' color='gray' p='5px' textShadow='2px 2px lightgray'>Custozime Dapper</Button>
            </Box>
            <Spacer/>
            <Flex position='relative'>
              <Box border='12px solid whitesmoke'  borderLeftRadius='full' borderRightRadius='full' overflow='hidden' w='500px' h='300px'>
                <Image src={`/images/aigenerate.webp`} width='100%' height='100%' alt=""></Image>
              </Box>
              <Box position='absolute' left='-10px' top='150px' border='12px solid whitesmoke'  borderLeftRadius='full' borderRightRadius='full' overflow='hidden' w='500px' h='300px'>
                <Image src={`/images/aigenerate2.png`} width='100%' height='100%' alt=""></Image>
              </Box>
          
            </Flex>
          </Flex>
          <Text border='2px solid whitesmoke'  borderRadius='lg'fontSize='lg' textAlign='center' mt='185px' mb='95px' w='100%' p='40px 10px' h='fit-content' bgGradient={[
                                                                           'linear(to-tr, teal.300, yellow.400)',

                                                                          ]}>
                *** Shop Now HURRY! Collect Your Unique Wear ***
          </Text>
          
          <Flex justifyContent='space-between'>
            <Flex position='relative'>
              <Box position='absolute' left='200px' top='20px' border='12px solid whitesmoke' borderTopRadius='full' borderBottomRadius='full' overflow='hidden' w='300px' h='500px'>
                <Image src={`/images/nftdrop1.jpg`} width='100%' height='100%' alt=""></Image>
              </Box>
              <Box border='12px solid whitesmoke' borderTopRadius='full' borderBottomRadius='full' overflow='hidden' w='300px' h='500px'>
                <Image src={`/images/nftdrop2.webp`} width='100%' height='100%' alt=""></Image>
              </Box>             
            </Flex>
            <Spacer/>
            <Box textAlign='center' fontSize='70px' pl='20px' letterSpacing='3px'>
              <Text fontFamily='h1'>
                 Create Own
              </Text>
              <Text fontFamily='h2'>
                 Dapper Drop
              </Text>
              <Text fontFamily='h1'>
                 Earn your
              </Text>
              <Text fontFamily='h2'>
                 Reward
              </Text>
              <Button fontFamily='h2' boxShadow='2xl'  fontSize='2xl' color='gray' p='5px' textShadow='2px 2px lightgray'>Drop Dapper NFTs</Button>
            </Box>
          </Flex>

        </Flex>

      </Container>

    
  );
};

export default Home;
