import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

type Role = 'admin' | 'manager' | 'viewer'

interface User {
  id: string
  name: string
  email: string
  role: Role
}

interface AuthContextValue {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string, remember?: boolean) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('access_token')
      const storedUser = localStorage.getItem('auth_user')
      if (storedToken && storedUser) {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
      }
    } catch {}
  }, [])

  const login = useCallback(async (email: string, _password: string, remember?: boolean) => {
    // Demo: accept any credentials
    const fakeToken = 'demo-token'
    const demoUser: User = { id: '1', name: 'Admin User', email, role: 'admin' }
    setUser(demoUser)
    setToken(fakeToken)
    try {
      if (remember) {
        localStorage.setItem('access_token', fakeToken)
        localStorage.setItem('auth_user', JSON.stringify(demoUser))
      } else {
        sessionStorage.setItem('access_token', fakeToken)
        sessionStorage.setItem('auth_user', JSON.stringify(demoUser))
      }
    } catch {}
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setToken(null)
    try {
      localStorage.removeItem('access_token');
      localStorage.removeItem('auth_user');
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('auth_user');
    } catch {}
  }, [])

  const value = useMemo<AuthContextValue>(() => ({
    user,
    token,
    isAuthenticated: !!token,
    login,
    logout,
  }), [user, token, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


