"use client"
import React, { useContext, useEffect, useState } from 'react'
import PopUpModel from '@/components/PopupModel/PopUpModel';
import CredentialsForm from './CredentialsForm';
import { Web3ConnectionContext } from '@/web3Connection/Web3ConnectionContext';
import { decryptMessage } from '@/utils/MessageEncryption';
import SimpleLoader from '@/components/Loader/loader';
import { DataExtendedInterface, DataStructInterface, DataTypeEnum } from '@/interfaces/DataInterface';
import { CredentialsFormData } from '@/interfaces/Credentials';
import { useDataStore } from '@/store/dataStore';
import DataItem from './DataItem';
import { decryptFile, downloadFile } from '@/utils/FileEncryption';


interface UploadDataInterface {
  type: DataTypeEnum
}

function UserAllData(props: UploadDataInterface) {

  const { address, getFileUrlFromIpfsHash } = useContext(Web3ConnectionContext);

  const [allData, setDataToStore, setDecryptKey, loadingStatus] = useDataStore((store) => [store.allData, store.setData, store.setDecryptKey, store.loadingStatus]);

  const [dataArray,] = useState<DataExtendedInterface[]>(allData.filter(data => data.dataType === props.type));


  const [showDataModel, setShowDataModel] = useState<boolean>(false);

  const [isDownloading, setIsDownloading] = useState<boolean>(false);


  // for crednetials
  const [credentialsData, setCredentialsData] = useState<CredentialsFormData>({
    credentialName: "",
    websiteurl: "",
    userid: "",
    password: ""
  });


  async function showDecryptedData(n: number) {
    try {
      
      setIsDownloading(true);
      const _fullURL: string = await getFileUrlFromIpfsHash(dataArray[n].fileHash);
      const _res = await fetch(_fullURL);
      const encryptedFile = await _res.blob();
      const decryptedFile: Blob = await decryptFile(encryptedFile, dataArray[n].decryptKey);
      if (props.type === DataTypeEnum.CREDENTIALS) {
        const formData: CredentialsFormData = JSON.parse(await decryptedFile.text())
        setCredentialsData(formData)
        setShowDataModel(true)
      } else if (props.type === DataTypeEnum.FILE) {
        downloadFile(decryptedFile, dataArray[n].name + ".zip")
      }
    } catch (error) {
      
    }
    setIsDownloading(true);
  }

  async function handleDecryptData(n: number) {
    if (!address) return
    const _decryptedKey = await decryptMessage(dataArray[n].decryptKey, address);
    if (_decryptedKey) {
      setDecryptKey(dataArray[n].id, _decryptedKey)
    }
  }

  function formatTime(secs: number) {
    return (new Date(secs * 1000)).toString();
  }
  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center">
        {dataArray &&
          dataArray.map((file: DataExtendedInterface, key: number) => {
            return (
              <DataItem
                key={key}
                index={key}
                type={props.type}
                id={file.id}
                showDecryptedData={showDecryptedData}
                name={file.name}
                decryptedStatus={file.decryptedStatus}
                handleDecryptData={handleDecryptData}
                time={formatTime(file.uploadTime)}
                isDownloading={isDownloading} />
            )
          })}
      </div>

      {loadingStatus &&
        <div className="flex_center w-full">
          <SimpleLoader className='w-12' />
        </div>
      }

      <PopUpModel isOpen={showDataModel} closeModal={() => setShowDataModel(false)}>
        <div className="text-center">
          <h1 className="text-3xl text_primary_gradient_2">Your Credentials</h1>
          <CredentialsForm
            type="update"
            setCredentialsData={() => { }}
            submitForm={() => { }}
            credentialsData={credentialsData} />
        </div>
      </PopUpModel>

    </>

  )
}

export default UserAllData;