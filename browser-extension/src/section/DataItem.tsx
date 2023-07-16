import NormalButton from '../components/Buttons/NormalButton'
import { DataExtendedInterface, DataTypeEnum } from '../interfaces/DataInterface'
import { getDateToStringFromSec, getDayTimeToStringFromSec } from '../utils/Helper'
import { useState } from 'react'
import { RiLockPasswordFill } from 'react-icons/ri'
import { PiFileLock } from 'react-icons/pi'

interface CredentialWithFunctionInterface {
    type: DataTypeEnum,
    index: number,
    file: DataExtendedInterface,
    showDecryptedData: (index: number) => Promise<void>,
    handleDecryptData: (index: number) => Promise<void>
}
function DataItem({
    type,
    index,
    file,
    showDecryptedData,
    handleDecryptData
}: CredentialWithFunctionInterface) {
    const [isDownloading, setIsDownloading] = useState(false);
    const [isDecrypting, setIsDecrypting] = useState(false);

    async function showData() {
        setIsDownloading(true)
        try {
            await showDecryptedData(index);
        } catch (error) {
            console.log("showData", error);
        } finally {
            setIsDownloading(false)
        }
    }


    async function decryptData() {
        setIsDecrypting(true)
        try {
            await handleDecryptData(index);
        } catch (error) {
            console.log("decryptData", error);
        } finally {
            setIsDecrypting(false)
        }
    }
    return (
        <div className="w-full">

            <div className='flex_center border border-primary rounded-lg gap-2 glassmorphism-bg  cursor-pointer text-text-color'>
                {type === DataTypeEnum.CREDENTIALS ?
                    <RiLockPasswordFill className="text-2xl" />
                    : type === DataTypeEnum.FILE &&
                    <PiFileLock className="text-2xl" />
                }

                <div className="flex_center">
                    <h1 className='text-lg text-ellipsis overflow-hidden truncate'>{file.dataName}</h1>
                </div>
                <div className="text-center">
                    <h1 className='text-sm'>{getDayTimeToStringFromSec(file.uploadTime)}</h1>
                    <h1 className='text-sm'>{getDateToStringFromSec(file.uploadTime)}</h1>
                </div>
                {file.decryptedStatus ?
                    <NormalButton
                        onClick={showData}
                        className="btn_primary_1 text-sm px-4 py-2"
                        text={type === DataTypeEnum.CREDENTIALS ? "Check Credentials" : type === DataTypeEnum.FILE ? "Download File" : ""}
                        loading={isDownloading}
                    />
                    :
                    <NormalButton
                        onClick={decryptData}
                        className="btn_primary_2 text-sm px-4 py-2"
                        text={type === DataTypeEnum.CREDENTIALS ? "Decrypt Credentials" : type === DataTypeEnum.FILE ? "Decrypt File" : ""}
                        loading={isDecrypting}

                    />
                }
            </div>
        </div>
    )
}

export default DataItem