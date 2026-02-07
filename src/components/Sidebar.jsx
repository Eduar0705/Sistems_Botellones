import { 
  FiHome, 
  FiUsers, 
  FiPackage, 
  FiTruck, 
  FiMap, 
  FiBarChart2, 
  FiSettings, 
  FiLogOut 
} from 'react-icons/fi'
import '../styles/Sidebar.css'

function Sidebar({ isOpen, currentPage, setCurrentPage }) {
  const menuItems = [
    { id: 'dashboard', icon: FiHome, label: 'Dashboard' },
    { id: 'clientes', icon: FiUsers, label: 'Clientes' },
    { id: 'botellones', icon: FiPackage, label: 'Botellones' },
    { id: 'entregas', icon: FiTruck, label: 'Entregas' },
    { id: 'rutas', icon: FiMap, label: 'Rutas' },
    { id: 'reportes', icon: FiBarChart2, label: 'Reportes' },
  ]

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <ul className="menu-list">
        {menuItems.map(item => {
          const IconComponent = item.icon
          return (
            <li 
              key={item.id}
              className={`menu-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => setCurrentPage(item.id)}
              title={!isOpen ? item.label : ''}
            >
              <IconComponent className="menu-icon" />
              <span className="menu-label">{item.label}</span>
            </li>
          )
        })}
      </ul>
      <div className="sidebar-footer">
        <div className="menu-item" title={!isOpen ? 'Configuración' : ''}>
          <FiSettings className="menu-icon" />
          <span className="menu-label">Configuración</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
