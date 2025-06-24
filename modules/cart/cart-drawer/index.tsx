"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { CartItem } from "@/lib/context";
import { useCart } from "@/lib/hooks/use-cart";

import {
  Sheet,
  SheetContent,
} from "@/modules/shared/sheet";
import { Button } from "@/modules/shared/button";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const router = useRouter();
  const { cart, subtotal, removeFromCart, updateCartItem, itemCount } =
    useCart();
  const [updatingItems, setUpdatingItems] = useState<Record<string, boolean>>({});

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
        <div className="h-full flex flex-col bg-white rounded-lg shadow-xl z-50">
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                CART ({itemCount})
              </h3>
              <Button
                variant="ghost"
                onClick={() =>
                  cart.forEach((item) => removeFromCart(String(item.id)))
                }
                className="text-gray-500 hover:text-gray-700 text-sm underline"
              >
                Remove all
              </Button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-500 text-center py-4">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6 flex-1 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-gray-600">
                          $ {item.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(item, item.quantity - 1)
                          }
                          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item, item.quantity + 1)
                          }
                          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">TOTAL</span>
                  <span className="font-bold text-lg">
                    $ {subtotal.toLocaleString()}
                  </span>
                </div>

                <Button className="w-full" onClick={() => {
                  onClose();
                  router.push("/checkout");
                }}>
                  Checkout
                </Button>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
