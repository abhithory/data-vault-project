"use client"
import React, { useState } from 'react'
import FileUploadStepper from './FileUploadStepper';
import PopUpModel from '@/components/PopupModel/PopUpModel';
import { FileInputDropZone } from '@/components/Inputs/FileInputDropZone';

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
        return (inByte / 1000).toFixed(3) + " KB"
    }

    return (
        <>
            <span onClick={() => setIsOpen(true)}>
                <button className="btn_primary_1">
                    Upload Files
                </button>
            </span>
            <PopUpModel isOpen={isOpen} closeModal={() => setIsOpen(false)}>
                <div className="text-center">
                    <h1 className="text-3xl text_primary_gradient_2">Upload Files</h1>

                    <FileInputDropZone handleFileUpload={handleFileUpload} />
                    {fileUploaded &&
                        <>
                            <input type="text" className='input_1' value={fileName} />
                            <span>ize: {convertInMb(fileUploaded?.size)}</span>
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
