import React, { useState } from 'react';
import { OrderStepper } from '@/components/OrderStepper';
import { MenuItem } from '@/components/MenuItem';
import { QuantityControl } from '@/components/QuantityControl';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const steps = ['Base', 'Protein', 'Toppings', 'Sauce', 'Review'];

interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const menuItems: Item[] = [
  {
    id: 'white-rice',
    name: 'White Rice',
    description: 'Steamed jasmine rice',
    price: 3.00,
    image: '/lovable-uploads/f962e799-77e9-4d38-a6f1-9901fbc26ce2.png',
    category: 'base'
  },
  {
    id: 'chicken',
    name: 'Grilled Chicken',
    description: 'Herb-marinated chicken breast',
    price: 4.50,
    image: '/lovable-uploads/299527cc-f7e5-4ff6-a27f-c790af21ee31.png',
    category: 'protein'
  },
  // Add more items here...
];

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [history, setHistory] = useState<Item[][]>([]);
  const { toast } = useToast();

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
              disabled={currentStep === 0}
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
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary">Order Summary</h2>
              {selectedItems.map((item) => (
                <MenuItem
                  key={item.id}
                  {...item}
                  onClick={() => {}}
                  selected
                />
              ))}
              <div className="mt-6 p-4 bg-card rounded-lg">
                <div className="flex justify-between text-lg font-semibold mb-4">
                  <span>Total</span>
                  <span className="text-primary">${calculateTotal().toFixed(2)}</span>
                </div>
                <Button className="w-full" onClick={() => toast({
                  title: "Order placed!",
                  description: "Your order has been successfully placed.",
                })}>
                  Place Order
                </Button>
              </div>
            </div>
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