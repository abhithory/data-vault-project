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
import FileUploadForm from '../Files/FileUploadForm';



interface UploadDataInterface {
    type: DataTypeEnum
}

function UploadData(props: UploadDataInterface) {

    const { address, addDataOfUser, uploadFileOnIPFS } = useContext(Web3ConnectionContext);
    const [PEK, setPEK] = useKeyDataStore((store) => [store.PEK, store.setPEK]);

    const [isOpen, setIsOpen] = useState(false);




    const [isUploadingData, setIsUploadingData] = useState<boolean>(false);
    const [uploadingProcessCount, setUploadingProcessCount] = useState<number>(0);
    const [error, setError] = useState<Error>();

    // for credentials
    const [credentialsData, setCredentialsData] = useState<CredentialsFormData>({
        credentialName: "",
        websiteurl: "",
        userid: "",
        password: ""
    })

    // for files
    const [fileName, setFileName] = useState<string>("");
    const [fileExtension, setFileExtension] = useState<string>("")
    const [selectedFile, setSelectedFile] = useState<File>();


    // 

    async function handleSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return
        let _file: File = e.target.files[0];
        setFileName(_file?.name?.split(".").slice(0, -1).join(".") as string);
        setFileExtension(_file?.name?.split(".").at(-1) as string);
        setSelectedFile(_file)
    }





    async function handleUploadData() {
        if (!address) return;
        setIsUploadingData(true);
        setUploadingProcessCount(1);
        if (props.type === DataTypeEnum.CREDENTIALS) {
            const dataJsonFile = new Blob([JSON.stringify(credentialsData)], { type: "application/json" });
            await encryptAndUploadData(dataJsonFile, DataTypeEnum.CREDENTIALS, credentialsData.credentialName);
        } else if (props.type === DataTypeEnum.FILE && selectedFile) {
            let fileUploadName: string = fileName + "." + fileExtension;
            await encryptAndUploadData(selectedFile, DataTypeEnum.FILE, fileUploadName);
        } else {
            setIsUploadingData(false);
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
        setIsUploadingData(false);
    }
    return (
        <>
            <span onClick={() => setIsOpen(true)}>
                <button className="btn_primary_1">
                    Upload
                    {props.type === DataTypeEnum.CREDENTIALS ?
                        "Credentials"
                        : props.type === DataTypeEnum.FILE &&
                        "File"
                    }
                </button>
            </span>
            <PopUpModel isOpen={isOpen} closeModal={() => setIsOpen(false)}>
                <div className="text-center">
                    <h1 className="text-3xl text_primary_gradient_2">Upload Credentials</h1>
                    {props.type === DataTypeEnum.CREDENTIALS ?
                        <CredentialsForm
                            type="create"
                            setCredentialsData={setCredentialsData}
                            submitForm={(e) => {
                                e.preventDefault()
                                handleUploadData()
                            }}
                            credentialsData={credentialsData}
                            uploadingCredential={isUploadingData}
                        />
                        : props.type === DataTypeEnum.FILE &&
                        <FileUploadForm
                            fileName={fileName}
                            fileExtension={fileExtension}
                            setFileName={setFileName}
                            isUploadingFile={isUploadingData}
                            selectedFile={selectedFile}
                            handleSelectFile={handleSelectFile}
                            handleUploadFile={handleUploadData}
                        />
                    }


                    <div className="mt-4">
                        <UploadingStepper type={props.type} uploadingProcessCount={uploadingProcessCount} error={error} />
                    </div>
                </div>
            </PopUpModel>
        </>
    )
}

export default UploadData