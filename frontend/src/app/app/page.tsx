import AllCredentialsList from '@/components/Sections/Credentials/AllCredentialsList'
import UploadData from '@/components/Sections/Credentials/UploadData'
import { DataTypeEnum } from '@/interfaces/DataInterface'
import React from 'react'


function page() {
    return (
        <main className='w-full'>
            <section className='flex justify-end mt-6 mr-8'>
                <UploadData type={DataTypeEnum.CREDENTIALS} />
            </section>
            <section className='mt-8'>
                <h1 className='text_primary_gradient text-2xl mb-4 text-center'>All your Credentials</h1>
                <AllCredentialsList />
            </section>
        </main>
    )
}

export default page