import React from 'react';
import { motion } from 'framer-motion';

interface NutritionProps {
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export const NutritionInfo: React.FC<NutritionProps> = ({ nutrition }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-card/50 rounded-lg border border-primary/20"
    >
      <div className="text-center p-2">
        <div className="text-sm text-muted-foreground">Calories</div>
        <div className="text-lg font-semibold text-primary">{nutrition.calories}</div>
      </div>
      <div className="text-center p-2">
        <div className="text-sm text-muted-foreground">Protein</div>
        <div className="text-lg font-semibold text-primary">{nutrition.protein}g</div>
      </div>
      <div className="text-center p-2">
        <div className="text-sm text-muted-foreground">Carbs</div>
        <div className="text-lg font-semibold text-primary">{nutrition.carbs}g</div>
      </div>
      <div className="text-center p-2">
        <div className="text-sm text-muted-foreground">Fat</div>
        <div className="text-lg font-semibold text-primary">{nutrition.fat}g</div>
      </div>
    </motion.div>
  );
};