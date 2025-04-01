
import React from 'react';
import { cn } from '@/lib/utils';

interface MawaddahLogoProps {
  className?: string;
}

const MawaddahLogo: React.FC<MawaddahLogoProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-mawaddah-gold">
        <span className="text-mawaddah-dark text-xl font-arabic font-bold">م</span>
      </div>
      <h1 className="ml-2 text-2xl font-arabic font-bold text-primary dark:text-mawaddah-gold">
        مودة
        <span className="font-montserrat text-sm ml-2 font-normal text-muted-foreground">
          Mawaddah
        </span>
      </h1>
    </div>
  );
};

export default MawaddahLogo;
