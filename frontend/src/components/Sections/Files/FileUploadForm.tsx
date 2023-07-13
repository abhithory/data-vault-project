import NormalButton from '@/components/Buttons/NormalButton';
import { FileInput } from '@/components/Inputs/FileInput';
import NormalInput from '@/components/Inputs/NormalInput';
import { bytesToMB } from '@/utils/Helper';
import React from 'react'

interface FileUploadFormProps{
    fileName: string;
    fileExtension: string;
    setFileName: (name: string) => void;
    uploadingFile: boolean;
    fileUploaded: File;
    handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUploadFile: () => void;
    
}
export default function FileUploadForm({fileUploaded,handleFileUpload,uploadingFile, fileName, setFileName, fileExtension, handleUploadFile}:FileUploadFormProps) {
  return (
    <div className="text-center gap-4 flex_center w-full flex-col">

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
                <span>Size: {bytesToMB(fileUploaded?.size)}</span>

                <NormalButton loading={uploadingFile} disabled={uploadingFile} text={uploadingFile ? 'Uploading File' : 'Upload File'} onClick={handleUploadFile} />
            </div>
        </>
    }
</div>
  )
}
