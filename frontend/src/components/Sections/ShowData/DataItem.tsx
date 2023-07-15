import NormalButton from '@/components/Buttons/NormalButton'
import { DataExtendedInterface, DataTypeEnum } from '@/interfaces/DataInterface'
import { getDateToStringFromSec, getDayTimeToStringFromSec } from '@/utils/Helper'
import React from 'react'
import { FaCreditCard } from 'react-icons/fa'
import { RiLockPasswordFill } from 'react-icons/ri'
import { PiFileLock } from 'react-icons/pi'

interface CredentialWithFunctionInterface {
    type: DataTypeEnum,
    index: number,
    file: DataExtendedInterface,
    isDownloading: boolean,
    showDecryptedData: (index: number) => void,
    handleDecryptData: (index: number) => void
}
function DataItem({
    type,
    index,
    file,
    isDownloading,
    showDecryptedData,
    handleDecryptData
}: CredentialWithFunctionInterface) {
    return (
        <div className="relative group w-[14rem]">
            <div className="absolute -inset-0 bg-gradient-to-r from-primary via-third to-secondary rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className='flex_center flex-col border border-primary rounded-lg py-12 gap-2 glassmorphism-bg bg-primary-bg/90 cursor-pointer'>
                {type === DataTypeEnum.CREDENTIALS ?
                 <RiLockPasswordFill className="text-2xl" />
                 : type === DataTypeEnum.FILE &&
                <PiFileLock className="text-2xl" />
                 }

                <div className="flex_center w-[12rem]">
                    <h1 className='text-lg text-ellipsis overflow-hidden truncate'>{file.dataName}</h1>
                </div>
                <div className="text-center">
                    <h1 className='text-sm'>{getDayTimeToStringFromSec(file.uploadTime)}</h1>
                    <h1 className='text-sm'>{getDateToStringFromSec(file.uploadTime)}</h1>
                </div>
                {file.decryptedStatus ?
                    <NormalButton
                        onClick={() => showDecryptedData(index)}
                        className="btn_primary_1 text-sm px-4 py-2"
                        text={type === DataTypeEnum.CREDENTIALS ? "Check Credentials" : type === DataTypeEnum.FILE ? "Download File" : ""}
                        loading={isDownloading}
                    />
                    :
                    <NormalButton
                        onClick={() => handleDecryptData(index)}
                        className="btn_primary_2 text-sm px-4 py-2"
                        text={type === DataTypeEnum.CREDENTIALS ? "Decrypt Credentials" : type === DataTypeEnum.FILE ? "Decrypt File" : ""}
                    />
                }
            </div>
        </div>
    )
}

export default DataItem