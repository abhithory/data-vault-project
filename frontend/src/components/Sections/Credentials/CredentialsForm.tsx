import { CredentialsFormData } from '@/interfaces/Credentials';
import React from 'react'

interface CredentialsFormProps{
    type: "create" | "update";
    setCredentialsData: (data:CredentialsFormData)=>void;
    submitForm: (e: React.ChangeEvent<HTMLFormElement>)=>void;
    credentialsData: CredentialsFormData;
} 
function CredentialsForm({type,setCredentialsData, submitForm, credentialsData}:CredentialsFormProps) {
    return (
            <form onSubmit={submitForm} className='flex_center flex-col gap-4 mt-4'>
                <input type="text" id="website" name="website" className='input_1' placeholder='Enter website' value={credentialsData.website} onChange={(e)=>setCredentialsData({...credentialsData,website: e.target.value})} required/>
                <input type="text" id="email" name="email" className='input_1' placeholder='Enter Your Email/UserName/Phone' value={credentialsData.usernameOrEmailOrPhone} onChange={(e)=>setCredentialsData({...credentialsData,usernameOrEmailOrPhone: e.target.value})} required/>
                <input type="password" id="pass" name="pass" className='input_1' placeholder='Enter your password' value={credentialsData.password} onChange={(e)=>setCredentialsData({...credentialsData,password: e.target.value})} required/>

                <button className='btn_primary_1' type='submit'>
                    {type.toLocaleUpperCase()} crdentials
                </button>
            </form>
    )
}

export default CredentialsForm