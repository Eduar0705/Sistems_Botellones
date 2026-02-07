import api from './api'

// Servicio de Autenticación - Manejo de inicio y cierre de sesión
const authService = {
  // Iniciar sesión
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      if (response.token) {
        localStorage.setItem('authToken', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
      }
      return response
    } catch (error) {
      throw error
    }
  },

  // Cerrar sesión
  logout: () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  },

  // Obtener usuario actual desde localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken')
  },

  // Registrar nuevo usuario
  register: async (userData) => {
    return api.post('/auth/register', userData)
  },

  // Solicitar restablecimiento de contraseña
  forgotPassword: async (email) => {
    return api.post('/auth/forgot-password', { email })
  },

  // Restablecer contraseña
  resetPassword: async (token, newPassword) => {
    return api.post('/auth/reset-password', { token, newPassword })
  },
}

export default authService
