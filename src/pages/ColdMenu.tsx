import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ColdMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-primary mb-6">Our Menu Categories</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card 
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => navigate('/hot-food')}
          >
            <CardHeader>
              <CardTitle>Hot Food Menu</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Discover our selection of freshly prepared hot dishes
              </p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => navigate('/cold-food')}
          >
            <CardHeader>
              <CardTitle>Cold Food Menu</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Explore our refreshing cold dishes and salads
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ColdMenu;