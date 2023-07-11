"use client"

import PopUpModel from '@/components/PopupModel/PopUpModel';
import { Web3ConnectionContext } from '@/web3Connection/Web3ConnectionContext'
import React, { useContext, useState } from 'react'
import CredentialsUploadStepper from './CredentialsUploadStepper';
import { CredentialsFormData } from '@/interfaces/Credentials';
import CredentialsForm from './CredentialsForm';
import { decryptMessage, getEncryptedMessage, getEncryptionPublicKey } from '@/utils/MessageEncryption';


function UploadCredentails() {

    const { address, addCredentialOfUser } = useContext(Web3ConnectionContext);
    const [isOpen, setIsOpen] = useState(false);

    // credentials upload
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
        setUploadingProcessCount(0);

        if (credentialsData.website && credentialsData.password && credentialsData.usernameOrEmailOrPhone) {
            const _pEK: string = await getEncryptionPublicKey(address);
            console.log("_pEK",_pEK);
            
            const _eP: string = getEncryptedMessage(JSON.stringify(credentialsData), _pEK);
            console.log("string", _eP.length);

            setUploadingProcessCount(1);
            // const added = await addCredentialOfUser({ ...credentialsData, password: _eP });

            console.log({ ...credentialsData, password: _eP });
            
            setUploadingProcessCount(2);
            // if (added) {

            // } else {
            //     // show error
            // }
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