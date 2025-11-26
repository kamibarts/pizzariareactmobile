import React, { createContext, useContext, useEffect, useState } from 'react';
import api from './api';

// Dynamic AsyncStorage import (optional)
let AsyncStorage: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch (e) {
  console.warn('AsyncStorage not available. Pizza edits will be in-memory only. Install @react-native-async-storage/async-storage to persist edits.');
}

type Pizza = {
  nome: string | null;
  descricao: string | null;
  preco: number | null;
  imagem?: string | null;
};

type PizzaContextType = {
  pizzas: Pizza[];
  loading: boolean;
  updatePizza: (originalName: string | null, p: Pizza) => Promise<void>;
};

const PizzaContext = createContext<PizzaContextType | undefined>(undefined);

const OVERRIDES_KEY = '@pizzaria_pizza_overrides';

export function PizzaProvider({ children }: { children: React.ReactNode }) {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(api.url + api.pizzas);
        const data = await resp.json();
        // normalize prices to numbers
        const base: Pizza[] = (data || []).map((it: any) => ({
          nome: it.nome ?? null,
          descricao: it.descricao ?? null,
          preco: it.preco != null ? Number(it.preco) : null,
          imagem: it.imagem ?? null,
        }));

        // apply overrides if present
        let overrides: Record<string, Pizza> = {};
        if (AsyncStorage) {
          try {
            const raw = await AsyncStorage.getItem(OVERRIDES_KEY);
            if (raw) overrides = JSON.parse(raw);
          } catch (e) {
            console.error('Failed to load pizza overrides', e);
          }
        }

        const merged = base.map(b => {
          if (!b.nome) return b;
          const o = overrides[b.nome];
          return o ? { ...b, ...o } : b;
        });

        setPizzas(merged);
      } catch (e) {
        console.error('Failed to fetch pizzas', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function updatePizza(originalName: string | null, p: Pizza) {
    setPizzas(prev => prev.map(x => (x.nome === originalName ? { ...x, ...p } : x)));
    if (AsyncStorage) {
      try {
        const raw = await AsyncStorage.getItem(OVERRIDES_KEY);
        const overrides = raw ? JSON.parse(raw) : {};
        // remove old key if name changed
        if (originalName && originalName !== p.nome && overrides[originalName]) {
          delete overrides[originalName];
        }
        if (p.nome) overrides[p.nome] = p;
        await AsyncStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));
      } catch (e) {
        console.error('Failed to persist pizza override', e);
      }
    }
  }

  return (
    <PizzaContext.Provider value={{ pizzas, loading, updatePizza }}>
      {children}
    </PizzaContext.Provider>
  );
}

export function usePizza() {
  const ctx = useContext(PizzaContext);
  if (!ctx) throw new Error('usePizza must be used within PizzaProvider');
  return ctx;
}

export default PizzaContext;
