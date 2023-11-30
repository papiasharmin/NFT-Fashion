import {
    ThirdwebSDKProvider,
    useAddress,
    useBalance,
    Web3Button,
  } from "@thirdweb-dev/react";
  import React from "react";
  import { Signer } from "ethers";
  
import { membership } from "../constant";
import { Mumbai} from "@thirdweb-dev/chains";
import { Box, Heading } from "@chakra-ui/react";

  interface ConnectedProps {
    signer: Signer | undefined;
  }
  
  // ThirdwebSDKProvider is a wrapper component that provides the smart wallet signer and active chain to the Thirdweb SDK.
  const SmartWalletConnected: React.FC<ConnectedProps> = ({ signer }) => {
    return (
      <ThirdwebSDKProvider
        signer={signer}
        activeChain={Mumbai}
        clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      >
        <ClaimTokens />
      </ThirdwebSDKProvider>
    );
  };
  
  // This is the main component that shows the user's token bound smart wallet.
  const ClaimTokens = () => {
    const address = useAddress();
    const { data: tokenBalance, isLoading: loadingBalance } =
      useBalance(membership);
  
    return (
      <Box>
        <Heading>This is Your Token Bound Smart Wallet!</Heading>
        {address ? (
          loadingBalance ? (
            <Heading>Loading Balance...</Heading>
          ) : (
            <Box>
              <h2>Balance: {tokenBalance?.displayValue}</h2>
              <Web3Button
                contractAddress={membership}
                action={async (contract) => await contract.erc20.claim(10)}
      
              >
                Claim 10 Tokens
              </Web3Button>
            </Box>
          )
        ) : null}
      </Box>
    );
  };
  
  export default SmartWalletConnected;