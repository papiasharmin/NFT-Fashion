import { ConnectWallet, useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import Image from "next/image";
import NextLink from 'next/link';
import { Flex, Box, Spacer, Heading, Icon, Menu, MenuButton, MenuList, MenuItem, Button, Text, Container} from '@chakra-ui/react';
import { Link } from "@chakra-ui/next-js";
import { FaShopify,FaUserAstronaut } from "react-icons/fa";
import {useState} from 'react';
import { membership } from "./constant";


const Header = () => {
    const [isMember, setisMember] = useState(false);
    const address = useAddress();
    const {contract} = useContract(membership,"nft-drop");
    const {data,isLoading} = useOwnedNFTs(contract, address);

    console.log('memberdata',data)

    return (
      <Container  maxW='100vw' h='fit-content' p={4} color='white'>
      <Flex minWidth='max-content' alignItems='center' gap='2' border='2px' borderColor='white.600' borderRadius='lg' px={4} py={2} fontFamily='h1'>

      <Link as={NextLink} href='/' p='2'>
          <Heading size='lg' fontFamily='h1'>Dapper</Heading>
      </Link>
      <Spacer />
        <Link as={NextLink} href='/buy' pl='10px'>
          <Text fontSize='lg'>
            Buy
          </Text>
   
          </Link>
      <Link as={NextLink} href='/ai_customize' pl='10px'>
        <Text fontSize='lg'>
          AI Customize
        </Text>
      </Link>
   
      <Link as={NextLink} href='/register_drop' pl='10px'>
        <Text fontSize='lg'>
          Register Drop
        </Text>
      </Link>
      <Spacer />
      
      {!isLoading && data?.length! > 0 ? 
        <Link as={NextLink} href={`/token/${membership}/${data![0].metadata.id}`} pl='10px'>
            <Icon as={FaUserAstronaut} boxSize={8} /> 
        </Link>
        
        :
        <>
        <Link as={NextLink} href='/member' pl='10px'>
        <Text fontSize='lg'>Membership</Text>
        </Link>
      
        <Link as={NextLink} href='/cart' pl='10px'>
           <Icon as={FaShopify} boxSize={8}/>
         </Link>
      </>
       }
      
      <Link as={NextLink} href='https://ramp.alchemypay.org/#/' pl='10px'>
        <Text fontSize='lg'>Buy Crypto</Text>
      </Link>

      <ConnectWallet
          dropdownPosition={{
            side: "bottom",
            align: "center",
          }}
      />
      
    </Flex>
    </Container>
    );
  };
  
  export default Header;

//   <Menu>
//   <MenuButton>
//     <Text fontSize='lg'>
//       Catagories
//     </Text>
//   </MenuButton>
//   <MenuList color='black'>
//     <MenuItem >
//       <Link as={NextLink} href='/catagories/hoodies' >
//         Hoodies
//       </Link>
//     </MenuItem>
//     <MenuItem >
//       <Link as={NextLink} href='/catagories/bags' >
//         Bags
//       </Link>
//     </MenuItem>
//     <MenuItem >
//       <Link as={NextLink} href='/catagories/sneakers' >
//         Sneakers
//       </Link>
//     </MenuItem>
//   </MenuList>
// </Menu>