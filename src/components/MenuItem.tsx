import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface MenuItemProps {
  image: string;
  name: string;
  description: string;
  price: number;
  onClick: () => void;
  selected?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  image,
  name,
  description,
  price,
  onClick,
  selected,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={cn(
        'menu-card cursor-pointer',
        selected && 'border-primary bg-primary/10'
      )}
    >
      <div className="flex items-center gap-4">
        <div className="relative overflow-hidden rounded-lg">
          <img 
            src={image} 
            alt={name} 
            className="menu-image object-cover transition-transform duration-300 hover:scale-110" 
          />
          {selected && (
            <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-sm font-semibold text-primary-foreground">Selected</span>
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-primary">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="text-lg font-semibold text-primary">${price.toFixed(2)}</div>
      </div>
    </motion.div>
  );
};