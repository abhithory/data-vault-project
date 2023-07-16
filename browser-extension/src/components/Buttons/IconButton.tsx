import React from 'react'

interface IProps {
    icon: JSX.Element;
    onClick?: () => void;
    className?: string;
}
function IconButton({ className,onClick, icon }: IProps) {
  return (
    <button onClick={onClick} className={`${className}`}>
        {icon}
</button>
  )
}

export default IconButton