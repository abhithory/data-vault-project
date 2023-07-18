"use client"
import Image from 'next/image'

import { ConnectWallet } from "@thirdweb-dev/react";
import { useRouter } from 'next/navigation';
import GlowButton from '@/components/Buttons/GlowButton';
import FeatureItem from '@/components/Sections/Features/FeatureItem';
import FeatureSection from '@/components/Sections/Features/FeatureSection';
import Footer from '@/components/Sections/Footer/Footer';
import TechStackSection from '@/components/Sections/TechStack/TechStackSection';



export default function Home() {
  const router = useRouter();


  return (
    <main className="page_main flex_center flex-col">
      <section className="flex_center page_main flex-col text-center h-full">
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
      <section className="page_section flex_center flex-col py-8">
            <h1 className="text_primary_gradient text_heading_size">Features</h1>
            <p className='w-10/12 md:w-8/12 text-center text-sm mb-12 mt-4'>DataVault is a comprehensive data storage solution that prioritizes the security and privacy of your sensitive information. Here are some key features and benefits of DataVault:</p>

            <FeatureSection />
        
     </section>

     <section className="page_section flex_center flex-col my-12">
     <h1 className="text_primary_gradient text_heading_size">Our Tech Stack</h1>
            <p className='w-10/12 md:w-8/12 text-center text-sm mb-12 mt-2'>We utilize cutting-edge technologies to deliver innovative solutions.</p>

      <TechStackSection />
        
      </section>

      <section className="page_section flex_center flex-col">

        <Footer />
      </section>

    </main>
  )
}
