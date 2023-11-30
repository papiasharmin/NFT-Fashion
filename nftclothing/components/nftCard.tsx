
import NextLink from 'next/link';
import { NextPage } from "next";
import { Box, Button, Flex, Skeleton, Spacer, Text} from '@chakra-ui/react';
import { Link } from "@chakra-ui/next-js";
import {useState} from 'react';
import { NFTDrop, NFT, Status } from '@thirdweb-dev/sdk';
import { marketplace_contract, nft_drop } from './constant';
import { ThirdwebNftMedia, useAddress, useClaimNFT, useContract, useValidDirectListings, useClaimConditions} from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { Appearance, StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import CreditCardForm from './stripeForm';

type Props = {
    nft: NFT;
};


const NftCard = ({nft}:Props) => {
    const  {contract: marketplace, isLoading: loadingMarketplace } = useContract(marketplace_contract, "marketplace-v3");
    const { contract } = useContract(nft_drop);
    const address = useAddress();

    const stripe = loadStripe('pk_test_51NhSR2E8TmXICSjP6aOc2RcAOlgpQUbXuAULpiqM9UrvvamrAJD1zpb8hOtEEJ2jayb1nPRhdsTu8PPJzurBUrBx009DRF8aG0')
    const [clientSecret,setClientSecrate] = useState<string>("")
    const appearance: Appearance = {
      theme:"night",
      labels:"above"
    }
    const options: StripeElementsOptions = {
       clientSecret,
       appearance
    }

    const { data: directListing, isLoading: loadingDirectListing } = 
        useValidDirectListings(marketplace, {
            tokenContract: nft_drop,
            tokenId: nft.metadata.id,
        });

        const {
            mutate: claimNFT,
            isLoading,
            error,
          } = useClaimNFT(contract);

          const { data: claimConditions, } = useClaimConditions(contract);
        
          if (error) {
            console.error("failed to claim nft", error);
          }
    const paywithcard = async ()=>{
        const res = await fetch("api/stripe",{
          method:"POST",
          body:JSON.stringify({
            address
          })
        })
        if(res.status == 200){
            const data = await res.json();
            setClientSecrate(data.clientSecret)
        }

    }

    console.log('nftdata',nft, 'claim',claimConditions)
  
    return (
        <Flex direction={"column"} backgroundColor={"#EEE"} justifyContent={"center"} padding={"2.5"} borderRadius={"6px"} borderColor={"lightgray"} borderWidth={1}>
            <Box borderRadius={"4px"} overflow={"hidden"}>
                <ThirdwebNftMedia metadata={nft.metadata} height={"100%"} width={"100%"} />
            </Box>
            <Text fontSize={"small"} color={"darkgray"}>Token ID #{nft.metadata.id}</Text>
            <Text fontWeight={"bold"}>{nft.metadata.name}</Text>

            <Box>
                {loadingMarketplace || loadingDirectListing ? (
                    <Skeleton></Skeleton>
                ) : directListing && directListing[0] ? (
                    <Box w='250px' h='400px'>
                        <Flex direction={"column"}>
                            <Text fontSize={"small"}>Price</Text>
                            <Text fontSize={"small"}>{`${directListing[0]?.currencyValuePerToken.displayValue} ${directListing[0]?.currencyValuePerToken.symbol}`}</Text>

                        </Flex>
                        <Button
                               disabled={isLoading}
                               onClick={paywithcard}
                            >
                                 Buy with Credit Card
                            </Button>
                            <Spacer/>
                            <Button
                               disabled={isLoading}
                               onClick={() => claimNFT({ to: address, quantity: 1 })}
                            >
                                  Buy with Crypto
                        </Button>
                    </Box>
                ) : (
                    <Box >
                        <Flex direction={"column"}>
                            <Text fontSize={"small"}>Price</Text>
                            <Text fontSize={"small"}>{`${claimConditions![0].currencyMetadata.displayValue} ${claimConditions![0].currencyMetadata.symbol}`}</Text>
                           

                           
                        </Flex>
                        <Button
                               disabled={isLoading}
                               onClick={paywithcard}
                            >
                                 Buy with Credit Card
                            </Button>
                            <Spacer/>
                            <Button
                               disabled={isLoading}
                               onClick={() => claimNFT({ to: address, quantity: 1 })}
                            >
                                  Buy with Crypto
                        </Button>
                    </Box>
                )}
            </Box>
            {clientSecret ? (
            <Box position='absolute' top='' left='' bgColor='whitesmoke' p='30px' borderRadius='10px' boxShadow='2xl' zIndex={2}>
            <Elements
                options={{
                clientSecret,
                appearance,
            }}
            stripe={stripe}
          >
            <CreditCardForm/>
          </Elements>
          </Box>
            )
            : ""

            }
        </Flex>
    )
  };
  
  export default NftCard;