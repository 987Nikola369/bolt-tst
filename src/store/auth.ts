import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../types';

interface AuthState {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  users: [
    {
      id: '1',
      username: 'demo_user',
      email: 'demo@example.com',
      password: 'password123',
      joinDate: new Date(),
      profilePicture: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150',
      bio: 'Professional football coach and founder of Rocket Football Academy.',
    },
    {
      id: '2',
      username: 'member1',
      email: 'member1@example.com',
      password: 'password123',
      joinDate: new Date(),
      profilePicture: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150',
      bio: 'Aspiring football player.',
    },
    {
      id: '3',
      username: 'member2',
      email: 'member2@example.com',
      password: 'password123',
      joinDate: new Date(),
      profilePicture: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150',
      bio: 'Young talent looking to improve skills.',
    },
  ],
  login: async (email: string, password: string) => {
    set((state) => {
      const foundUser = state.users.find(
        (u) => u.email === email && u.password === password
      );
      if (foundUser) {
        return { user: foundUser };
      } else {
        throw new Error('Invalid email or password');
      }
    });
  },
  register: async (username: string, email: string, password: string) => {
    // Simulate API call
    const newUser: User = {
      id: uuidv4(),
      username,
      email,
      password,
      joinDate: new Date(),
    };
    set((state) => ({ users: [...state.users, newUser] }));
  },
  resetPassword: async (email: string) => {
    // Simulate password reset logic
    console.log('Password reset requested for:', email);
  },
  updateUserProfile: async (data: Partial<User>) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    }));
  },
  logout: () => set({ user: null }),
}));
