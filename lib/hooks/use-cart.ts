import { useContext, useCallback } from 'react';
import { CartContext, CartItem } from '../context';

export function useCart() {
  const { state, dispatch } = useContext(CartContext);

  const openCart = useCallback(() => {
    dispatch({ type: 'OPEN_CART' });
  }, [dispatch]);

  const closeCart = useCallback(() => {
    dispatch({ type: 'CLOSE_CART' });
  }, [dispatch]);

  const addToCart = useCallback(
    (item: CartItem) => {
      dispatch({ type: 'ADD_TO_CART', payload: item });
    },
    [dispatch]
  );

  const updateCartItem = useCallback(
    (id: string, quantity: number, selectedOptions?: Record<string, string>) => {
      dispatch({
        type: 'UPDATE_CART_ITEM',
        payload: { id, quantity, selectedOptions },
      });
    },
    [dispatch]
  );

  const removeFromCart = useCallback(
    (id: string, selectedOptions?: Record<string, string>) => {
      dispatch({
        type: 'REMOVE_FROM_CART',
        payload: { id, selectedOptions },
      });
    },
    [dispatch]
  );

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, [dispatch]);

  return {
    cart: state.items,
    subtotal: state.subtotal,
    itemCount: state.items.reduce((count, item) => count + item.quantity, 0),
    isCartOpen: state.isOpen,
    openCart,
    closeCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
  };
}