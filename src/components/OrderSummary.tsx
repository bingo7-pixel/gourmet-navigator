import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { MenuItem } from './MenuItem';
import { NutritionInfo } from './NutritionInfo';

interface OrderSummaryProps {
  selectedItems: any[];
  quantity: number;
  calculateTotal: () => number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  selectedItems,
  quantity,
  calculateTotal,
}) => {
  const { toast } = useToast();

  const totalNutrition = {
    calories: selectedItems.reduce((sum, item) => sum + (item.nutrition?.calories || 0), 0) * quantity,
    protein: selectedItems.reduce((sum, item) => sum + (item.nutrition?.protein || 0), 0) * quantity,
    carbs: selectedItems.reduce((sum, item) => sum + (item.nutrition?.carbs || 0), 0) * quantity,
    fat: selectedItems.reduce((sum, item) => sum + (item.nutrition?.fat || 0), 0) * quantity,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-primary">Order Summary</h2>
      <div className="space-y-4">
        {selectedItems.map((item) => (
          <MenuItem key={item.id} {...item} onClick={() => {}} selected />
        ))}
      </div>
      <NutritionInfo nutrition={totalNutrition} />
      <div className="mt-6 p-6 bg-card rounded-lg border border-primary/20">
        <div className="flex justify-between text-lg font-semibold mb-4">
          <span>Total</span>
          <span className="text-primary">${calculateTotal().toFixed(2)}</span>
        </div>
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={() => toast({
            title: "Order placed!",
            description: "Your order has been successfully placed.",
          })}
        >
          Place Order
        </Button>
      </div>
    </motion.div>
  );
};