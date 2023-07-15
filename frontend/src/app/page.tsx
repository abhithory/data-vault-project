"use client"
import Image from 'next/image'

import { ConnectWallet } from "@thirdweb-dev/react";
import { useRouter } from 'next/navigation';
import GlowButton from '@/components/Buttons/GlowButton';



export default function Home() {
  const router = useRouter()
  return (
    <main className="page_main flex_center">
      <section className="flex_center flex-col text-center mb-16">
        <h1 className="text_highlight_gradient text_sub_heading_size">Credentials & Files</h1>
        <h1 className="text_primary_gradient text_big_heading_size">Protect Your Data</h1>
        <h1 className="md:mt-4  text_heading_size">with <span className='text_primary_gradient_2'>DataVault</span></h1>
        <p className='w-9/12 md:w-8/12 lg:w-7/12 xl:w-6/12 text-center mt-8'>DataVault is your secure and private solution for storing passwords and files on the blockchain. Our decentralized application (Dapp) combines encryption technology with the power of blockchain to ensure your data remains safe from unauthorized access.</p>
        <div className="mt-14 ">
          <GlowButton className="xl:text-2xl md:text-xl text-base"
            onClick={() => {
              router.push("/app")
            }}
            text='Launch dApp' />
        </div>
      </section>
      {/* <section className="basis-1/2">
        <Image src="/assests/logo.svg" width={500} height={500} alt='website' />
      </section> */}
    </main>
  )
}
