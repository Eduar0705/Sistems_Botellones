import '../styles/Dashboard.css'
import { 
  FiDroplet, 
  FiUsers, 
  FiTruck, 
  FiClock, 
  FiPlus, 
  FiUserPlus, 
  FiPackage, 
  FiMapPin,
  FiArrowRight
} from 'react-icons/fi'

function Dashboard() {
  const stats = [
    { title: 'Botellones Disponibles', value: '347', icon: FiDroplet, color: '#2563eb' },
    { title: 'Clientes Activos', value: '128', icon: FiUsers, color: '#059669' },
    { title: 'Entregas Hoy', value: '24', icon: FiTruck, color: '#d97706' },
    { title: 'Pendientes', value: '8', icon: FiClock, color: '#dc2626' },
  ]

  const recentDeliveries = [
    { id: 1, cliente: 'Juan Pérez', cantidad: 5, direccion: 'Av. Principal #123', estado: 'Entregado' },
    { id: 2, cliente: 'María García', cantidad: 3, direccion: 'Calle 10 #45', estado: 'En camino' },
    { id: 3, cliente: 'Carlos López', cantidad: 10, direccion: 'Zona Industrial #78', estado: 'Pendiente' },
    { id: 4, cliente: 'Ana Martínez', cantidad: 2, direccion: 'Residencias Sol #12', estado: 'Entregado' },
  ]

  const getStatusClass = (estado) => {
    switch (estado) {
      case 'Entregado': return 'status-delivered'
      case 'En camino': return 'status-transit'
      case 'Pendiente': return 'status-pending'
      default: return ''
    }
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Bienvenido al sistema H2OManager</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <div key={index} className="stat-card" style={{ '--accent-color': stat.color }}>
              <div className="stat-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
                <IconComponent />
              </div>
              <div className="stat-info">
                <h3>{stat.value}</h3>
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
              {recentDeliveries.map(delivery => (
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
              ))}
            </tbody>
          </table>
        </div>

        <div className="card quick-actions-card">
          <h2>Acciones Rápidas</h2>
          <div className="quick-actions">
            <button className="action-btn">
              <FiPlus />
              <span>Nueva Entrega</span>
            </button>
            <button className="action-btn">
              <FiUserPlus />
              <span>Nuevo Cliente</span>
            </button>
            <button className="action-btn">
              <FiPackage />
              <span>Registrar Botellones</span>
            </button>
            <button className="action-btn">
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
