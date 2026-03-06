import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', onClick }) => {
  const baseStyles = "inline-flex items-center justify-center w-full max-w-[252px] sm:w-[252px] h-[48px] sm:h-[52px] px-3 sm:px-2 uppercase tracking-wider font-bold text-xs sm:text-sm transition-all duration-300 overflow-hidden relative group";
  const variants = {
    primary: "bg-[#C4A24B] text-black hover:bg-[#b8923d]",
    outline: "border border-white text-white hover:bg-white hover:text-black",
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'outline' && (
        <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out z-0" />
      )}
    </button>
  );
};
