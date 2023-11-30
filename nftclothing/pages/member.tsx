import { ConnectWallet, Web3Button, useAddress, useClaimNFT, useContract } from "@thirdweb-dev/react";
import NextLink from 'next/link';
import { NextPage } from "next";
import { Flex, Box, Spacer, Heading, Container, Icon,   Menu, MenuButton, MenuList, MenuItem, Button, Text, Image} from '@chakra-ui/react';
import { Link } from "@chakra-ui/next-js";
import { FaShopify,FaUserAstronaut } from "react-icons/fa";
import {useState} from 'react';
import Header from "../components/Header";
import { membership } from "../components/constant";

const Member: NextPage = () => {
    const [isMember, setisMember] = useState(false);
    const { contract } = useContract(membership);
    const address = useAddress();
    const {
      mutate: claimNFT,
      isLoading,
      error,
    } = useClaimNFT(contract);
  
    return (
      <Container  maxW='100vw' h='fit-content' p={4} color='white'  bgGradient='linear(red.300 0%, orange.500 40%, yellow.500 80%)'>
   
        <Header/>

        <Text>By claming membership, you will get a membership nft which will be also a token bound account to manage and hold all you future purches.</Text>

        <Web3Button 
           contractAddress={membership}
           action={() => claimNFT({ to: address, quantity: 1 })}
        >
          Claim membership
        </Web3Button>
  
 
  
  
  
      </Container>
    );
  };
  
  export default Member;