"use client"
import React, { useContext, useState } from 'react'
import PopUpModel from '@/components/PopupModel/PopUpModel';
import { FileInput } from '@/components/Inputs/FileInputDropZone';
import NormalButton from '@/components/Buttons/NormalButton';
import NormalInput from '@/components/Inputs/NormalInput';
import { getEncryptedMessage, getEncryptionPublicKey } from '@/utils/MessageEncryption';
import { Web3ConnectionContext } from '@/web3Connection/Web3ConnectionContext';
import { advanceEncryptFile } from '@/utils/FileEncryption';
import UploadingStepper from '@/components/Stepper/UploadingStepper';

export default function UploadFiles() {
    
    const { address, getFileUrlFromIpfsHash, uploadFileOnIPFS, addFileOfUser } = useContext(Web3ConnectionContext);
    const [isOpen, setIsOpen] = useState(false);

    const [uploadingFile, setUploadingFile] = useState<boolean>(false);
    const [uploadingProcessCount, setUploadingProcessCount] = useState<number>(0);

    const [fileName, setFileName] = useState<string>("");
    const [fileExtension, setFileExtension] = useState<string>("")
    const [fileUploaded, setFileUploaded] = useState<File>();



    async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return
        let _file: File = e.target.files[0]
        setFileUploaded(_file)
        setFileName(_file?.name?.split(".").slice(0, -1).join(".") as string);
        setFileExtension(_file?.name?.split(".").at(-1) as string);
    }

    function convertInMb(inByte: number): string {
        return (inByte / 1000000).toFixed(3) + " MB"
    }


    async function handleUploadFile() {
        if (!fileUploaded || !address) return
        setUploadingFile(true)
        try {
            setUploadingProcessCount(0)
            let _file: File = fileUploaded;
            let fileUploadName: string = fileName + "." + fileExtension;

            const _pEK = await getEncryptionPublicKey(address);
            if (!_pEK) return;

            const { key, encryptedFile } = await advanceEncryptFile(_file as Blob);
            setUploadingProcessCount(1);
            const decryptKey: string = getEncryptedMessage(key, _pEK);
            const fileIPFSHash:string | null = await uploadFileOnIPFS(encryptedFile as File);
            if (!fileIPFSHash) return;
            setUploadingProcessCount(2)
            
            const added = await addFileOfUser({fileName:fileUploadName, fileHash: fileIPFSHash, decryptKey: decryptKey});
            
            if (added) {
                setUploadingProcessCount(3)                
            } else {
                setUploadingProcessCount(-1)                
                return; //show error
            }

        } catch (error) {
            console.log(error);

        } finally {
            setUploadingFile(false)
        }

    }

    return (
        <>
            <NormalButton onClick={() => setIsOpen(true)} text='Upload Files' />
            <PopUpModel isOpen={isOpen} closeModal={() => setIsOpen(false)}>
                <div className="text-center gap-4 flex_center w-full flex-col">
                    <h1 className="text-3xl text_primary_gradient_2 mb-6">Upload Files</h1>

                    <FileInput handleFileUpload={handleFileUpload} text={fileUploaded ? fileUploaded.name.substring(0, 16) + "..." : 'Select Your File'} className='mx-4 border-primary bg-primary-bg w-full' />
                    {fileUploaded &&
                        <>
                            <div className='flex_center flex-col gap-1 mt-2 w-full'>
                                <div className='w-full text-start ml-4'>
                                    File Name
                                </div>
                                <NormalInput type="text" className='' value={fileName} onChange={(e) => setFileName(e.target.value)} placeholder='Enter File Name' />
                                <span>Type: {fileUploaded?.type}</span>
                                <span>Extension: {fileExtension}</span>
                                <span>Size: {convertInMb(fileUploaded?.size)}</span>

                                <NormalButton loading={uploadingFile} disabled={uploadingFile} text={uploadingFile? 'Uploading File' :'Upload File'} onClick={handleUploadFile} />
                            </div>

                            <div className="mt-4">
                                <UploadingStepper type='file' uploadingProcessCount={uploadingProcessCount} />
                            </div>
                        </>
                    }
                </div>
            </PopUpModel>
        </>
    )
}
