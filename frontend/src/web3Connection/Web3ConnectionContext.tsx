"use client";

import React, { createContext } from 'react';
import {
    useAddress, useSigner, useStorage
} from '@thirdweb-dev/react';
import { Contract, Signer, ethers } from 'ethers';
import { DataVaultContractAddress } from './networkDetails';

import DataVaultJson from './DataVault.json'
import { DataStructInterface } from '@/interfaces/DataInterface';
import { useDataStore } from '@/store/dataStore';

interface ContextProps {
    address: string | undefined,
    signer: any,
    uploadFileOnIPFS: (file: File | Blob | {}) => Promise<string | null>,
    getJsonFromIpfsHash: (ipfsHash: string) => Promise<{} | null>,
    getFileUrlFromIpfsHash: (ipfsHash: string) => Promise<string | null>,
    addDataOfUser: (data: DataStructInterface) => Promise<boolean>,
    getAllDataOfUser: () => Promise<DataStructInterface[] | null>,
}

export const Web3ConnectionContext = createContext<ContextProps>({
    address: '',
    signer: "",
    uploadFileOnIPFS: async () => "",
    getJsonFromIpfsHash: async () => "",
    getFileUrlFromIpfsHash: async () => "",
    addDataOfUser: async () => false,
    getAllDataOfUser: async () => [],
});

const Web3ConnectionWrapper = ({ children }: any) => {
    const address = useAddress();
    const storage = useStorage();
    const signer = useSigner();

    const [setData,addData] = useDataStore((store)=> [store.setData,store.addData])

    function getContract(): Contract {
        const DataVaultContract = new ethers.Contract(DataVaultContractAddress, DataVaultJson.abi, signer);
        return DataVaultContract;
    }

    async function uploadFileOnIPFS(file: File | Blob | {}): Promise<string | null> {
        try {
            const _url = await storage?.upload(file);
            if (!_url) return null;
            return _url;
        } catch (error) {
            console.log("uploadFileOnIPFS: ", error);
            return null
        }
    }
    async function getJsonFromIpfsHash(ipfsHash: string): Promise<{} | null> {
        try {
            const _data = await storage?.downloadJSON(ipfsHash);
            if (!_data) return null;
            console.log(_data);
            return _data;
        } catch (error) {
            console.log("getJsonFromIpfsHash: ", error);
            return null
        }
    }

    async function getFileUrlFromIpfsHash(ipfsHash: string): Promise<string | null> {
        try {
            const _url = await storage?.download(ipfsHash);
            if (!_url) return null;
            return _url.url;
        } catch (error) {
            console.log("getFileUrlFromIpfsHash: ", error);
            return null
        }
    }

    async function addDataOfUser(file: DataStructInterface): Promise<boolean> {
        try {
            const _contract = getContract();
            const _tx = await _contract.addData(file);
            _tx.wait();
            addData(file);
            return true;
        } catch (error) {
            console.log("addFileOfUser error", error);
            return false
        }
    }


    async function  getAllDataOfUser(): Promise<DataStructInterface[] | null> {
        try {
            const _contract = getContract();
            const _data = await _contract.getAllData();
            setData(_data);
            return _data;
        } catch (error) {
            console.log("getAllDataOfUser error", error);
            return null
        }
    }



    return (
        <Web3ConnectionContext.Provider value={{
            address,
            signer,
            uploadFileOnIPFS,
            getJsonFromIpfsHash,
            getFileUrlFromIpfsHash,
            addDataOfUser,
            getAllDataOfUser
                           
        }}
        >
            {children}
        </Web3ConnectionContext.Provider>
    );
};

export default Web3ConnectionWrapper;
