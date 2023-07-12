
import React from 'react'
import { FaCreditCard } from 'react-icons/fa'

interface OneFileInterface {
  index: number,
  fileName: string,
  fileHash: string,
  time?: number,
  decryptedStatus: boolean,
  DecryptFile: (n: number) => void,
  downloadEncryptedFile:(n:number) => void,
  isDownloading: boolean
}
export default function FileListItem(file: OneFileInterface) {
  return (
    <div className="relative group w-[14rem]">
    <div className="absolute -inset-0 bg-gradient-to-r from-primary via-third to-secondary rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
    <div className='flex_center flex-col border border-primary rounded-lg py-12 gap-2 glassmorphism-bg bg-primary-bg/90 cursor-pointer'>
        <FaCreditCard className="text-2xl" />
        <h1 className='text-lg'>{file.fileName}</h1>
        {file.time&&
        <h1 className='text-lg'>time: {file.time}</h1>
        }
        {file.decryptedStatus ?
            <button onClick={() => file.downloadEncryptedFile(file.index)} className="btn_primary_1 text-sm px-4 py-2">
                Download File
            </button>
            :
            <button onClick={() => file.DecryptFile(file.index)} className="btn_primary_2 text-sm px-4 py-2">
                Decrypt File
            </button>
        }
    </div>
</div>
  )
}
