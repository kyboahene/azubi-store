"use client";

import { useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";

import { Button } from "@/modules/shared/button";

import { useCart } from "@/lib/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import type { CartItem as ICartItem } from "@/lib/context";

interface CartItemProps {
  item: ICartItem;
  editable?: boolean;
}

export function CartItem({ item, editable = true }: CartItemProps) {
  const { removeFromCart, updateCartItem } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > 99) return;
    if (isUpdating) return;
    setIsUpdating(true);
    updateCartItem(String(item.id), newQuantity);
    setIsUpdating(false);
  };

  const handleRemove = () => {
    if (isUpdating) return;
    setIsUpdating(true);
    removeFromCart(String(item.id));
    setIsUpdating(false);
  };

  const itemTotal = item.price * item.quantity;

  return (
    <div className={`flex gap-4 py-4 items-center ${isUpdating ? 'opacity-60' : ''}`}>
      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
        <img
          src={item.image || "https://placehold.co/200x200?text=No+Image"}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between h-full">
        <div className="flex flex-col">
          <span className="font-medium line-clamp-1">{item.name}</span>
          <span className="font-medium">{formatPrice(item.price)}</span>
        </div>
        <div className="flex items-center justify-between mt-2">
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
            <div className="text-sm text-muted-foreground">Qty: {item.quantity}</div>
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