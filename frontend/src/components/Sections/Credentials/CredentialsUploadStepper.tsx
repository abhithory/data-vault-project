import React from 'react';
import { Stepper} from '@mantine/core';


function CredentialsUploadStepper(props:{uploadingProcessCount:number}) {
  return (
    <Stepper ta="center" active={props.uploadingProcessCount} breakpoint="md">
    <Stepper.Step label="Encriptiong" description="Credentials" loading={props.uploadingProcessCount === 0}>
      We are encriptioing your Credentials to make it secure. Please Confirm.
    </Stepper.Step>
    <Stepper.Step label="Confirm" description="Transaction" loading={props.uploadingProcessCount === 1}>
      Please Confirm the transaction with Wallet
    </Stepper.Step>
    <Stepper.Step label="Please" description="Wait" loading={props.uploadingProcessCount === 2}>
      Please wait for some time. We are adding your encrypted credentials in smart contract.
    </Stepper.Step>
    <Stepper.Completed>
      Credentials Added Seccefully.
    </Stepper.Completed>
  </Stepper>
  )
}

export default CredentialsUploadStepper