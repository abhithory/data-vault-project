import React, { createContext, useState } from 'react';
import createMetaMaskProvider from 'metamask-extension-provider';


declare global {
    interface Window{
      ethereum?:any
    }
  }
  

interface ContextProps {
    address: string | undefined,
    connectMetamaskWallet: () => void,
}

export const Web3ConnectionContext = createContext<ContextProps>({
    address: '',
    connectMetamaskWallet: () => {},
});


const Web3ConnectionWrapper = ({ children }: any) => {

    const [chainId, setChainId] = useState<number | string>();
    const [address, setAddress] = useState("")
    const [ethereumProvider, setEthereumProvider] = useState<any>();

    const getProvider = () => {
        if (window.ethereum) {
            console.log('found window.ethereum>>');
            return window.ethereum;
        } else {
            const provider = createMetaMaskProvider();
            return provider;
        }
    }

    const getAccounts = async (provider: any):Promise<[string,string | number, any ]> => {
            const [address, chainId] = await Promise.all([
                provider.request({
                    method: 'eth_requestAccounts',
                }),
                provider.request({ method: 'eth_chainId' }),
            ]);
            return [address, chainId, provider];
    }

    const connectMetamaskWallet = async () => {
        try {
            const _provider = getProvider();
            const [address, chainId, provider] = await getAccounts(_provider);
            if (address && chainId && provider) {
                const account = address[0];
                setEthereumProvider(provider)
                setAddress(account);
                setChainId(chainId);
            }
        } catch (e) {
            console.log("error while connect", e);
        }
    }

    const disconnectWallet = () => {
        try {
            setAddress("");
            setChainId("");
            setEthereumProvider("");
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Web3ConnectionContext.Provider value={{
            address,
            connectMetamaskWallet
        }}
        >
            {children}
        </Web3ConnectionContext.Provider>
    );
};

export default Web3ConnectionWrapper;
