import {create} from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  user: {
    uid: string
    username: string
    first_name: string
    last_name: string
    email: string
    is_verified: boolean
  } | null
  setUser: (userData: UserState['user']) => void
  getUser: () => UserState['user'] | null
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,

      setUser: (userData) => set({ user: userData }),

      getUser: () => get().user,

      logout: () => set({ user: null }),
    }),
    {
      name: 'user-storage', // Key for localStorage
      partialize: (state) => ({ user: state.user }), // Only persist `user` data
    }
  )
)
