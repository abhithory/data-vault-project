"use client"
import React, { useState } from 'react'
import CredentialListItem from './CredentialListItem';
import PopUpModel from '@/components/PopupModel/PopUpModel';
import CredentialsForm from './CredentialsForm';
import { CredentialsFormData } from '@/interfaces/Credentials';
import CredentialsUploadStepper from './CredentialsUploadStepper';



function AllCredentialsList() {
  const [allCredentials, setAllCredentials] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  const [showCredentialsModel, setShowCredentialsModel] = useState(false);
  const [modelIndex, setModelIndex] = useState<number>(0);


  async function loadAllCredentials() {
    setIsLoading(true)

    try {
      // const dataVault = getDataVaultContract();
      // const allCredentials:CredentialInterface[] = await dataVault.getAllCredentialsOfUser();
      // const extendedFiles:ExtendedCredentialInterface[] = allCredentials.map(((item:CredentialInterface)=>{
      //     return {...item,decryptedStatus:false}
      // }))
      // setAllCredentials(extendedFiles);
    } catch (error: any) {
      console.log("error", error?.message);
    } finally {
      setIsLoading(false)
    }
  }

  function openCredentialModel(n: number) {

    setModelIndex(n)
    setShowCredentialsModel(true)
  }

  async function DecryptCredentials(n: number) {
    setShowCredentialsModel(true)

    try {
      // const _decryptedMsg = await decryptMessage(allCredentials[n].password,web3ConnectionData.walletAddress);
      // setAllCredentials(allCredentials.map((file:ExtendedCredentialInterface,i:number)=>{
      //     if (i === n) {
      //         return {...file,password:_decryptedMsg,decryptedStatus:true}
      //     }
      //     return file
      // }))
    } catch (error) {

    }
  }

  const [credentialsData, setCredentialsData] = useState<CredentialsFormData>({
    website:"google.com",
    email:"email@gmail.com",
    password:"12341234"
})
const [uploadingCredential, setUploadingCredential] = useState<boolean>(false);
const [uploadingProcessCount, setUploadingProcessCount] = useState<number>(0);


async function updateCredentails() {
    
}


  return (
    <div className="flex flex-wrap gap-4">
      {/* <CredentialListItem index={key} openCredentialModel={openCredentialModel} website={file.website} usernameOrEmailOrPhone={file.usernameOrEmailOrPhone} password={file.password} decryptedStatus={file.decryptedStatus} DecryptCredentials={DecryptCredentials} /> */}
      <CredentialListItem index={0} openCredentialModel={openCredentialModel} website={"website"} usernameOrEmailOrPhone={"usernameOrEmailOrPhone"} password={"password"} decryptedStatus={false} DecryptCredentials={DecryptCredentials} />
      <CredentialListItem index={0} openCredentialModel={openCredentialModel} website={"website"} usernameOrEmailOrPhone={"usernameOrEmailOrPhone"} password={"password"} decryptedStatus={false} DecryptCredentials={DecryptCredentials} />
 

      <PopUpModel isOpen={showCredentialsModel} closeModal={() => setShowCredentialsModel(false)}>
        <div className="text-center">
          <h1 className="text-3xl text_primary_gradient_2">Credentials</h1>
          <CredentialsForm type="update" setCredentialsData={setCredentialsData} submitForm={updateCredentails} credentialsData={credentialsData} />
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