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
        <div>
            <form onSubmit={uploadCredentails}>
                <input type="text" id="pass" name="pass" />
                <button type='submit'>
                    store crdentials
                </button>
            </form>
        </div>
    )
}

export default UploadCredentails