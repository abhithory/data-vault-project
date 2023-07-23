import SimpleLoader from '@/components/Loader/loader'
import React from 'react'

export default function loading() {
  return (
    <main className='w-full h-full'>
     <section className="flex_center page_main flex-col text-center h-full">
        <div className="flex">
            <SimpleLoader className='w-6 mr-2' />
      <h1 className="text_primary_gradient text_sub_heading_size"> Loading...</h1>
        </div>
    </section>
</main>
  )
}
