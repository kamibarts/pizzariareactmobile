import React, { createContext, useContext, useState } from 'react';

type CartItem = {
  nome?: string | null;
  descricao?: string | null;
  preco?: number | string | null;
  imagem?: string | null;
  quantity?: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem, quantity?: number) => void;
  removeItem: (index: number) => void;
  changeQuantity: (index: number, delta: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  function addItem(item: CartItem, quantity: number = 1) {
    setItems(prev => {
      // try to find existing by name
      const idx = prev.findIndex(p => String(p.nome) === String(item.nome));
      if (idx >= 0) {
        const copy = [...prev];
        const current = Number(copy[idx].quantity ?? 1);
        copy[idx] = { ...copy[idx], quantity: current + quantity };
        return copy;
      }
      return [...prev, { ...item, quantity }];
    });
  }

  function removeItem(index: number) {
    setItems(prev => prev.filter((_, i) => i !== index));
  }

  function changeQuantity(index: number, delta: number) {
    setItems(prev => {
      const copy = [...prev];
      const target = copy[index];
      if (!target) return prev;
      const current = Number(target.quantity ?? 1);
      const next = current + delta;
      if (next <= 0) {
        return copy.filter((_, i) => i !== index);
      }
      copy[index] = { ...target, quantity: next };
      return copy;
    });
  }

  function clear() {
    setItems([]);
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, changeQuantity, clear }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export type { CartItem };

