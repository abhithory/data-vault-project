"use client"

import React from 'react'
import { ConnectWallet } from "@thirdweb-dev/react";
import Image from 'next/image'

import { usePathname, useRouter } from 'next/navigation';
import { FaLandmark } from 'react-icons/fa';


function AppNavigation() {
  const  router = useRouter();
  const pathname = usePathname();


  return ( <nav className="flex justify-end mt-6 mr-8 h-[8vh]">
    <span className="glassmorphism-bg bg-primary/20 rounded-xl flex py-1 px-2">
        <ConnectWallet  />
    </span>
 
      </nav>
  )
}

export default AppNavigation