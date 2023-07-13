"use client"
import React, { useContext, useEffect, useState } from 'react'
import CredentialListItem from './CredentialListItem';
import PopUpModel from '@/components/PopupModel/PopUpModel';
import CredentialsForm from './CredentialsForm';
import { Web3ConnectionContext } from '@/web3Connection/Web3ConnectionContext';
import { decryptMessage } from '@/utils/MessageEncryption';
import SimpleLoader from '@/components/Loader/loader';
import { DataExtendedInterface, DataStructInterface, DataTypeEnum } from '@/interfaces/DataInterface';
import { CredentialsFormData } from '@/interfaces/Credentials';
import { useDataStore } from '@/store/dataStore';


interface UploadDataInterface {
  type: DataTypeEnum
}

function UserAllData(props: UploadDataInterface) {

  const { address, getAllDataOfUser } = useContext(Web3ConnectionContext);

  const [allData, setDataToStore, setDecryptKey, loadingStatus] = useDataStore((store) => [store.allData, store.setData, store.setDecryptKey, store.loadingStatus]);

  const [dataArray,] = useState<DataExtendedInterface[]>(allData.filter(data => data.dataType === props.type));


  const [showDataModel, setShowDataModel] = useState<boolean>(false);
  const [dataIndex, setDataIndex] = useState<number>(0);


  // for crednetials
  const [credentialsData, setCredentialsData] = useState<CredentialsFormData>({
    credentialName:"",
    websiteurl: "",
    userid: "",
    password: ""
  });


  // const [uploadingCredential, setUploadingCredential] = useState<boolean>(false);
  // const [uploadingProcessCount, setUploadingProcessCount] = useState<number>(0);

  function openDataModel(n: number) {
    setDataIndex(n)
    // setCredentialsData
    setShowDataModel(true)
  }

  async function DecryptCredentials(n: number) {
    if (!address) return
    const _decryptedKey = await decryptMessage(dataArray[n].decryptKey, address);
    if (_decryptedKey) {
      setDecryptKey(dataArray[n].id, _decryptedKey)
    }
  }


  async function updateCredentails() {
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
              <CredentialListItem key={key} index={key} id={file.id} openDataModel={openDataModel} name={file.name} decryptedStatus={file.decryptedStatus} DecryptData={DecryptCredentials} time={formatTime(file.uploadTime)} />
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
          <CredentialsForm type="update" setCredentialsData={setCredentialsData} submitForm={updateCredentails} credentialsData={credentialsData} />
          {/* <div className="mt-4">
            {uploadingCredential &&
              <CredentialsUploadStepper uploadingProcessCount={uploadingProcessCount} />
            }
          </div> */}
        </div>
      </PopUpModel>

    </>

  )
}

export default UserAllData;