import NormalButton from '@/components/Buttons/NormalButton';
import NormalInput from '@/components/Inputs/NormalInput';
import { CredentialsFormData } from '@/interfaces/Credentials';
import React from 'react'

interface CredentialsFormProps{
    type: "create" | "update";
    setCredentialsData: (data:CredentialsFormData)=>void;
    submitForm: (e: React.ChangeEvent<HTMLFormElement>)=>void;
    credentialsData: CredentialsFormData;
    uploadingCredential?: boolean;
    
} 
function CredentialsForm({type,setCredentialsData, submitForm, credentialsData, uploadingCredential}:CredentialsFormProps) {
    return (
            <form onSubmit={submitForm} className='flex_center flex-col gap-4 mt-4'>
                <NormalInput type="text" id="websiteUrl" name="websiteUrl" className='input_1' placeholder='Enter Website URL' value={credentialsData.websiteurl} onChange={(e)=>setCredentialsData({...credentialsData,websiteurl: e.target.value, credentialName: e.target.value})} copy={type === "update"} required/>
                <NormalInput type="text" id="userid" name="userid" className='input_1' placeholder='Enter User Id (Email/UserName/Phone)' value={credentialsData.userid} onChange={(e)=>setCredentialsData({...credentialsData,userid: e.target.value})} copy={type === "update"} required/>
                <NormalInput type="password" id="pass" placeholder='Enter your password' value={credentialsData.password} onChange={(e)=>setCredentialsData({...credentialsData,password: e.target.value})} copy={type === "update"} required />

                {type === "create" &&
                <NormalButton className='btn_primary_1' type='submit' text={`${type.toLocaleUpperCase()} Credentials`} loading={uploadingCredential} />
                }
            </form>
    )
}

export default CredentialsForm