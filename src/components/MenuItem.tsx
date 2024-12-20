import React from 'react';
import { cn } from '@/lib/utils';

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
    <div
      onClick={onClick}
      className={cn(
        'menu-card cursor-pointer',
        selected && 'border-primary bg-primary/10'
      )}
    >
      <div className="flex items-center gap-4">
        <img src={image} alt={name} className="menu-image" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-primary">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="text-lg font-semibold text-primary">${price.toFixed(2)}</div>
      </div>
    </div>
  );
};