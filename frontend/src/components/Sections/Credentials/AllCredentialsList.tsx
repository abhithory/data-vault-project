"use client"
import React, { useContext, useEffect, useState } from 'react'
import CredentialListItem from './CredentialListItem';
import PopUpModel from '@/components/PopupModel/PopUpModel';
import CredentialsForm from './CredentialsForm';
import { CredentialsExtendedDataInterface, CredentialsFormData } from '@/interfaces/Credentials';
import CredentialsUploadStepper from './CredentialsUploadStepper';
import { Web3ConnectionContext } from '@/web3Connection/Web3ConnectionContext';
import { CredentialStruct } from '@/interfaces/SmartContract';
import { decryptMessage } from '@/utils/MessageEncryption';



function AllCredentialsList() {
  const { address, getAllCredentialsOfUser } = useContext(Web3ConnectionContext);

  const [allCredentials, setAllCredentials] = useState<CredentialsExtendedDataInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  const [showCredentialsModel, setShowCredentialsModel] = useState<boolean>(false);
  const [modelIndex, setModelIndex] = useState<number>(0);


  const [credentialsData, setCredentialsData] = useState<CredentialsFormData>({
    website: "",
    usernameOrEmailOrPhone: "",
    password: ""
  });

  const [uploadingCredential, setUploadingCredential] = useState<boolean>(false);
  const [uploadingProcessCount, setUploadingProcessCount] = useState<number>(0);

  useEffect(() => {
    async function loadAllCredentials() {
      if (!address) return
      setIsLoading(true)
      const _allCredentials: CredentialStruct[] | null = await getAllCredentialsOfUser();

      if (_allCredentials) {
        const extendedFiles: CredentialsExtendedDataInterface[] = _allCredentials.map(((item: CredentialStruct) => {
          return { ...item, decryptedStatus: false }
        }))
        setAllCredentials(extendedFiles)
      }
      setIsLoading(false)
    }

    loadAllCredentials()
  }, [address])


  function openCredentialModel(n: number) {
    setModelIndex(n)
    setShowCredentialsModel(true)
  }

  async function DecryptCredentials(n: number) {
    if (!address) return
    try {
      const _decryptedMsg = await decryptMessage(allCredentials[n].password, address);
      setAllCredentials((prev)=>{
        prev[n] = {...prev[n],password:_decryptedMsg,decryptedStatus:true}
        return [...prev]
      })
    } catch (error) {

    }
  }


  async function updateCredentails() {
  }
  return (
    <div className="flex flex-wrap gap-4">

      {allCredentials &&
        allCredentials.map((file: CredentialsExtendedDataInterface, key: number) => {
          return (

            <CredentialListItem index={key} openCredentialModel={openCredentialModel} website={file.website} usernameOrEmailOrPhone={file.usernameOrEmailOrPhone} password={file.password} decryptedStatus={file.decryptedStatus} DecryptCredentials={DecryptCredentials} />
          )
        })}

      <PopUpModel isOpen={showCredentialsModel} closeModal={() => setShowCredentialsModel(false)}>
        <div className="text-center">
          <h1 className="text-3xl text_primary_gradient_2">Credentials</h1>
          <CredentialsForm type="update" setCredentialsData={setCredentialsData} submitForm={updateCredentails} credentialsData={allCredentials[modelIndex]} />
          <div className="mt-4">
            {uploadingCredential &&
              <CredentialsUploadStepper uploadingProcessCount={uploadingProcessCount} />
            }
          </div>
        </div>
      </PopUpModel>

    </div>
  )
}

export default AllCredentialsList;