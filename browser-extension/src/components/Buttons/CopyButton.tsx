"use client"
import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCopy, FaCopyright, FaRegCopy } from 'react-icons/fa';


function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };
    return (
        <CopyToClipboard text={text} onCopy={handleCopy}>
            {copied ? 
            <span className='flex items-center gap-2 text-primary'> <FaCopy /> Copied!</span>
                :
                <span className='flex items-center gap-2 text-text-color  cursor-pointer'><FaRegCopy />Copy</span>
            }

        </CopyToClipboard>
    )
}

export default CopyButton