"use client"

import { getEncryptionPublicKey, getEncryptedMessage } from '@/utils/Utils';
import { Web3ConnectionContext } from '@/web3Connection/Web3ConnectionContext'
import React, { useContext } from 'react'


function UploadCredentails() {

    const { address } = useContext(Web3ConnectionContext);

    async function uploadCredentails(e: React.ChangeEvent<HTMLFormElement>){
        e.preventDefault();
        if (!address) return;
        const _encryptionKey = await getEncryptionPublicKey(address);
    
        const getEncryptedMsg = getEncryptedMessage(e.target.pass.value,_encryptionKey);

        console.log(getEncryptedMsg);
        
    }
    return (
        <div className="w-[32rem] text-center">
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
    )
}

export default UploadCredentails