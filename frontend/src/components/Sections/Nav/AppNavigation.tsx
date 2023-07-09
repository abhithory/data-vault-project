"use client"

import React from 'react'
import { ConnectWallet } from "@thirdweb-dev/react";
import Image from 'next/image'

import { usePathname, useRouter } from 'next/navigation';
import { FaLandmark } from 'react-icons/fa';


function AppNavigation() {
  const  router = useRouter();
  const pathname = usePathname();

  if (pathname.startsWith("/match/")) {
    return <></>
  }
  return (
    <nav className="glassmorphism-bg w-full flex justify-between px-20 py-4 h-[12vh]">
      <span onClick={()=>router.push("/")} className=" cursor-pointer flex items-center justify-center gap-4">
        <Image
          src="/assests/logo.svg"
          width={80}
          height={80}
          alt="Picture of the author"
        />
        <h1 className="text-2xl text-text-color ">Data Vault</h1>
      </span>
      <span className="flex items-center justify-center gap-4">
        {/* <h1 className="basic_btn_4" onClick={()=>router.push("/profile")}>
          <FaLandmark  className=''/>
          Learn More
          </h1>

          <h1 className="basic_btn_4" onClick={()=>router.push("/marketplace")}>
          <FaLandmark  className=''/>
          Marketplace
          </h1> */}

        <ConnectWallet />
      </span>
    </nav>
  )
}

export default AppNavigation