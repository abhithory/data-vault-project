import React, { createContext, useState } from 'react';
import createMetaMaskProvider from 'metamask-extension-provider';
import { Contract, ethers } from 'ethers';
import { DataVaultJson } from './DataVaultJson';
import { DataStructInterface } from '../interfaces/DataInterface';
import { useDataStore } from '../store/dataStore';


declare global {
    interface Window {
        ethereum?: any
    }
}


interface ContextProps {
    address: string | undefined,
    connectMetamaskWallet: () => void,
    isConnectedPreviously: () => Promise<boolean>,
    getAllDataOfUser: () => Promise<DataStructInterface[]>,
}

export const Web3ConnectionContext = createContext<ContextProps>({
    address: '',
    connectMetamaskWallet: () => { },
    isConnectedPreviously: async () => false,
    getAllDataOfUser: async () => [],
});


const DataVaultContractAddress = "0x5536Da7119DAf4bBD01f01c770c6223F1CdfF6e0"

const Web3ConnectionWrapper = ({ children }: any) => {

    const [chainId, setChainId] = useState<number | string>();
    const [address, setAddress] = useState("")
    const [ethereumProvider, setEthereumProvider] = useState<any>();

    const [setData] = useDataStore((store) => [store.setData])


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
                setChainId(chainId);
                setTimeout(() => {
                    setAddress(account);
                }, 0);
            }
        } catch (e) {
            console.log("error while connect", e);
        }
    }

    const isConnectedPreviously = async (): Promise<boolean> => {
        try {
            const _provider = getProvider();
            const provider = new ethers.providers.Web3Provider(_provider);
            const signer = provider.getSigner();
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

    function getContract(): Contract {
        const provider = new ethers.providers.Web3Provider(getProvider());
        const signer = provider.getSigner();
        const DataVaultContract = new ethers.Contract(DataVaultContractAddress, DataVaultJson.abi, signer);
        return DataVaultContract;
    }


    async function getAllDataOfUser(): Promise<DataStructInterface[]> {
        try {
        const _contract = getContract();
        const _data = await _contract.getAllData();
        setData(_data);
        return _data;
        } catch (error) {
        console.log("getAllDataOfUser error", error);
        throw error
        }
    }



    return (
        <Web3ConnectionContext.Provider value={{
            address,
            connectMetamaskWallet,
            isConnectedPreviously,
            getAllDataOfUser
        }}
        >
            {children}
        </Web3ConnectionContext.Provider>
    );
};

export default Web3ConnectionWrapper;