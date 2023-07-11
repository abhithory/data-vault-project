"use client"
import React, { useRef, useState } from 'react'
import { FaCheck, FaCheckDouble, FaCopy } from 'react-icons/fa'

interface InputProps {
    className?: string,
    type?: string,
    value?: any,
    id?: string,
    placeholder?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    copy?:boolean,
    [index: string]:any,
}

function NormalInput({ type, className, value, id, placeholder, onChange, copy = false, ...extra}: InputProps) {
    const [copied, setCopied] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    function copyText(){
        if (!inputRef?.current?.value) return
        navigator.clipboard.writeText(inputRef?.current?.value)
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 3000);

    }
    return (
        <div className="relative flex w-full flex-wrap items-center">
            <input ref={inputRef} type={`${type ? type : "text"}`} id={id} placeholder={placeholder} className={`input_1 ${className}`} value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)} {...extra} />
            {copy&&
            <span className="z-10 h-full absolute right-4 flex_center">
                {copied ?
                <FaCheck className="text-primary" />
                :
                <FaCopy onClick={copyText} className="cursor-pointer" />
                }
            </span>
            }
        </div>
    )
}

export default NormalInput