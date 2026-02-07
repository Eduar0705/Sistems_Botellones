import { useState, useEffect } from 'react'
import { 
  FiDroplet, 
  FiUsers, 
  FiTruck, 
  FiClock, 
  FiPlus, 
  FiUserPlus, 
  FiPackage, 
  FiMapPin,
  FiArrowRight,
  FiRefreshCw
} from 'react-icons/fi'
import toast from 'react-hot-toast'
import { useApiWithFallback } from '../hooks/useApi'
import { dashboardService } from '../services/dataService'
import '../styles/Dashboard.css'

// Datos de respaldo cuando la API no está disponible
const FALLBACK_STATS = {
  botoellonesDisponibles: 347,
  clientesActivos: 128,
  entregasHoy: 24,
  pendientes: 8,
}

const FALLBACK_DELIVERIES = [
  { id: 1, cliente: 'Juan Pérez', cantidad: 5, direccion: 'Av. Principal #123', estado: 'Entregado' },
  { id: 2, cliente: 'María García', cantidad: 3, direccion: 'Calle 10 #45', estado: 'En camino' },
  { id: 3, cliente: 'Carlos López', cantidad: 10, direccion: 'Zona Industrial #78', estado: 'Pendiente' },
  { id: 4, cliente: 'Ana Martínez', cantidad: 2, direccion: 'Residencias Sol #12', estado: 'Entregado' },
]

function Dashboard() {
  // Usar API con respaldo para estadísticas
  const { 
    data: statsData, 
    loading: statsLoading, 
    isUsingFallback: statsFallback,
    refetch: refetchStats 
  } = useApiWithFallback(
    dashboardService.getStats, 
    FALLBACK_STATS
  )

  // Usar API con respaldo para entregas recientes
  const { 
    data: deliveriesData, 
    loading: deliveriesLoading, 
    isUsingFallback: deliveriesFallback,
    refetch: refetchDeliveries 
  } = useApiWithFallback(
    () => dashboardService.getEntregasRecientes(5), 
    FALLBACK_DELIVERIES
  )

  // Construir array de estadísticas desde los datos
  const stats = [
    { 
      title: 'Botellones Disponibles', 
      value: statsData?.botoellonesDisponibles?.toString() || '0', 
      icon: FiDroplet, 
      color: '#2563eb' 
    },
    { 
      title: 'Clientes Activos', 
      value: statsData?.clientesActivos?.toString() || '0', 
      icon: FiUsers, 
      color: '#059669' 
    },
    { 
      title: 'Entregas Hoy', 
      value: statsData?.entregasHoy?.toString() || '0', 
      icon: FiTruck, 
      color: '#d97706' 
    },
    { 
      title: 'Pendientes', 
      value: statsData?.pendientes?.toString() || '0', 
      icon: FiClock, 
      color: '#dc2626' 
    },
  ]

  const recentDeliveries = deliveriesData || FALLBACK_DELIVERIES

  // Función para obtener la clase CSS según el estado
  const getStatusClass = (estado) => {
    switch (estado) {
      case 'Entregado': return 'status-delivered'
      case 'En camino': return 'status-transit'
      case 'Pendiente': return 'status-pending'
      default: return ''
    }
  }

  // Manejar actualización de datos
  const handleRefresh = async () => {
    toast.loading('Actualizando datos...', { id: 'refresh' })
    try {
      await Promise.all([refetchStats(), refetchDeliveries()])
      toast.success('Datos actualizados', { id: 'refresh' })
    } catch (error) {
      toast.error('Error al actualizar', { id: 'refresh' })
    }
  }

  // Manejar acciones rápidas
  const handleQuickAction = (action) => {
    toast(`Función "${action}" próximamente disponible`, { icon: '🚧' })
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Bienvenido al sistema H2OManager</p>
        </div>
        <button 
          className="btn-refresh" 
          onClick={handleRefresh}
          disabled={statsLoading || deliveriesLoading}
        >
          <FiRefreshCw className={statsLoading ? 'spinning' : ''} />
          Actualizar
        </button>
      </div>

      {/* Aviso cuando se usan datos de respaldo */}
      {(statsFallback || deliveriesFallback) && (
        <div className="fallback-notice">
          <span>⚠️ Mostrando datos de ejemplo. Conecte el backend para datos reales.</span>
        </div>
      )}

      <div className="stats-grid">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <div 
              key={index} 
              className={`stat-card ${statsLoading ? 'loading' : ''}`} 
              style={{ '--accent-color': stat.color }}
            >
              <div className="stat-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
                <IconComponent />
              </div>
              <div className="stat-info">
                <h3>{statsLoading ? '...' : stat.value}</h3>
                <p>{stat.title}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="dashboard-content">
        <div className="card deliveries-card">
          <div className="card-header">
            <h2>Entregas Recientes</h2>
            <button className="btn-primary">
              Ver todas <FiArrowRight />
            </button>
          </div>
          <table className="deliveries-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Cantidad</th>
                <th>Dirección</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {deliveriesLoading ? (
                <tr>
                  <td colSpan="4" className="loading-cell">Cargando entregas...</td>
                </tr>
              ) : (
                recentDeliveries.map(delivery => (
                  <tr key={delivery.id}>
                    <td>{delivery.cliente}</td>
                    <td>{delivery.cantidad} botellones</td>
                    <td>{delivery.direccion}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(delivery.estado)}`}>
                        {delivery.estado}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="card quick-actions-card">
          <h2>Acciones Rápidas</h2>
          <div className="quick-actions">
            <button className="action-btn" onClick={() => handleQuickAction('Nueva Entrega')}>
              <FiPlus />
              <span>Nueva Entrega</span>
            </button>
            <button className="action-btn" onClick={() => handleQuickAction('Nuevo Cliente')}>
              <FiUserPlus />
              <span>Nuevo Cliente</span>
            </button>
            <button className="action-btn" onClick={() => handleQuickAction('Registrar Botellones')}>
              <FiPackage />
              <span>Registrar Botellones</span>
            </button>
            <button className="action-btn" onClick={() => handleQuickAction('Planificar Ruta')}>
              <FiMapPin />
              <span>Planificar Ruta</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
