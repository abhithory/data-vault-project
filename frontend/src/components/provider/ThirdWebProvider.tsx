"use client";
import {
    ThirdwebProvider,
} from "@thirdweb-dev/react";

import {  Mumbai, Polygon } from "@thirdweb-dev/chains";

const Ganache = {
    chainId: 1337, // Chain ID of the network
    rpc: ['http://127.0.0.1:8545'],
    nativeCurrency: {
      decimals: 18,
      name: 'Ganache ETH',
      symbol: 'gETH'
    },
    shortName: 'ganache', // Display value shown in the wallet UI
    slug: 'ganache', // Display value shown in the wallet UI
    testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
    chain: 'Ganache', // Name of the network
    name: 'Ganache Testnet' // Name of the network
  };


function ThirdWebProvider({ children }: any) {
    return (
        <ThirdwebProvider
            activeChain="ganache"
            supportedChains={[ Polygon, Mumbai, Ganache]}
            dAppMeta={{
                name: "Data Vault",
                description: "data vault",
                logoUrl: "/assests/logo.png",
                url: "",
                isDarkMode: true,
              }}
        >
            {children}
        </ThirdwebProvider>
    )
}

export default ThirdWebProvider