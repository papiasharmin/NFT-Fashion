import React from "react";
import { createRoot } from "react-dom/client";
import App from './components/App';
import reportWebVitals from "./reportWebVitals";
import { ThirdwebProvider, metamaskWallet, coinbaseWallet, embeddedWallet, smartWallet} from "@thirdweb-dev/react";
import { ContextProvider} from './Contexts';




const activeChain = "mumbai";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(

    <ThirdwebProvider
      activeChain={activeChain}
      clientId={process.env.REACT_APP_TEMPLATE_CLIENT_ID}
      supportedWallets={[
      embeddedWallet(),
      metamaskWallet(),
      coinbaseWallet(), 

      ]}
    >
      <ContextProvider>
        <App />
      </ContextProvider>
    </ThirdwebProvider>
 
);

reportWebVitals();
