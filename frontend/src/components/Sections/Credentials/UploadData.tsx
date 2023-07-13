"use client"

import PopUpModel from '@/components/PopupModel/PopUpModel';
import { Web3ConnectionContext } from '@/web3Connection/Web3ConnectionContext'
import React, { useContext, useState } from 'react'
import { CredentialsFormData } from '@/interfaces/Credentials';
import CredentialsForm from './CredentialsForm';
import { getEncryptedMessage, getEncryptionPublicKey } from '@/utils/MessageEncryption';
import UploadingStepper from '@/components/Stepper/UploadingStepper';
import { useKeyDataStore } from '@/store/keyDataStore';
import { advanceEncryptFile } from '@/utils/FileEncryption';
import { DataTypeEnum } from '@/interfaces/DataInterface';


interface UploadDataInterface {
    type: "Credentials" | "File"
}

function UploadData(props: UploadDataInterface) {

    const { address, addDataOfUser, uploadFileOnIPFS } = useContext(Web3ConnectionContext);
    const [PEK, setPEK] = useKeyDataStore((store) => [store.PEK, store.setPEK]);

    const [isOpen, setIsOpen] = useState(false);



    const [credentialsData, setCredentialsData] = useState<CredentialsFormData>({
        credentialName: "",
        websiteurl: "",
        userid: "",
        password: ""
    })

    const [uploadingCredential, setUploadingCredential] = useState<boolean>(false);
    const [uploadingProcessCount, setUploadingProcessCount] = useState<number>(0);
    const [error, setError] = useState<Error>();




    async function uploadCredentails(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!address) return;
        setUploadingCredential(true);
        setUploadingProcessCount(1);
        if (props.type === "Credentials") {
            const dataJsonFile = new Blob([JSON.stringify(credentialsData)], { type: "application/json" });
            encryptAndUploadData(dataJsonFile, DataTypeEnum.CREDENTIALS, credentialsData.credentialName);
        } else if (props.type === "File") {

        } else {
            setUploadingCredential(false);
            setUploadingProcessCount(0);
        }
    }
    async function encryptAndUploadData(data: File | Blob, dataType: DataTypeEnum, dataName: string) {
        try {
            if (!address) throw Error("Wallet not connected. ");
            setUploadingProcessCount(2);
            const _pEK: string = PEK ? PEK : await getEncryptionPublicKey(address);
            if (!PEK) setPEK(_pEK);

            const { key, encryptedFile } = await advanceEncryptFile(data);
            const _eK: string = getEncryptedMessage(key, _pEK);
            const ipfsHash: string | null = await uploadFileOnIPFS(encryptedFile);
            setUploadingProcessCount(3);
            await addDataOfUser({
                dataType,
                name: dataName,
                fileHash: ipfsHash,
                decryptKey: _eK,
                uploadTime: (new Date()).getTime() / 1000
            });
            setUploadingProcessCount(4);
        } catch (error: any) {
            setUploadingProcessCount(-1);
            setError(error as Error);
        }
        setUploadingCredential(false);
    }
    return (
        <>
            <span onClick={() => setIsOpen(true)}>
                <button className="btn_primary_1">
                    Upload Credentials
                </button>
            </span>
            <PopUpModel isOpen={isOpen} closeModal={() => setIsOpen(false)}>
                <div className="text-center">
                    <h1 className="text-3xl text_primary_gradient_2">Upload Credentials</h1>
                    <CredentialsForm type="create" setCredentialsData={setCredentialsData} submitForm={uploadCredentails} credentialsData={credentialsData} uploadingCredential={uploadingCredential} />
                    <div className="mt-4">
                        <UploadingStepper type='credentials' uploadingProcessCount={uploadingProcessCount} error={error} />
                    </div>
                </div>
            </PopUpModel>
        </>
    )
}

export default UploadData