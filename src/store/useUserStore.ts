import {create} from 'zustand';
import {Session} from '@supabase/supabase-js';

type User = {
  id: string;
  email: string;
  nickname?: string;
  gender?: string;
  age?: number;
  location?: string;
  profileImageUrl?: string;
};

type State = {
  user: User | null;
  session: Session | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  setSession: (session: Session | null) => void;
};

export const useUserStore = create<State>(set => ({
  user: null,
  session: null,
  setUser: user => set({user}),
  clearUser: () => set({user: null, session: null}),
  setSession: session => set({session}),
}));
