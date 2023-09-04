import { create } from 'zustand';
import { Auth, LoginRequest } from '../types/common';
import { isAdmin, isUser } from '../constants/global';

interface AuthStore {
  auth: Auth;
  onLogin: (request: LoginRequest) => Promise<Auth>;
  onLogout: () => void;
}

const authInit: Auth = {
  loggedIn: false,
  role: 'user',
  userName: ''
};

const fetchAuth = () => {
  const authStorage = localStorage.getItem('auth') || null;
  return !authStorage ? authInit : JSON.parse(authStorage);
};

export const useAuthStore = create<AuthStore>((set) => ({
  auth: fetchAuth(),
  onLogin: async ({ userName }: LoginRequest) => {
    try {
      let response: Auth;

      if (userName === isAdmin) {
        response = {
          loggedIn: true,
          role: 'admin',
          userName: userName
        };
      } else if (userName === isUser) {
        response = {
          loggedIn: true,
          role: 'user',
          userName: userName
        };
      } else {
        response = {
          loggedIn: false,
          role: 'user',
          userName: userName
        };
      }

      set({
        auth: {
          loggedIn: response.loggedIn,
          role: response.role,
          userName: response.userName
        }
      });
      localStorage.setItem('auth', JSON.stringify(response));
      return response;
    } catch (error) {
      console.log('Error: ', error);
      throw error;
    }
  },
  onLogout: async () => {
    try {
      set({ auth: authInit });
      localStorage.removeItem('auth');
    } catch (error) {
      console.log('Error: ', error);
      throw error;
    }
  }
}));
