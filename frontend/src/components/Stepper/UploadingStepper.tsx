import { DataTypeEnum } from '@/interfaces/DataInterface'
import React from 'react'


interface UploadStepperInterface{
    uploadingProcessCount: number,
    type: DataTypeEnum,
    error?: Error
}
function UploadingStepper({ uploadingProcessCount, type,error }: UploadStepperInterface) {
    const messagesCredentials: {
        [index: number]: string
    } = {
        0: "Enter your Credentials and upload",
        1: "We are encriptioing your Credentials to make it secure. Please Confirm.",
        2: "We Are Uploading your Encrypted File To IPFS. Please Wait...",
        3: "Please Confirm the transaction with Wallet and wait for some time. We are adding your encrypted credentials in smart contract.",
        4: "Credentials Added Seccefully."
    }

    const messagesFile: {
        [index: number]: string
    } = {
        0: "Select and Upload your file",
        1: "We are Encrypting your Your File to make it secure. Please Confirm and wait.",
        2: "We Are Uploading your Encrypted File To IPFS. Please Wait...",
        3: "Please Confirm the transaction with Wallet and wait for some time. We are adding your encrypted file in smart contract.",
        4: "File Added Seccefully."
    }

    return (
        <div className="">
            {uploadingProcessCount === -1?
            <p className="text-sm text-red-500">
                Error: {error?.message}
            </p>
            :
            <p className="text-sm">
                {type === DataTypeEnum.CREDENTIALS ?
                messagesCredentials[uploadingProcessCount]
                : type === DataTypeEnum.FILE &&
                messagesFile[uploadingProcessCount]
            }
            </p>
            }
        </div>
    )
}

export default UploadingStepper
