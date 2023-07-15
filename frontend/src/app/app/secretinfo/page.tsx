import UserAllData from '@/components/Sections/ShowData/UserAllData'
import UploadData from '@/components/Sections/UploadData/UploadData'
import { DataTypeEnum } from '@/interfaces/DataInterface'
import React from 'react'

function page() {
  return (
    <main className='w-full'>
      <section className='flex justify-end mt-6 mr-8'>
        <UploadData type={DataTypeEnum.INFO} />
      </section>
      <section className='mt-8'>
        <h1 className='text_primary_gradient mb-4 text-center text_sub_heading_size'>Coming Soon...</h1>
        <UserAllData type={DataTypeEnum.INFO} />
      </section>
    </main>
  )
}

export default page