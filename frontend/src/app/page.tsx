"use client"
import Image from 'next/image'

import { ConnectWallet } from "@thirdweb-dev/react";
import { useRouter } from 'next/navigation';



export default function Home() {
  const router = useRouter()
  return (
    <main className="page_main flex_center">
      <section className="w-8/12 flex_center flex-col text-center">
        <h1 className="text_highlight_gradient text-2xl">Credentials & Files</h1>
        <h1 className="text_primary_gradient text-8xl glow">Protect Your Data</h1>
        <h1 className="text-4xl mt-4">with <span className='text_primary_gradient_2'>DataVault</span></h1>
        <p className='w-10/12 text-center mt-8'>DataVault is your secure and private solution for storing passwords and files on the blockchain. Our decentralized application (Dapp) combines encryption technology with the power of blockchain to ensure your data remains safe from unauthorized access.</p>
        <div className="flex_center gap-4 mt-14">
        <button className="btn_primary_1" onClick={()=>{
          router.push("/app")
        }}>Launch dApp</button>
        <button className="btn_primary_2">Learn More</button>
        </div>
      </section>
      {/* <section className="basis-1/2">
        <Image src="/assests/logo.svg" width={500} height={500} alt='website' />
      </section> */}
    </main>
  )
}
