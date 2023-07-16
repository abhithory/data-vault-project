import React, { createContext, useState } from 'react';
import createMetaMaskProvider from 'metamask-extension-provider';
import { ethers } from 'ethers';


declare global {
    interface Window {
        ethereum?: any
    }
}


interface ContextProps {
    address: string | undefined,
    connectMetamaskWallet: () => void,
    isConnectedPreviously: () => Promise<boolean>
}

export const Web3ConnectionContext = createContext<ContextProps>({
    address: '',
    connectMetamaskWallet: () => { },
    isConnectedPreviously: async () => false
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

    const getAccounts = async (provider: any): Promise<[string, string | number, any]> => {
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

    const isConnectedPreviously = async (): Promise<boolean> => {
        try {
            const _provider = getProvider();
            const provider = new ethers.providers.Web3Provider(_provider);
            const signer =  provider.getSigner();        
            const accounts = await signer.getAddress();            
            return accounts ? true : false;
        } catch (error) {
            return false;
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
            connectMetamaskWallet,
            isConnectedPreviously
        }}
        >
            {children}
        </Web3ConnectionContext.Provider>
    );
};

export default Web3ConnectionWrapper;