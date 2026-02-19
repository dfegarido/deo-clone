import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', onClick }) => {
  const baseStyles = "px-8 py-4 uppercase tracking-wider font-bold text-sm transition-all duration-300 overflow-hidden relative group";
  const variants = {
    primary: "bg-white text-black hover:bg-neutral-200",
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