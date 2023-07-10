import React from 'react';
import { Stepper} from '@mantine/core';


function CredentialsUploadStepper(props:{uploadingProcessCount:number}) {
  const checkedAdvanceEncryption = true;
  return (
    <Stepper ta="center" active={props.uploadingProcessCount} breakpoint="md">
    <Stepper.Step label={checkedAdvanceEncryption?"Encrypting":"Uploading"} description={checkedAdvanceEncryption?"File":" to IPFS"} loading={props.uploadingProcessCount === 0}>
    {checkedAdvanceEncryption?
      "We are Encrypting your Your File to make it secure. Please Confirm and wait."
      :
      " We Are Uploading your File To IPFS. Please Wait..."}
    </Stepper.Step>
    <Stepper.Step label={!checkedAdvanceEncryption?"Encrypting":"Uploading"} description={!checkedAdvanceEncryption?"File":" to IPFS"} loading={props.uploadingProcessCount === 1}>
    {!checkedAdvanceEncryption?
      "We are encriptioing your Your File Credentials to make it secure. Please Confirm and wait."
      :
      " We Are Uploading your Encrypted File To IPFS. Please Wait..."}
    </Stepper.Step>
    <Stepper.Step label="Confirm" description="Transaction" loading={props.uploadingProcessCount === 2}>
      Please Confirm the transaction with Wallet.
    </Stepper.Step>
    <Stepper.Step label="Please" description="Wait" loading={props.uploadingProcessCount === 3}>
      Please wait for some time. We are adding your encrypted File in smart contract.
    </Stepper.Step>
    <Stepper.Completed>
      File Added Seccefully.
    </Stepper.Completed>
  </Stepper>
  )
}

export default CredentialsUploadStepper