"use client"

import PopUpModel from '@/components/PopupModel/PopUpModel';
import { getEncryptionPublicKey, getEncryptedMessage } from '@/utils/Utils';
import { Web3ConnectionContext } from '@/web3Connection/Web3ConnectionContext'
import React, { useContext, useState } from 'react'
import CredentialsUploadStepper from './CredentialsUploadStepper';


function UploadCredentails() {

    const { address } = useContext(Web3ConnectionContext);
    const [isOpen, setIsOpen] = useState(false);

    // credentials upload
    const [uploadingCredential, setUploadingCredential] = useState<boolean>(false);
    const [uploadingProcessCount, setUploadingProcessCount] = useState<number>(0);


    async function uploadCredentails(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
    

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
                    <form onSubmit={uploadCredentails} className='flex_center flex-col gap-4 mt-4'>
                        <input type="text" id="website" name="website" className='input_1' placeholder='Enter website' />
                        <input type="text" id="pass" name="pass" className='input_1' placeholder='Enter Your Email/UserName/Phone' />
                        <input type="password" id="pass" name="pass" className='input_1' placeholder='Enter your password' />

                        <button className='btn_primary_1' type='submit'>
                            store crdentials
                        </button>
                    </form>
                </div>
                <div className="mt-4">
                    {uploadingCredential &&
                        <CredentialsUploadStepper uploadingProcessCount={uploadingProcessCount} />
                    }
                </div>
            </PopUpModel>
        </>
    )
}

export default UploadCredentails