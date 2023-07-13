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



function AllCredentialsList() {
  const { address, getAllDataOfUser } = useContext(Web3ConnectionContext);

  const [allData, setDataToStore, setDecryptKey] = useDataStore((store)=> [store.allData,store.setData, store.setDecryptKey]);
  const [allCredentials,] = useState<DataExtendedInterface[]>(allData.filter(data=>data.dataType===DataTypeEnum.CREDENTIALS));
  // const [allCredentials, setAllCredentials] = useState<DataExtendedInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [showCredentialsModel, setShowCredentialsModel] = useState<boolean>(false);
  const [modelIndex, setModelIndex] = useState<number>(0);

  const [credentialsData, setCredentialsData] = useState<CredentialsFormData>({
    website: "",
    usernameOrEmailOrPhone: "",
    password: ""
  });


  // const [uploadingCredential, setUploadingCredential] = useState<boolean>(false);
  // const [uploadingProcessCount, setUploadingProcessCount] = useState<number>(0);

  async function loadAllData() {
    if (!address) return
    setIsLoading(true)
    
    const _allCredentials: DataStructInterface[] | null = await getAllDataOfUser();
    console.log("loading",_allCredentials?.length);
    if (_allCredentials) {
      setDataToStore(_allCredentials)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    loadAllData()
  }, [address])
 


  function openCredentialModel(n: number) {
    setModelIndex(n)
    // setCredentialsData
    setShowCredentialsModel(true)
  }

  async function DecryptCredentials(n: number) {
    if (!address) return
      const _decryptedKey = await decryptMessage(allCredentials[n].decryptKey, address);
      if (_decryptedKey) {
        setDecryptKey(allCredentials[n].id,_decryptedKey)
      }
  }


  async function updateCredentails() {
  }


  function formatTime(secs: number){
    return (new Date(secs*1000)).toString();
  }
  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center">
        {allCredentials &&
          allCredentials.map((file: DataExtendedInterface, key: number) => {
            return (
              <CredentialListItem key={key} index={key} id={file.id} openDataModel={openCredentialModel} name={file.name}  decryptedStatus={file.decryptedStatus} DecryptData={DecryptCredentials} time={formatTime(file.uploadTime)} />
            )
          })}
      </div>

      {isLoading &&
        <div className="flex_center w-full">
          <SimpleLoader className='w-12' />
        </div>
      }

      <PopUpModel isOpen={showCredentialsModel} closeModal={() => setShowCredentialsModel(false)}>
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

export default AllCredentialsList;