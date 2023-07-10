"use client"
import React, { useState } from 'react'
import CredentialListItem from './CredentialListItem';



function AllCredentialsList() {
  const [allCredentials, setAllCredentials] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);


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

  function openCredentialModel(n:number){
    // setModelIndex(n)
    // open()
}

async function DecryptCredentials(n:number) {
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
  
  return (
    <div className="flex flex-wrap gap-4">
      {/* <CredentialListItem index={key} openCredentialModel={openCredentialModel} website={file.website} usernameOrEmailOrPhone={file.usernameOrEmailOrPhone} password={file.password} decryptedStatus={file.decryptedStatus} DecryptCredentials={DecryptCredentials} /> */}
      <CredentialListItem index={0} openCredentialModel={openCredentialModel} website={"website"} usernameOrEmailOrPhone={"usernameOrEmailOrPhone"} password={"password"} decryptedStatus={false} DecryptCredentials={DecryptCredentials} />
      <CredentialListItem index={0} openCredentialModel={openCredentialModel} website={"website"} usernameOrEmailOrPhone={"usernameOrEmailOrPhone"} password={"password"} decryptedStatus={false} DecryptCredentials={DecryptCredentials} />
      <CredentialListItem index={0} openCredentialModel={openCredentialModel} website={"website"} usernameOrEmailOrPhone={"usernameOrEmailOrPhone"} password={"password"} decryptedStatus={false} DecryptCredentials={DecryptCredentials} />
      <CredentialListItem index={0} openCredentialModel={openCredentialModel} website={"website"} usernameOrEmailOrPhone={"usernameOrEmailOrPhone"} password={"password"} decryptedStatus={false} DecryptCredentials={DecryptCredentials} />
      <CredentialListItem index={0} openCredentialModel={openCredentialModel} website={"website"} usernameOrEmailOrPhone={"usernameOrEmailOrPhone"} password={"password"} decryptedStatus={false} DecryptCredentials={DecryptCredentials} />
      <CredentialListItem index={0} openCredentialModel={openCredentialModel} website={"website"} usernameOrEmailOrPhone={"usernameOrEmailOrPhone"} password={"password"} decryptedStatus={false} DecryptCredentials={DecryptCredentials} />
      <CredentialListItem index={0} openCredentialModel={openCredentialModel} website={"website"} usernameOrEmailOrPhone={"usernameOrEmailOrPhone"} password={"password"} decryptedStatus={false} DecryptCredentials={DecryptCredentials} />
    </div>
  )
}

export default AllCredentialsList;