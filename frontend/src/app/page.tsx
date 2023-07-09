"use client"
import Image from 'next/image'

import { ConnectWallet } from "@thirdweb-dev/react";
import { useRouter } from 'next/navigation';



export default function Home() {
  const router = useRouter()
  return (
    <main className="page_main flex_center">
      <section className="basis-1/2 text-center">
        <h1 className="text_gradient text-7xl">Protect Your Data</h1>
        <h1 className="text-4xl">with DataVault</h1>
        <h1 className="text_gradient text-2xl">Your Secure Data Storage Solution</h1>
        <p>DataVault is your secure and private solution for storing passwords and files on the blockchain. Our decentralized application (Dapp) combines encryption technology with the power of blockchain to ensure your data remains safe from unauthorized access. Experience peace of mind knowing that only you hold the key to access your encrypted information.</p>
        <div className="flex_center gap-4 mt-4">
        <button className="btn_1" onClick={()=>{
          router.push("/app")
        }}>Launch dApp</button>
        <button className="btn_2">Learn More</button>
        </div>
      </section>
      {/* <section className="basis-1/2">
        <Image src="/assests/logo.svg" width={500} height={500} alt='website' />
      </section> */}
    </main>
  )
}
