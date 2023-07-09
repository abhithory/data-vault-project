"use client"
import React from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation';


function AppSidebar() {
    const  router = useRouter();

  return (
    <div className="h-[100vh] w-52 py-6 px-4">
        <div className="glassmorphism-bg bg-primary/20 h-full rounded-lg py-4">
        <span onClick={() => router.push("/")} className="flex_center cursor-pointer ">
          <Image
            src="/assests/logo.svg"
            width={80}
            height={80}
            alt="Picture of the author"
          />
          {/* <h1 className="text-2xl text-text-color ">Data Vault</h1> */}
        </span>
        </div>
    </div>
  )
}

export default AppSidebar