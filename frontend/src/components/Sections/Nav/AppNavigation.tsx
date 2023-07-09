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
  return ( <nav className="glassmorphism-bg bg-primary/20 h-[8vh] mt-6 rounded-xl flex justify-end py-2 mx-4 px-4">
 
        <ConnectWallet />
      </nav>
  )
}

export default AppNavigation