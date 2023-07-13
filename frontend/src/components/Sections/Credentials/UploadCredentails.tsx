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


function UploadCredentails() {

    const { address, addDataOfUser, uploadFileOnIPFS } = useContext(Web3ConnectionContext);
    const [isOpen, setIsOpen] = useState(false);

    const [PEK, setPEK] = useKeyDataStore((store) => [store.PEK, store.setPEK]);


    const [credentialsData, setCredentialsData] = useState<CredentialsFormData>({
        credentialName: "",
        websiteurl: "",
        userid: "",
        password: ""
    })
    const [uploadingCredential, setUploadingCredential] = useState<boolean>(false);
    const [uploadingProcessCount, setUploadingProcessCount] = useState<number>(0);



    async function uploadCredentails(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!address) return;
        setUploadingCredential(true);
        setUploadingProcessCount(1);

        if (credentialsData.websiteurl && credentialsData.password && credentialsData.userid) {
            const _pEK: string | null = PEK ? PEK : await getEncryptionPublicKey(address);
            if (!_pEK) return
            if (!PEK) setPEK(_pEK);

            var dataJsonFile = new Blob([JSON.stringify(credentialsData)], {type: "application/json"});
            const { key, encryptedFile } = await advanceEncryptFile(dataJsonFile);
            const _eK: string = getEncryptedMessage(key, _pEK);
            const ipfsHash: string | null = await uploadFileOnIPFS(encryptedFile);
            if (!ipfsHash) return;
            setUploadingProcessCount(2);

            const added = await addDataOfUser({
                dataType: DataTypeEnum.CREDENTIALS,
                name: credentialsData.credentialName,
                fileHash: ipfsHash,
                decryptKey: _eK,
                uploadTime: (new Date()).getTime()/1000
            });
            if (added) {
                setUploadingProcessCount(3);
            } else {
                // show error
            }

        } else {
            // show error
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
                        <UploadingStepper type='credentials' uploadingProcessCount={uploadingProcessCount} />
                    </div>
                </div>
            </PopUpModel>
        </>
    )
}

export default UploadCredentails