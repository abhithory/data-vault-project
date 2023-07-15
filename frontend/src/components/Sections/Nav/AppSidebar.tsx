"use client"
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation';

import { RiLockPasswordLine } from "react-icons/ri";
import { PiFiles, PiInfinityThin, PiInfo, PiInfoBold } from "react-icons/pi";
import { CgClose } from 'react-icons/cg'
import { ConnectWallet } from '@thirdweb-dev/react';
import { FiMenu } from 'react-icons/fi';
import { useDataStore } from '@/store/dataStore';
import { Web3ConnectionContext } from '@/web3Connection/Web3ConnectionContext';
import IconButton from '@/components/Buttons/IconButton';



function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { address, getAllDataOfUser } = useContext(Web3ConnectionContext);
  const [setLoadingStatus] = useDataStore((store) => [store.setLoadingStatus]);


  async function loadAllData() {
    if (!address) return
    setLoadingStatus(true)
    await getAllDataOfUser();
    setLoadingStatus(false)
  }

  useEffect(() => {
    loadAllData()
  }, [address])



  return (
    <>
      {!isMenuOpen &&
        <div className="fixed top-6 left-8 lg:hidden">
          <IconButton icon={<FiMenu />} className={isMenuOpen ? "btn_primary_1" : "btn_primary_2 py-3"} onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }} />
        </div>
      }
      <div className="lg:block hidden h-screen">
        <DrawerContent router={router} pathName={pathname} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>
      <div className="lg:hidden ">
      <DrawerMenuProvider pathName={pathname} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}>
        <DrawerContent router={router} pathName={pathname} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </DrawerMenuProvider>
      </div>
    </>
  )
}


function DrawerMenuProvider({ children, isMenuOpen, setIsMenuOpen }: { children: any, pathName: string, isMenuOpen: boolean, setIsMenuOpen: (state: boolean) => void }) {
  return (
    <div className={`fixed top-0 left-0 z-40 h-screen overflow-hidden transition-transform ${!isMenuOpen && "-translate-x-full"}`} >
      {children}
    </div>
  )
}


function DrawerContent({ router, isMenuOpen, setIsMenuOpen,pathName }: { router: any, pathName: string, isMenuOpen: boolean, setIsMenuOpen: (state: boolean) => void }) {
  return (
    <div className="h-full w-[22rem] py-6 px-4">
    <div className="glassmorphism-bg h-full rounded-lg border border-primary flex_center flex-col justify-between px-2 py-2">
      <div className='w-full'>
          <div className="w-full flex items-center justify-end lg:hidden">
            <IconButton icon={<CgClose />} className={"btn_primary_2 py-2 px-4"} onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }} />
          </div>
        <div className="flex_center flex-col w-full gap-2">
          <span onClick={() => router.push("/app")} className="flex_center cursor-pointer pt-2 mb-4">
            <Image
              src="/assests/logo.svg"
              width={120}
              height={120}
              alt="Picture"
            />
          </span>
          <button onClick={() => router.push("/app")} className={pathName === "/app" ? "btn_sidebar_active" : "btn_sidebar"}>
            <RiLockPasswordLine />
            Credentials
          </button>

          <button onClick={() => router.push("/app/files")} className={pathName === "/app/files" ? "btn_sidebar_active" : "btn_sidebar"}>
            <PiFiles />
            Files
          </button>
          <button onClick={() => router.push("/app/screatinfo")} className={pathName === "/app/screatinfo" ? "btn_sidebar_active" : "btn_sidebar"}>
            <PiInfoBold />
            Screat Info
          </button>
        </div>
      </div>

      <span className='flex_center'>
        <ConnectWallet className='text-sm' />
      </span>

    </div>
  </div>
  )
}

export default AppSidebar