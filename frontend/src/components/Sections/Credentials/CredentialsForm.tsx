import NormalButton from '@/components/Buttons/NormalButton';
import StyleButton1 from '@/components/Buttons/StyleButton1';
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
                <NormalInput type="text" id="website" name="website" className='input_1' placeholder='Enter website' value={credentialsData.website} onChange={(e)=>setCredentialsData({...credentialsData,website: e.target.value})} copy={type === "update"} required/>
                <NormalInput type="text" id="email" name="email" className='input_1' placeholder='Enter Your Email/UserName/Phone' value={credentialsData.usernameOrEmailOrPhone} onChange={(e)=>setCredentialsData({...credentialsData,usernameOrEmailOrPhone: e.target.value})} copy={type === "update"} required/>
                <NormalInput type="password" id="pass" placeholder='Enter your password' value={credentialsData.password} onChange={(e)=>setCredentialsData({...credentialsData,password: e.target.value})} copy={type === "update"} required />

                {type === "create" &&
                <NormalButton className='btn_primary_1' type='submit' text={`${type.toLocaleUpperCase()} crdentials`} loading={uploadingCredential} />
                }
            </form>
    )
}

export default CredentialsForm