"use client"

import PopUpModel from '@/components/PopupModel/PopUpModel';
import { getEncryptionPublicKey, getEncryptedMessage } from '@/utils/Utils';
import { Web3ConnectionContext } from '@/web3Connection/Web3ConnectionContext'
import React, { useContext, useState } from 'react'
import CredentialsUploadStepper from './CredentialsUploadStepper';
import { CredentialsFormData } from '@/interfaces/Credentials';
import CredentialsForm from './CredentialsForm';


function UploadCredentails() {

    const { address } = useContext(Web3ConnectionContext);
    const [isOpen, setIsOpen] = useState(false);

    // credentials upload
    const [credentialsData, setCredentialsData] = useState<CredentialsFormData>({
        website:"",
        email:"",
        password:""
    })
    const [uploadingCredential, setUploadingCredential] = useState<boolean>(false);
    const [uploadingProcessCount, setUploadingProcessCount] = useState<number>(0);


    async function uploadCredentails() {
    
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
                    <CredentialsForm type="create" setCredentialsData={setCredentialsData} submitForm={uploadCredentails} credentialsData={credentialsData} />
                    <div className="mt-4"> 
                {uploadingCredential &&
                    <CredentialsUploadStepper uploadingProcessCount={uploadingProcessCount} />
                }
            </div>
                </div>
            </PopUpModel>
        </>
    )
}

export default UploadCredentails