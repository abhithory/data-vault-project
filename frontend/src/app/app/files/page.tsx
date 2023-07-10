import AllFilesList from '@/components/Sections/Files/AllFilesList'
import UploadFiles from '@/components/Sections/Files/UploadFiles'
import React from 'react'

function page() {
  return (
    <main className='w-full'>
    <section className='flex justify-end mt-6 mr-8'>
        <UploadFiles />
    </section>
    <section className='mt-8'>
        <h1 className='text_primary_gradient text-2xl mb-4 text-center'>All your Files</h1>
        <AllFilesList />
    </section>
</main>
  )
}

export default page