"use client"
import React from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from 'next/navigation'
import AnimationDivProvider from './AnimationDivProvider';


function AnimationProvider({ children, className }: any) {
    const pathName = usePathname();
    return (
        <AnimatePresence>
            {/* {pathName.startsWith("/app") ?
                children
                : */}
                {/* <AnimationDivProvider> */}
                    {children}

                {/* </AnimationDivProvider>                
            } */}
        </AnimatePresence>
    )
}

export default AnimationProvider;