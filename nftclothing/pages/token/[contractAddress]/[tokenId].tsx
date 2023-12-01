import {
    MediaRenderer,
    ThirdwebNftMedia,
    useAddress,
    useWallet,
  } from "@thirdweb-dev/react";
  import React, { useEffect, useState } from "react";
  import { KlaytnTestnetBaobab, Mumbai} from "@thirdweb-dev/chains";
  import { GetStaticProps, GetStaticPaths } from "next";
  import { NFT, ThirdwebSDK } from "@thirdweb-dev/sdk";


 
  import { Signer } from "ethers";
  import newSmartWallet from "../../../components/smartWllet/smartWallet";
  import SmartWalletConnected from "../../../components/smartWllet/smartConnected";
import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import { membership } from "../../../components/constant";
import Header from "../../../components/Header";

  
  type Props = {
    nft: NFT;
    contractMetadata: any;
  };
  
  export default function TokenPage({ nft, contractMetadata }: Props) {
    const [smartWalletAddress, setSmartWalletAddress] = useState<string | null>(
      null
    );
    const [signer, setSigner] = useState<Signer>();
  
    // get the currently connected wallet
    const address = useAddress();
    const wallet = useWallet();
  
    // create a smart wallet for the NFT
    useEffect(() => {
      const createSmartWallet = async (nft: NFT) => {
        if (nft && smartWalletAddress == null && address && wallet) {
          const smartWallet = newSmartWallet(nft);
          console.log("personal wallet", address);
          // await smartWallet.connect({
          //   personalWallet: wallet,
          // });
          // setSigner(await smartWallet.getSigner());
          // console.log("signer", signer);
          // setSmartWalletAddress(await smartWallet.getAddress());
          // console.log("smart wallet address", await smartWallet.getAddress());
          return smartWallet;
        } else {
          console.log("smart wallet not created");
        }
      };
      createSmartWallet(nft);
    }, [nft, smartWalletAddress, address, wallet]);
  
    return (
      <>
       
       <Container  maxW='100vw' h='100vh' p={4} color='white'  bgColor='black'>
          <Header/>
         <Flex  alignContent='center' mt='10px'>
            <Box>
              <ThirdwebNftMedia
                metadata={nft.metadata}
                
              />
            </Box>
  
            <Box>
              {contractMetadata && (
                <Box>
                  <p>{contractMetadata.name}</p>
                </Box>
              )}
              <Heading>{nft.metadata.name}</Heading>
              <Box>Token ID #{nft.metadata.id}</Box>
              {smartWalletAddress ? (
                <SmartWalletConnected signer={signer} />
              ) : (
                <Box>
                  Loading...
                </Box>
              )}
            </Box>
          </Flex>
        </Container>
      </>
    );
  }
  
  export const getStaticProps: GetStaticProps = async (context) => {
    const tokenId = context.params?.tokenId as string;
  
    const sdk = new ThirdwebSDK(Mumbai, {
      secretKey: process.env.THIRDWEB_SECRET_KEY ,
    });
  
    const contract = await sdk.getContract(membership);
  
    const nft = await contract.erc721.get(tokenId);
    console.log(nft.metadata.uri, "Here!!!");
  
    let contractMetadata;
  
    try {
      contractMetadata = await contract.metadata.get();
    } catch (e) {}
  
    return {
      props: {
        nft,
        contractMetadata: contractMetadata || null,
      },
      revalidate: 1, // https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
    };
  };
  
  export const getStaticPaths: GetStaticPaths = async () => {
    const sdk = new ThirdwebSDK(Mumbai, {
      secretKey: process.env.THIRDWEB_SECRET_KEY ,
    });
  
    const contract = await sdk.getContract(membership);
  
    const nfts = await contract.erc721.getAll();
  
    const paths = nfts.map((nft) => {
      return {
        params: {
          contractAddress: membership,
          tokenId: nft.metadata.id,
        },
      };
    });
  
    return {
      paths,
      fallback: "blocking", // can also be true or 'blocking'
    };
  };