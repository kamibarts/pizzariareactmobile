import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

type User = {
  username: string;
  password: string;
  name?: string;
  role?: 'user' | 'manager' | 'admin';
};

type AuthContextType = {
  user: User | null;
  signup: (username: string, password: string, name?: string) => Promise<boolean>;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  resetUsers: () => Promise<void>;
  users: User[];
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Try to load AsyncStorage dynamically; if missing, fallback to in-memory
let AsyncStorage: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch (e) {
  console.warn('AsyncStorage not available. Auth will be in-memory only. Install @react-native-async-storage/async-storage to persist users.');
}

const USERS_KEY = '@pizzaria_users';
const CURRENT_KEY = '@pizzaria_current_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const SEED_USERS: User[] = [
    { username: 'wellington@email.com', password: 'senha123', name: 'Wellington', role: 'user' },
    { username: 'wiill12@gmail.com', password: 'senha123', name: 'Wiill', role: 'manager' },
    { username: 'wiill@gmail.com', password: 'senha123', name: 'Wiill', role: 'manager' },
    { username: 'maria@gmail.com', password: 'senha123', name: 'Maria', role: 'manager' },
  ];

  useEffect(() => {
    (async () => {
      if (AsyncStorage) {
        try {
          const raw = await AsyncStorage.getItem(USERS_KEY);
          if (raw) {
            setUsers(JSON.parse(raw));
          } else {
            setUsers(SEED_USERS);
            try {
              await AsyncStorage.setItem(USERS_KEY, JSON.stringify(SEED_USERS));
            } catch (e) {
              console.error('Failed to persist seeded users', e);
            }
          }
          const cur = await AsyncStorage.getItem(CURRENT_KEY);
          if (cur) setUser(JSON.parse(cur));
        } catch (e) {
          console.error('Auth load error', e);
        }
      } else {
        // no AsyncStorage available, seed in memory so login works during this session
        setUsers(SEED_USERS);
      }
    })();
  }, []);

  async function resetUsers() {
    setUsers(SEED_USERS);
    if (AsyncStorage) {
      try {
        await AsyncStorage.setItem(USERS_KEY, JSON.stringify(SEED_USERS));
      } catch (e) {
        console.error('Failed to persist seeded users during reset', e);
      }
    }
  }
  async function persistUsers(newUsers: User[]) {
    setUsers(newUsers);
    if (AsyncStorage) {
      try {
        await AsyncStorage.setItem(USERS_KEY, JSON.stringify(newUsers));
      } catch (e) {
        console.error('Failed to persist users', e);
      }
    }
  }

  async function signup(username: string, password: string, name?: string) {
    if (!username || !password) return false;
    const norm = username.trim().toLowerCase();
    const exists = users.find(u => (u.username || '').trim().toLowerCase() === norm || ((u.username || '').split('@')[0] || '').trim().toLowerCase() === norm);
    if (exists) {
      Alert.alert('Usuário já existe', 'Escolha outro nome de usuário.');
      return false;
    }
    const newUser: User = { username, password, name, role: 'user' };
    const newUsers = [...users, newUser];
    await persistUsers(newUsers);
    // auto-login after signup
    await login(username, password);
    return true;
  }

  async function login(username: string, password: string) {
    if (!username || !password) {
      Alert.alert('Credenciais inválidas', 'Informe usuário e senha.');
      return false;
    }
    const norm = username.trim().toLowerCase();
    const pwd = password;
    const found = users.find(u => {
      const un = (u.username || '').trim().toLowerCase();
      const local = (u.username || '').split('@')[0].trim().toLowerCase();
      return (un === norm || local === norm) && u.password === pwd;
    });
    if (!found) {
      Alert.alert('Credenciais inválidas', 'Verifique usuário e senha.');
      return false;
    }
    setUser(found);
    if (AsyncStorage) {
      try {
        await AsyncStorage.setItem(CURRENT_KEY, JSON.stringify(found));
      } catch (e) {
        console.error('Failed to persist current user', e);
      }
    }
    return true;
  }

  function logout() {
    setUser(null);
    if (AsyncStorage) {
      try {
        AsyncStorage.removeItem(CURRENT_KEY);
      } catch (e) {
        console.error('Failed to remove current user', e);
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, resetUsers, users }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;
