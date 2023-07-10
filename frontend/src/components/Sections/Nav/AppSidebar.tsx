"use client"
import React from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation';

import { RiLockPasswordLine } from "react-icons/ri";
import { PiFiles } from "react-icons/pi";
import { ConnectWallet } from '@thirdweb-dev/react';



function AppSidebar() {
    const  router = useRouter();
    const pathname = usePathname();


  return (
    <div className="h-[100vh] w-80 py-6 px-4 ">
        <div className="glassmorphism-bg bg-primary/20 h-full rounded-lg border border-primary flex_center flex-col justify-between  px-2 py-4">
          <div className="flex_center flex-col w-full gap-2"> 
        <span onClick={() => router.push("/app")} className="flex_center cursor-pointer pt-2 mb-4">
          <Image
            src="/assests/logo.svg"
            width={120}
            height={120}
            alt="Picture of the author"
          />
          {/* <h1 className="text-2xl text-text-color ">Data Vault</h1> */}
        </span>
        <button onClick={() => router.push("/app")} className={pathname === "/app" ? "btn_sidebar_active":"btn_sidebar"}>
          <RiLockPasswordLine />
          Credentials
        </button>

        <button onClick={() => router.push("/app/files")} className={pathname === "/app/files" ? "btn_sidebar_active":"btn_sidebar"}>
          <PiFiles />
          Files
        </button>
        </div>

        <span className='flex_center'>
        <ConnectWallet className='text-sm' />
        </span>

        </div>
    </div>
  )
}

export default AppSidebar