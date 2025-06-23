"use client";

import Link from "next/link";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { CartItem } from "@/lib/context";
import { useCart } from "@/lib/hooks/use-cart";

import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetDescription,
} from "@/modules/shared/sheet";
import { Button } from "@/modules/shared/button";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, subtotal, removeFromCart, updateCartItem, itemCount } =
    useCart();
  const [updatingItems, setUpdatingItems] = useState<Record<string, boolean>>(
    {}
  );

  const handleQuantityChange = async (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > 99) return;
    if (updatingItems[item.id]) return;

    try {
      setUpdatingItems((prev) => ({ ...prev, [item.id]: true }));
      updateCartItem(item.id.toString(), newQuantity);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    } finally {
      setUpdatingItems((prev) => ({ ...prev, [item.id]: false }));
    }
  };

  const handleRemoveItem = async (item: CartItem) => {
    if (updatingItems[item.id]) return;

    try {
      setUpdatingItems((prev) => ({ ...prev, [item.id]: true }));
      removeFromCart(item.id.toString());
    } catch (error) {
      console.error("Failed to remove item:", error);
    } finally {
      setUpdatingItems((prev) => ({ ...prev, [item.id]: false }));
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full max-w-md p-0 flex flex-col bg-white mt-24 mr-24 rounded-lg shadow-lg"
        style={{
          top: "6rem",
          right: "6rem",
          position: "fixed",
          margin: 0,
          height: "60vh",
        }}
      >
        <SheetHeader className="px-4 py-4 border-b border-gray-200 text-left flex items-center justify-evenly">
          <div className="flex items-center">
            <SheetTitle className="flex items-center">
              Your Cart
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({itemCount} {itemCount === 1 ? "item" : "items"})
              </span>
            </SheetTitle>
          </div>
          {cart.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-gray-500 hover:text-red-600"
              onClick={() => cart.forEach((item) => removeFromCart(String(item.id)))}
            >
              Remove All
            </Button>
          )}
        </SheetHeader>

        <div className="flex-grow overflow-y-auto py-4 px-4">
          {itemCount === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Your cart is empty
              </h3>
              <p className="text-gray-500 mb-6">
                Looks like you haven't added any products yet.
              </p>
              <Button variant="default" onClick={onClose}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className={`py-5 flex items-center gap-4 ${
                    updatingItems[item.id]
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                >
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex-1 flex flex-row items-center justify-between">
                    <div className="flex flex-col justify-center">
                      <span className="font-medium text-gray-900">
                        {item.name}
                      </span>
                      <span className="text-gray-500">
                        ${item.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center bg-secondary-100">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleQuantityChange(item, item.quantity - 1)
                        }
                        className="hover:bg-secondary-100"
                        disabled={item.quantity <= 1 || updatingItems[item.id]}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleQuantityChange(item, item.quantity + 1)
                        }
                        className="hover:bg-secondary-100"
                        disabled={item.quantity >= 99 || updatingItems[item.id]}
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-gray-200 px-4 py-5 mt-auto">
            <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
              <p>Total</p>
              <p>${subtotal.toLocaleString()}</p>
            </div>
            <Button className="w-full mt-4">Checkout</Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
