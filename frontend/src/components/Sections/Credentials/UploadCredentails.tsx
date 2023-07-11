"use client"

import PopUpModel from '@/components/PopupModel/PopUpModel';
import { Web3ConnectionContext } from '@/web3Connection/Web3ConnectionContext'
import React, { useContext, useState } from 'react'
import CredentialsUploadStepper from './CredentialsUploadStepper';
import { CredentialsFormData } from '@/interfaces/Credentials';
import CredentialsForm from './CredentialsForm';
import { getEncryptedMessage, getEncryptionPublicKey } from '@/utils/MessageEncryption';


function UploadCredentails() {

    const { address, addCredentialOfUser } = useContext(Web3ConnectionContext);
    const [isOpen, setIsOpen] = useState(false);

    const [credentialsData, setCredentialsData] = useState<CredentialsFormData>({
        website: "",
        usernameOrEmailOrPhone: "",
        password: ""
    })
    const [uploadingCredential, setUploadingCredential] = useState<boolean>(false);
    const [uploadingProcessCount, setUploadingProcessCount] = useState<number>(0);


    async function uploadCredentails(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!address) return;
        setUploadingCredential(true);
        setUploadingProcessCount(1);

        if (credentialsData.website && credentialsData.password && credentialsData.usernameOrEmailOrPhone) {
            const _pEK: string = await getEncryptionPublicKey(address);            
            const _eP: string = getEncryptedMessage(credentialsData.password, _pEK);
            setUploadingProcessCount(2);
            const added = await addCredentialOfUser({ ...credentialsData, password: _eP });
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
                            <CredentialsUploadStepper uploadingProcessCount={uploadingProcessCount} />
                    </div>
                </div>
            </PopUpModel>
        </>
    )
}

export default UploadCredentails