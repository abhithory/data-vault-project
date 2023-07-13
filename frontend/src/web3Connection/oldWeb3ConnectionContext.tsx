"use client";

import React, { createContext, useMemo, useState } from 'react';
import {
    useAddress, useSDK, useSigner, useStorage
} from '@thirdweb-dev/react';
import { Contract, Signer, ethers } from 'ethers';
import { CredentialStruct, FileStructInterface } from '@/interfaces/SmartContract';
import { DataVaultContractAddress } from './networkDetails';

import DataVaultJson from './DataVault.json'
import { DataStructInterface } from '@/interfaces/DataInterface';

interface ContextProps {
    address: string | undefined,
    signer: any,
    uploadFileOnIPFS: (file: File | Blob) => Promise<string | null>,
    getJsonFromIpfsHash: (ipfsHash: string) => Promise<{} | null>,
    getFileUrlFromIpfsHash: (ipfsHash: string) => Promise<string | null>,
    addDataOfUser: (data: DataStructInterface) => Promise<boolean>,
    getAllDataOfUser: () => Promise<DataStructInterface[] | null>,
    // addFileOfUser: (file: FileStructInterface) => Promise<boolean>,
    // addScreatInfoOfUser: (info: FileStructInterface) => Promise<boolean>,
    // addCredentialOfUser: (credentials: CredentialStruct) => Promise<boolean>,
    // getAllFilesOfUser: () => Promise<FileStructInterface[] | null>,
    // getAllScreatInfoOfUser: () => Promise<FileStructInterface[] | null>,
    // getAllCredentialsOfUser: () => Promise<CredentialStruct[] | null>,
}

export const Web3ConnectionContext = createContext<ContextProps>({
    address: '',
    signer: "",
    uploadFileOnIPFS: async () => "",
    getJsonFromIpfsHash: async () => "",
    getFileUrlFromIpfsHash: async () => "",
    addDataOfUser: async () => false,
    getAllDataOfUser: async () => [],
    // addFileOfUser: async () => false,
    // addScreatInfoOfUser: async () => false,
    // addCredentialOfUser: async () => false,
    // getAllFilesOfUser: async () => [],
    // getAllScreatInfoOfUser: async () => [],
    // getAllCredentialsOfUser: async () => [],
});

const Web3ConnectionWrapper = ({ children }: any) => {
    const address = useAddress();
    const storage = useStorage();
    const signer = useSigner();

    function getContract(): Contract {
        const DataVaultContract = new ethers.Contract(DataVaultContractAddress, DataVaultJson.abi, signer);
        return DataVaultContract;
    }




    async function uploadFileOnIPFS(file: File | Blob): Promise<string | null> {
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

    async function addFileOfUser(file: FileStructInterface): Promise<boolean> {
        try {
            const _contract = getContract();
            const _tx = await _contract.addFileOfUser(file);
            _tx.wait();
            return true;
        } catch (error) {
            console.log("addFileOfUser error", error);
            return false
        }
    }

    async function addScreatInfoOfUser(info: FileStructInterface): Promise<boolean> {
        try {
            const _contract = getContract();
            const _tx = await _contract.addScreatInfoOfUser(info);
            _tx.wait();
            return true;
        } catch (error) {
            console.log("addScreatInfoOfUser error", error);
            return false
        }
    }

    async function addCredentialOfUser(credentials: CredentialStruct): Promise<boolean> {
        try {
            const _contract = getContract();

            const _tx = await _contract.addCredentialOfUser(credentials);
            _tx.wait();
            return true;
        } catch (error) {
            console.log("addCredentialOfUser error", error);
            return false
        }
    }

    async function getAllFilesOfUser(): Promise<FileStructInterface[] | null> {
        try {
            const _contract = getContract();
            const _data = await _contract.getAllFilesOfUser();
            return _data;
        } catch (error) {
            console.log("getAllFilesOfUser error", error);
            return null
        }
    }

    async function getAllScreatInfoOfUser(): Promise<FileStructInterface[] | null> {
        try {
            const _contract = getContract();
            const _data = await _contract.getAllScreatInfoOfUser({ from: address });
            return _data;
        } catch (error) {
            console.log("getAllScreatInfoOfUser error", error);
            return null
        }
    }


    async function getAllCredentialsOfUser(): Promise<CredentialStruct[] | null> {
        try {
            const _contract = getContract();
            const _data = await _contract?.getAllCredentialsOfUser();
            return _data;
        } catch (error) {
            console.log("getAllCredentialsOfUser error", error);
            return null
        }
    }

    return (
        <Web3ConnectionContext.Provider value={{
            address,
            signer,
            addFileOfUser,
            addScreatInfoOfUser,
            addCredentialOfUser,
            getAllFilesOfUser,
            getAllScreatInfoOfUser,
            getAllCredentialsOfUser,
            uploadFileOnIPFS,
            getJsonFromIpfsHash,
            getFileUrlFromIpfsHash
        }}
        >
            {children}
        </Web3ConnectionContext.Provider>
    );
};

export default Web3ConnectionWrapper;
