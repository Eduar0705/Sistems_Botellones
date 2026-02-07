import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import authService from '../services/authService'

// Crear el Contexto de Autenticación
const AuthContext = createContext(null)

// Componente Proveedor de Autenticación
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Verificar sesión existente al montar el componente
  useEffect(() => {
    const storedUser = authService.getCurrentUser()
    if (storedUser && authService.isAuthenticated()) {
      setUser(storedUser)
    }
    setLoading(false)
  }, [])

  // Función de inicio de sesión
  const login = useCallback(async (email, password) => {
    try {
      setError(null)
      setLoading(true)
      const response = await authService.login(email, password)
      setUser(response.user)
      return response
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Inicio de sesión simulado (para desarrollo)
  const loginMock = useCallback((userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }, [])

  // Función de cierre de sesión
  const logout = useCallback(() => {
    authService.logout()
    setUser(null)
    setError(null)
  }, [])

  // Verificar si está autenticado
  const isAuthenticated = !!user

  const value = {
    user,
    loading,
    error,
    login,
    loginMock,
    logout,
    isAuthenticated,
    setError,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado para usar el contexto de autenticación
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}

export default AuthContext
