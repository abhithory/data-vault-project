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
    uploadFileOnIPFS: (file: File | Blob | {}) => Promise<string>,
    getJsonFromIpfsHash: (ipfsHash: string) => Promise<{}>,
    getFileUrlFromIpfsHash: (ipfsHash: string) => Promise<string>,
    addDataOfUser: (data: DataStructInterface) => Promise<boolean>,
    getAllDataOfUser: () => Promise<DataStructInterface[]>,
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

    const [setData, addData] = useDataStore((store) => [store.setData, store.addData])

    function getContract(): Contract {
        const DataVaultContract = new ethers.Contract(DataVaultContractAddress, DataVaultJson.abi, signer);
        return DataVaultContract;
    }

    async function uploadFileOnIPFS(file: File | Blob | {}): Promise<string> {
        try {
            const _url = await storage?.upload(file);
            if (!_url) throw Error("Not able to upload on ipfs.");
            return _url;
        } catch (error) {
            console.log("uploadFileOnIPFS: ", error);
            throw error
        }
    }
    async function getJsonFromIpfsHash(ipfsHash: string): Promise<{}> {
        try {
            const _data = await storage?.downloadJSON(ipfsHash);
            if (!_data) throw Error("Not able to download the json on ipfs.");
            return _data;
        } catch (error) {
            console.log("getJsonFromIpfsHash: ", error);
            throw error
        }
    }

    async function getFileUrlFromIpfsHash(ipfsHash: string): Promise<string> {
        try {
            const _url = await storage?.download(ipfsHash);
            if (!_url) throw Error("Not able to get the URK from ipfs.");
            return _url.url;
        } catch (error) {
            console.log("getFileUrlFromIpfsHash: ", error);
            throw error
        }
    }

    async function addDataOfUser(file: DataStructInterface): Promise<boolean> {
        try {
            const _contract = getContract();
            const _tx = await _contract.addData(
                {
                    dataType: file.dataType,
                    dataName: file.dataName,
                    dataHash: file.dataHash,
                    decryptKey: file.decryptKey,
                    uploadTime: 0
                }
            );
            _tx.wait();
            addData(file);
            return true;
        } catch (error) {
            console.log("addFileOfUser error", error);
            throw error
        }
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
