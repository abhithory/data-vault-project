"use client"
import React, { useState } from 'react'
import FileUploadStepper from './FileUploadStepper';
import PopUpModel from '@/components/PopupModel/PopUpModel';
import { FileInput } from '@/components/Inputs/FileInputDropZone';
import NormalButton from '@/components/Buttons/NormalButton';
import NormalInput from '@/components/Inputs/NormalInput';

export default function UploadFiles() {

    const [isOpen, setIsOpen] = useState(false);

    const [uploadingFile, setUploadingFile] = useState<boolean>(false);
    const [uploadingProcessCount, setUploadingProcessCount] = useState<number>(0);

    const [fileName, setFileName] = useState<string>("")
    const [fileUploaded, setFileUploaded] = useState<File>();



    async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return
        let _file: File = e.target.files[0]
        setFileUploaded(_file)
        setFileName(_file?.name?.split(".").slice(0, -1).join(".") as string);
    }

    function convertInMb(inByte: number): string {
        return (inByte / 1000000).toFixed(3) + " MB"
    }

    return (
        <>
            <NormalButton onClick={() => setIsOpen(true)} text='Upload Files' />
            <PopUpModel isOpen={isOpen} closeModal={() => setIsOpen(false)}>
                <div className="text-center gap-4 flex_center w-full flex-col">
                    <h1 className="text-3xl text_primary_gradient_2 mb-6">Upload Files</h1>

                    <FileInput handleFileUpload={handleFileUpload} text={fileUploaded ? fileUploaded.name.substring(0,16)+"..."+fileUploaded.type: 'Select Your File'} className='mx-4 border-primary bg-primary-bg w-full' />
                    {fileUploaded &&
                        <>
                            <NormalInput type="text" className='' value={fileName} onChange={()=>{}} />
                            <span>Size: {convertInMb(fileUploaded?.size)}</span>
                        </>
                    }

                    <div className="mt-4">
                        {uploadingFile &&
                            <FileUploadStepper uploadingProcessCount={uploadingProcessCount} />
                        }
                    </div>
                </div>
            </PopUpModel>
        </>
    )
}
