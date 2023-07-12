import React from 'react'


interface UploadStepperInterface{
    uploadingProcessCount: number,
    type: "credentials" | "file"
}
function UploadingStepper({ uploadingProcessCount, type }: UploadStepperInterface) {
    const messagesCredentials: {
        [index: number]: string
    } = {
        0: "Enter your Credentials and upload",
        1: "We are encriptioing your Credentials to make it secure. Please Confirm.",
        2: "Please Confirm the transaction with Wallet and wait for some time. We are adding your encrypted credentials in smart contract.",
        3: "Credentials Added Seccefully."
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
            <p className="text-sm">
                {type === "credentials" ?
                messagesCredentials[uploadingProcessCount]
                :
                messagesFile[uploadingProcessCount]
            }
            </p>
        </div>
    )
}

export default UploadingStepper
