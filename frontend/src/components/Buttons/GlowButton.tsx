import React from 'react'

interface IProps {
    className?: string;
    text: string;
    onClick?: () => void;
}
function GlowButton({ className, text, onClick }: IProps) {
    return (
        <div className={`buttonNeon ${className}`}
            onClick={onClick}
        >
            <div> <span></span>
                <span></span>
                <span></span>
                <span></span>
                {text}
            </div>
        </div>

    )
}

export default GlowButton