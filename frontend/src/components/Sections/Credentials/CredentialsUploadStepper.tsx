import React from 'react';
import { Stepper} from '@mantine/core';


function CredentialsUploadStepper({uploadingProcessCount}:{uploadingProcessCount:number}) {
  const checkedAdvanceEncryption = true;

  const messages: {
    [index: number]:string
  } ={    
    0:"Enter your Credentials and upload",
    1:"We are encriptioing your Credentials to make it secure. Please Confirm.",
    2:"Please Confirm the transaction with Wallet and wait for some time. We are adding your encrypted credentials in smart contract.",
    3:"Credentials Added Seccefully."
  }

  return (
  <div className="">
    <p className="text-sm">
      {messages[uploadingProcessCount]}
    </p>
  </div>
  )
}

export default CredentialsUploadStepper