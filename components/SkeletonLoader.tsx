
import React from 'react';

interface Props {
  className?: string;
  variant?: 'rect' | 'circle' | 'text';
}

const SkeletonLoader: React.FC<Props> = ({ className = '', variant = 'rect' }) => {
  const baseClasses = "animate-pulse bg-slate-800/50";
  const radius = variant === 'circle' ? 'rounded-full' : variant === 'text' ? 'rounded' : 'rounded-2xl';
  
  return (
    <div className={`${baseClasses} ${radius} ${className}`} />
  );
};

export default SkeletonLoader;
