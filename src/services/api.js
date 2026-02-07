// Configuración de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

// Opciones predeterminadas para las peticiones
const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
}

// Función auxiliar para obtener el token de autenticación
const getAuthToken = () => {
  return localStorage.getItem('authToken')
}

// Función auxiliar para manejar las respuestas
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Error de conexión' }))
    throw new Error(error.message || `Error: ${response.status}`)
  }
  return response.json()
}

// Servicio de API
const api = {
  // Petición GET
  get: async (endpoint) => {
    const token = getAuthToken()
    const options = {
      ...defaultOptions,
      method: 'GET',
      headers: {
        ...defaultOptions.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options)
    return handleResponse(response)
  },

  // Petición POST
  post: async (endpoint, data) => {
    const token = getAuthToken()
    const options = {
      ...defaultOptions,
      method: 'POST',
      headers: {
        ...defaultOptions.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    }
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options)
    return handleResponse(response)
  },

  // Petición PUT
  put: async (endpoint, data) => {
    const token = getAuthToken()
    const options = {
      ...defaultOptions,
      method: 'PUT',
      headers: {
        ...defaultOptions.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    }
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options)
    return handleResponse(response)
  },

  // Petición DELETE
  delete: async (endpoint) => {
    const token = getAuthToken()
    const options = {
      ...defaultOptions,
      method: 'DELETE',
      headers: {
        ...defaultOptions.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options)
    return handleResponse(response)
  },
}

export default api
export { API_BASE_URL, getAuthToken }
