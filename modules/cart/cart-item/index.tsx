"use client";

import Link from "next/link";
import { useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";

import { Button } from "@/modules/shared/button";

import type { CartItem } from "@/lib/types";
import { useCart } from "@/lib/hooks/use-cart";
import { formatPrice } from "@/lib/utils";

interface CartItemProps {
  item: CartItem;
  editable?: boolean;
}

export function CartItem({ item, editable = true }: CartItemProps) {
  const { removeFromCart, updateCartItem } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > 99) return;
    if (isUpdating) return;
    
    setIsUpdating(true);
    updateCartItem(item.id, newQuantity);
    setIsUpdating(false);
  };
  
  const handleRemove = () => {
    if (isUpdating) return;
    setIsUpdating(true);
    removeFromCart(item.id);
    setIsUpdating(false);
  };
  
  const itemTotal = item.price * item.quantity;
  const image = Array.isArray(item.image) ? item.image[0] : item.image;
  
  return (
    <div className={`flex gap-4 py-4 ${isUpdating ? 'opacity-60' : ''}`}>
      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
        <Link href={`/product/${item.id}`}>
          <img 
            src={image || "https://placehold.co/200x200?text=No+Image"} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between">
          <Link 
            href={`/product/${item.id}`}
            className="font-medium hover:underline line-clamp-1"
          >
            {item.name}
          </Link>
          
          <span className="font-medium">
            {formatPrice(itemTotal)}
          </span>
        </div>
        
        {item.variantId && (
          <p className="text-sm text-muted-foreground mt-1">
            {Object.entries(item.selectedOptions || {})
              .map(([key, value]) => `${key}: ${value}`)
              .join(", ")}
          </p>
        )}
        
        <div className="flex items-center justify-between mt-auto">
          {editable ? (
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-r-none"
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={item.quantity <= 1 || isUpdating}
              >
                <Minus size={14} />
                <span className="sr-only">Decrease quantity</span>
              </Button>
              
              <div className="h-8 px-3 flex items-center justify-center border-y border-input">
                {item.quantity}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-l-none"
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={item.quantity >= 99 || isUpdating}
              >
                <Plus size={14} />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Qty: {item.quantity}
            </div>
          )}
          
          {editable && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-muted-foreground hover:text-destructive"
              onClick={handleRemove}
              disabled={isUpdating}
            >
              <Trash2 size={16} />
              <span className="sr-only">Remove item</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}