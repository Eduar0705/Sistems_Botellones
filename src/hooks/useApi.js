import { useState, useEffect, useCallback } from 'react'

/**
 * Hook personalizado para llamadas a la API con estados de carga y error
 * @param {Function} apiFunction - La función de API a llamar
 * @param {Array} dependencies - Dependencias para disparar la recarga
 * @param {boolean} immediate - Si debe ejecutarse inmediatamente al montar
 */
export function useApi(apiFunction, dependencies = [], immediate = true) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState(null)

  const execute = useCallback(async (...params) => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiFunction(...params)
      setData(result)
      return result
    } catch (err) {
      setError(err.message || 'Error al cargar datos')
      throw err
    } finally {
      setLoading(false)
    }
  }, [apiFunction])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [...dependencies, immediate])

  const refetch = useCallback(() => {
    return execute()
  }, [execute])

  return { data, loading, error, execute, refetch }
}

/**
 * Hook para llamadas a la API con datos de respaldo
 * Perfecto para desarrollo cuando el backend no está listo
 */
export function useApiWithFallback(apiFunction, fallbackData, dependencies = []) {
  const [data, setData] = useState(fallbackData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isUsingFallback, setIsUsingFallback] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiFunction()
      setData(result)
      setIsUsingFallback(false)
    } catch (err) {
      console.warn('API no disponible, usando datos de respaldo:', err.message)
      setData(fallbackData)
      setIsUsingFallback(true)
      // No establecemos error - estamos usando respaldo de manera elegante
    } finally {
      setLoading(false)
    }
  }, [apiFunction, fallbackData])

  useEffect(() => {
    fetchData()
  }, dependencies)

  return { data, loading, error, isUsingFallback, refetch: fetchData }
}

/**
 * Hook para mutaciones (POST, PUT, DELETE)
 */
export function useMutation(mutationFunction) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const mutate = useCallback(async (...params) => {
    try {
      setLoading(true)
      setError(null)
      const result = await mutationFunction(...params)
      setData(result)
      return result
    } catch (err) {
      setError(err.message || 'Error en la operación')
      throw err
    } finally {
      setLoading(false)
    }
  }, [mutationFunction])

  const reset = useCallback(() => {
    setData(null)
    setError(null)
  }, [])

  return { mutate, loading, error, data, reset }
}

export default useApi
