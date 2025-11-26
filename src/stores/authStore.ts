import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface Address {
  id: string;
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  addresses: Address[];
  
  // Auth actions
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  
  // Address actions
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

// Simulated user database (in a real app, this would be a backend API)
const users: Record<string, { password: string; user: User }> = {};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      addresses: [],

      login: async (email: string, password: string) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const userRecord = users[email.toLowerCase()];
        
        if (userRecord && userRecord.password === password) {
          set({ 
            user: userRecord.user, 
            isAuthenticated: true 
          });
          return true;
        }
        
        return false;
      },

      signup: async (name: string, email: string, password: string) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const emailLower = email.toLowerCase();
        
        // Check if user already exists
        if (users[emailLower]) {
          return false;
        }
        
        // Create new user
        const newUser: User = {
          id: `user_${Date.now()}`,
          email: emailLower,
          name: name,
          createdAt: new Date().toISOString(),
        };
        
        users[emailLower] = {
          password,
          user: newUser,
        };
        
        set({ 
          user: newUser, 
          isAuthenticated: true 
        });
        
        return true;
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false,
          addresses: [] 
        });
      },

      updateProfile: (data: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...data };
          set({ user: updatedUser });
          
          // Update in "database"
          const userRecord = users[currentUser.email];
          if (userRecord) {
            userRecord.user = updatedUser;
          }
        }
      },

      addAddress: (address: Omit<Address, 'id'>) => {
        const newAddress: Address = {
          ...address,
          id: `addr_${Date.now()}`,
        };
        
        const currentAddresses = get().addresses;
        
        // If this is the first address, make it default
        if (currentAddresses.length === 0) {
          newAddress.isDefault = true;
        }
        
        // If setting as default, remove default from others
        if (newAddress.isDefault) {
          currentAddresses.forEach(addr => addr.isDefault = false);
        }
        
        set({ addresses: [...currentAddresses, newAddress] });
      },

      updateAddress: (id: string, addressData: Partial<Address>) => {
        const addresses = get().addresses.map(addr => 
          addr.id === id ? { ...addr, ...addressData } : addr
        );
        
        // If setting as default, remove default from others
        if (addressData.isDefault) {
          addresses.forEach(addr => {
            if (addr.id !== id) addr.isDefault = false;
          });
        }
        
        set({ addresses });
      },

      deleteAddress: (id: string) => {
        const addresses = get().addresses.filter(addr => addr.id !== id);
        
        // If deleted address was default and there are other addresses, make first one default
        const hadDefault = get().addresses.find(a => a.id === id)?.isDefault;
        if (hadDefault && addresses.length > 0) {
          addresses[0].isDefault = true;
        }
        
        set({ addresses });
      },

      setDefaultAddress: (id: string) => {
        const addresses = get().addresses.map(addr => ({
          ...addr,
          isDefault: addr.id === id,
        }));
        set({ addresses });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
