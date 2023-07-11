import AllCredentialsList from '@/components/Sections/Credentials/AllCredentialsList'
import UploadCredentails from '@/components/Sections/Credentials/UploadCredentails'
import React from 'react'


function page() {
    return (
        <main className='w-full'>
            <section className='flex justify-end mt-6 mr-8'>
                <UploadCredentails />
            </section>
            <section className='mt-8'>
                <h1 className='text_primary_gradient text-2xl mb-4 text-center'>All your Credentials</h1>
                <AllCredentialsList />
            </section>
        </main>
    )
}

export default page