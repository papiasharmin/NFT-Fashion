import { ConnectWallet } from "@thirdweb-dev/react";
import NextLink from 'next/link';
import { NextPage } from "next";
import { Flex, Box, Spacer, Heading, Container, Icon,   Menu, MenuButton, MenuList, MenuItem, Button, Text, Image} from '@chakra-ui/react';
import { Link } from "@chakra-ui/next-js";
import { FaShopify,FaUserAstronaut } from "react-icons/fa";
import {useState} from 'react';
import Header from "../components/Header";


const Cart: NextPage = () => {
    const [isMember, setisMember] = useState(false);
  
    return (
      <Container  maxW='100vw' h='fit-content' p={4} color='white'  bgGradient='linear(red.300 0%, orange.500 40%, yellow.500 80%)'>
   
        <Header/>
 
  
  
  
      </Container>
    );
  };
  
  export default Cart;