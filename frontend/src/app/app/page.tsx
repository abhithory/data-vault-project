import AllCredentialsList from '@/components/Sections/Credentials/AllCredentialsList'
import UploadCredentails from '@/components/Sections/Credentials/UploadCredentails'
import React,{useState} from 'react'


function page() {
    return (
        <main>
            <section>
                <UploadCredentails />
            </section>
            <section>
                <AllCredentialsList />
            </section>
        </main>
    )
}

export default page