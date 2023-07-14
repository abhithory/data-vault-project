"use client"
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation';
import React from 'react'

function AnimationDivProvider({children, className}: any) {
    const pathName = usePathname();

  return (
    <motion.div
    key={pathName}
    transition={{
        duration: 0.75
    }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{opacity: 0}}
    className={className}
>
    {children}
</motion.div>
  )
}

export default AnimationDivProvider