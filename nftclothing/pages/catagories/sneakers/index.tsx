import { ConnectWallet } from "@thirdweb-dev/react";
import NextLink from 'next/link';
import { NextPage } from "next";
import { Flex, Box, Spacer, Heading, Container, Icon,   Menu, MenuButton, MenuList, MenuItem, Button, Text, Image} from '@chakra-ui/react';
import { Link } from "@chakra-ui/next-js";
import { FaShopify,FaUserAstronaut } from "react-icons/fa";
import {useState} from 'react';
import NftCard from "../../../components/nftCard";

const Sneakers: NextPage = () => {
    const [isMember, setisMember] = useState(false);
    const [allSneakers, setallSneakers] = useState([]);
  
    return (
      <Container  maxW='100vw' h='fit-content' p={4} color='white'  bgGradient='linear(red.300 0%, orange.500 40%, yellow.500 80%)'>
   
          <Flex minWidth='max-content' alignItems='center' gap='2' border='2px' borderColor='white.600' borderRadius='lg' px={4} py={2} fontFamily='h1'>
  
            <Box p='2'>
                <Heading size='lg' fontFamily='h1'>Dapper</Heading>
            </Box>
            <Spacer />
            <Menu>
              <MenuButton>
                <Text fontSize='lg'>
                  Catagories
                </Text>
              </MenuButton>
              <MenuList color='black'>
                <MenuItem as='a' href='#'>
                  <Text>
                    Hoodies
                  </Text>
                </MenuItem>
                <MenuItem as='a' href='#'>
                  <Text>
                    Bags
                  </Text>
                </MenuItem>
                <MenuItem as='a' href='#'>
                  <Text>
                    Sneakers
                  </Text>
                </MenuItem>
              </MenuList>
            </Menu>
  
            <Link as={NextLink} href='/' pl='10px'>
              <Text fontSize='lg'>
                AI Customize
              </Text>
            </Link>
            <Link as={NextLink} href='/' pl='10px'>
              <Text fontSize='lg'>
                Latest Drop
              </Text>
            </Link>
            <Link as={NextLink} href='/' pl='10px'>
              <Text fontSize='lg'>
                Register Drop
              </Text>
            </Link>
            <Spacer/>
            <Link as={NextLink} href='/' pl='10px'>
              {isMember ? <Icon as={FaUserAstronaut} boxSize={8} /> : <Text fontSize='lg'>Membership</Text>}
            </Link>
            <Link as={NextLink} href='https://ramp.alchemypay.org/#/' pl='10px'>
              <Text>Fund Wallet</Text>
            </Link>  
            <Link as={NextLink} href='/' pl='10px'>
              <Icon as={FaShopify} boxSize={8}/>
            </Link>
          
            <Spacer />
            <ConnectWallet
                dropdownPosition={{
                  side: "bottom",
                  align: "center",
                }}
            />
            
          </Flex>

          <Text fontFamily='h2' fontSize='20px' >
             Claim Your Unique Wear
          </Text>
          <Box borderTop='2px solid whitesmoke' my='5%'>

             {allSneakers.length > 0 && 
             <>
        
             </>

             

             }

          </Box>
  
 
  
  
  
      </Container>
    );
  };
  
  export default Sneakers;