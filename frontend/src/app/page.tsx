"use client"
import Image from 'next/image'

import { ConnectWallet } from "@thirdweb-dev/react";
import { useRouter } from 'next/navigation';



export default function Home() {
  const router = useRouter()
  return (
    <main className="page_main flex_center px-24">
      <section className="basis-1/2">
        <h1>Tagline</h1>
        <h1>DataVault</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus autem quod, voluptate harum pariatur possimus nobis necessitatibus, dolorum alias temporibus, cumque molestiae provident id ratione. Illo tenetur mollitia ducimus voluptatem labore natus.</p>
        <div className="flex gap-4 mt-4">
        <button className="btn_1" onClick={()=>{
          router.push("/app")
        }}>Launch dApp</button>
        <button className="btn_2">Learn More</button>
        </div>
      </section>
      <section className="basis-1/2">
        <Image src="/assests/logo.svg" width={500} height={500} alt='website' />
      </section>
    </main>
  )
}
