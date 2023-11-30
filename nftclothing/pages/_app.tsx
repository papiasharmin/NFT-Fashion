import type { AppProps } from "next/app";
import "../styles/globals.css";
import { ChakraProvider, Container } from '@chakra-ui/react';
import { KlaytnTestnetBaobab, Mumbai} from "@thirdweb-dev/chains";
import Header from "../components/Header";
import '@fontsource/abril-fatface';
import '@fontsource-variable/cinzel';
import theme from './../styles/theme';
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  embeddedWallet
} from "@thirdweb-dev/react";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = KlaytnTestnetBaobab;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={Mumbai}

      supportedWallets={[metamaskWallet(), coinbaseWallet(), embeddedWallet()]}

    >
      <ChakraProvider theme={theme}>
        
           
           <Component {...pageProps} />
      
      </ChakraProvider>
    </ThirdwebProvider>
    
  );
}

export default MyApp;


// activeChain={{
//   ...KlaytnTestnetBaobab,
//   explorers:[{
//     name:'klaytnscope',
//     url:'https://baobab.klaytnscope.com',
//     standard:'EIP3091'
//   }],
//   rpc: ["https://rpc.ankr.com/klaytn_testnet"],

// }}
