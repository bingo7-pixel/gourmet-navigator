import React, { useState } from 'react';
import { OrderStepper } from '@/components/OrderStepper';
import { MenuItem } from '@/components/MenuItem';
import { QuantityControl } from '@/components/QuantityControl';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { OrderSummary } from '@/components/OrderSummary';

const steps = ['Base', 'Protein', 'Toppings', 'Sauce', 'Review'];

interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

const menuItems: Item[] = [
  {
    id: 'white-rice',
    name: 'White Rice',
    description: 'Premium jasmine rice, perfectly steamed',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99',
    category: 'base',
    nutrition: { calories: 130, protein: 2.7, carbs: 28, fat: 0.3 }
  },
  {
    id: 'brown-rice',
    name: 'Brown Rice',
    description: 'Wholesome brown rice rich in fiber',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1539755530862-00f623c00f52',
    category: 'base',
    nutrition: { calories: 150, protein: 3.5, carbs: 32, fat: 1.2 }
  },
  {
    id: 'quinoa',
    name: 'Quinoa',
    description: 'Ancient grain packed with protein',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c',
    category: 'base',
    nutrition: { calories: 120, protein: 4.4, carbs: 21, fat: 1.9 }
  },
  {
    id: 'chicken',
    name: 'Grilled Chicken',
    description: 'Tender chicken breast marinated in herbs',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8',
    category: 'protein',
    nutrition: { calories: 165, protein: 31, carbs: 0, fat: 3.6 }
  },
  {
    id: 'beef',
    name: 'Teriyaki Beef',
    description: 'Premium sliced beef in house teriyaki sauce',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143',
    category: 'protein',
    nutrition: { calories: 250, protein: 26, carbs: 8, fat: 13 }
  },
  {
    id: 'tofu',
    name: 'Crispy Tofu',
    description: 'Organic tofu, crispy outside and silky inside',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1546069901-eacb567c5fdd',
    category: 'protein',
    nutrition: { calories: 120, protein: 12, carbs: 3.5, fat: 6 }
  },
  {
    id: 'avocado',
    name: 'Fresh Avocado',
    description: 'Ripe avocado slices',
    price: 2.00,
    image: 'https://images.unsplash.com/photo-1601039641847-7857b994d704',
    category: 'toppings',
    nutrition: { calories: 80, protein: 1, carbs: 4, fat: 7 }
  },
  {
    id: 'corn',
    name: 'Roasted Corn',
    description: 'Sweet corn kernels with light seasoning',
    price: 1.00,
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076',
    category: 'toppings',
    nutrition: { calories: 85, protein: 3, carbs: 19, fat: 1 }
  },
  {
    id: 'kimchi',
    name: 'Kimchi',
    description: 'Traditional Korean fermented vegetables',
    price: 1.50,
    image: 'https://images.unsplash.com/photo-1583224874284-0c50a21a2fb2',
    category: 'toppings',
    nutrition: { calories: 25, protein: 1, carbs: 4, fat: 0 }
  },
  {
    id: 'soy-sauce',
    name: 'Premium Soy Sauce',
    description: 'Aged Japanese soy sauce',
    price: 0.50,
    image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707',
    category: 'sauce',
    nutrition: { calories: 10, protein: 1, carbs: 1, fat: 0 }
  },
  {
    id: 'sesame',
    name: 'Sesame Dressing',
    description: 'Creamy sesame dressing',
    price: 0.75,
    image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc',
    category: 'sauce',
    nutrition: { calories: 90, protein: 1, carbs: 2, fat: 9 }
  },
  {
    id: 'sriracha',
    name: 'Sriracha Sauce',
    description: 'Spicy sriracha sauce',
    price: 0.50,
    image: 'https://images.unsplash.com/photo-1607098665874-fd193397547b',
    category: 'sauce',
    nutrition: { calories: 15, protein: 0, carbs: 3, fat: 0 }
  }
];

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [history, setHistory] = useState<Item[][]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const currentCategory = steps[currentStep].toLowerCase();
  const filteredItems = menuItems.filter(item => item.category === currentCategory);

  const handleItemSelect = (item: Item) => {
    const newSelectedItems = [...selectedItems];
    const existingIndex = newSelectedItems.findIndex(i => i.category === item.category);
    
    setHistory([...history, selectedItems]);
    
    if (existingIndex >= 0) {
      newSelectedItems[existingIndex] = item;
    } else {
      newSelectedItems.push(item);
    }
    
    setSelectedItems(newSelectedItems);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setSelectedItems(previousState);
      setHistory(history.slice(0, -1));
      toast({
        title: "Action undone",
        description: "Your last selection has been reversed.",
      });
    }
  };

  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => total + item.price, 0) * quantity;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <OrderStepper steps={steps} currentStep={currentStep} />
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleUndo}
              disabled={history.length === 0}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          <QuantityControl
            quantity={quantity}
            onIncrease={() => setQuantity(q => q + 1)}
            onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
          />
        </div>

        <div className="space-y-4">
          {currentStep === steps.length - 1 ? (
            <OrderSummary 
              selectedItems={selectedItems}
              quantity={quantity}
              calculateTotal={calculateTotal}
            />
          ) : (
            filteredItems.map((item) => (
              <MenuItem
                key={item.id}
                {...item}
                onClick={() => handleItemSelect(item)}
                selected={selectedItems.some(i => i.id === item.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;