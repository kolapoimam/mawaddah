
import React from 'react';
import { cn } from '@/lib/utils';

interface MawaddahLogoProps {
  className?: string;
}

const MawaddahLogo: React.FC<MawaddahLogoProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-mawaddah-gold">
        <span className="text-mawaddah-dark text-xl font-bold">M</span>
      </div>
      <h1 className="ml-2 text-2xl font-montserrat font-bold text-primary dark:text-mawaddah-gold">
        Mawaddah
      </h1>
    </div>
  );
};

export default MawaddahLogo;
