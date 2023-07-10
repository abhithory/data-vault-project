"use client"
import React from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation';

import { RiLockPasswordLine } from "react-icons/ri";
import { PiFiles } from "react-icons/pi";



function AppSidebar() {
    const  router = useRouter();

  return (
    <div className="h-[100vh] w-64 py-6 px-4 ">
        <div className="glassmorphism-bg bg-primary/20 h-full rounded-lg border border-primary flex_center flex-col justify-start gap-2 px-2">
        <span onClick={() => router.push("/app")} className="flex_center cursor-pointer pt-4 mb-4">
          <Image
            src="/assests/logo.svg"
            width={80}
            height={80}
            alt="Picture of the author"
          />
          {/* <h1 className="text-2xl text-text-color ">Data Vault</h1> */}
        </span>

        <button onClick={() => router.push("/app")} className="btn_sidebar">
          <RiLockPasswordLine />
          Credentials
        </button>

        <button onClick={() => router.push("/app/files")} className="btn_sidebar_active">
          <PiFiles />
          Files
        </button>


        </div>
    </div>
  )
}

export default AppSidebar