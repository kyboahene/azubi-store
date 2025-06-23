"use client";

import { createContext, useReducer, ReactNode, useEffect } from 'react';

// Cart item type
export type CartItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

// Cart state type
interface CartState {
  items: CartItem[];
  subtotal: number;
  isOpen: boolean;
}

// Cart actions
type CartAction =
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'UPDATE_CART_ITEM'; payload: { id: string; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { id: string } }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
  subtotal: 0,
  isOpen: false,
};

// Calculate cart subtotal
const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};

// Restore cart from localStorage on app initialization
const loadInitialState = (): CartState => {
  if (typeof window === 'undefined') return initialState;
  
  try {
    const savedCart = localStorage.getItem('cart');
    
    return savedCart
      ? { ...initialState, ...JSON.parse(savedCart), isOpen: false }
      : initialState;
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return initialState;
  }
};

// Reducer to handle state updates
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'OPEN_CART':
      return { ...state, isOpen: true };

    case 'CLOSE_CART':
      return { ...state, isOpen: false };

    case 'ADD_TO_CART': {
      const { items } = state;
      const newItem = action.payload;
      
      // Check if item already exists in cart
      const existingItemIndex = items.findIndex(
        (item) => item.id === newItem.id
      );
      
      let updatedItems;
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        updatedItems = items.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: item.quantity + (newItem.quantity || 1),
            };
          }
          return item;
        });
      } else {
        // Add new item to cart
        updatedItems = [...items, { ...newItem, quantity: newItem.quantity || 1 }];
      }
      
      return {
        ...state,
        items: updatedItems,
        subtotal: calculateSubtotal(updatedItems),
      };
    }

    case 'UPDATE_CART_ITEM': {
      const { id, quantity } = action.payload;
      const updatedItems = state.items.map(item => {
        if (item.id === Number(id)) {
          return { ...item, quantity };
        }
        return item;
      });
      return {
        ...state,
        items: updatedItems,
        subtotal: calculateSubtotal(updatedItems),
      };
    }

    case 'REMOVE_FROM_CART': {
      const { id } = action.payload;
      const updatedItems = state.items.filter(item => item.id !== Number(id));
      return {
        ...state,
        items: updatedItems,
        subtotal: calculateSubtotal(updatedItems),
      };
    }

    case 'CLEAR_CART':
      return { ...state, items: [], subtotal: 0 };

    default:
      return state;
  }
};

// Create context
export const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, loadInitialState);

  // Save cart to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem(
        'cart',
        JSON.stringify({ items: state.items, subtotal: state.subtotal })
      );
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [state.items, state.subtotal]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};