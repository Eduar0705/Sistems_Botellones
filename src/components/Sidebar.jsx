import { useState } from 'react'
import { 
  FiHome, 
  FiUsers, 
  FiPackage, 
  FiTruck, 
  FiMap, 
  FiBarChart2, 
  FiSettings,
  FiShoppingCart,
  FiUserCheck,
  FiTool,
  FiChevronDown,
  FiChevronRight,
  FiUser,
  FiDollarSign,
  FiLock,
  FiDroplet
} from 'react-icons/fi'
import '../styles/Sidebar.css'

function Sidebar({ isOpen, currentPage, setCurrentPage }) {
  const [configOpen, setConfigOpen] = useState(false)

  // Items principales del menú
  const menuItems = [
    { id: 'dashboard', icon: FiHome, label: 'Dashboard' },
    { id: 'clientes', icon: FiUsers, label: 'Clientes' },
    { id: 'botellones', icon: FiPackage, label: 'Botellones' },
    { id: 'entregas', icon: FiTruck, label: 'Entregas' },
    { id: 'ventas', icon: FiShoppingCart, label: 'Ventas' },
    { id: 'proveedores', icon: FiUserCheck, label: 'Proveedores' },
    { id: 'servicios', icon: FiTool, label: 'Servicios' },
    { id: 'rutas', icon: FiMap, label: 'Rutas' },
    { id: 'reportes', icon: FiBarChart2, label: 'Reportes' },
  ]

  // Submenú de configuración
  const configSubItems = [
    { id: 'config-usuarios', icon: FiUser, label: 'Usuarios' },
    { id: 'config-moneda', icon: FiDollarSign, label: 'Moneda' },
    { id: 'config-clave', icon: FiLock, label: 'Cambiar Clave' },
    { id: 'config-precios', icon: FiDroplet, label: 'Precios por Litro' },
    { id: 'config-general', icon: FiSettings, label: 'General' },
  ]

  // Verificar si la página actual es de configuración
  const isConfigPage = currentPage.startsWith('config-')

  const handleConfigClick = () => {
    if (!isOpen) {
      // Si el sidebar está colapsado, abrir configuración general
      setCurrentPage('config-general')
    } else {
      setConfigOpen(!configOpen)
    }
  }

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

      {/* Sección de Configuración con submenú */}
      <div className="sidebar-footer">
        <div 
          className={`menu-item config-toggle ${isConfigPage ? 'active' : ''}`}
          onClick={handleConfigClick}
          title={!isOpen ? 'Configuración' : ''}
        >
          <FiSettings className="menu-icon" />
          <span className="menu-label">Configuración</span>
          {isOpen && (
            <span className={`submenu-arrow ${configOpen ? 'open' : ''}`}>
              {configOpen ? <FiChevronDown /> : <FiChevronRight />}
            </span>
          )}
        </div>

        {/* Submenú de configuración */}
        {isOpen && configOpen && (
          <ul className="submenu">
            {configSubItems.map(item => {
              const IconComponent = item.icon
              return (
                <li 
                  key={item.id}
                  className={`submenu-item ${currentPage === item.id ? 'active' : ''}`}
                  onClick={() => setCurrentPage(item.id)}
                >
                  <IconComponent className="submenu-icon" />
                  <span className="submenu-label">{item.label}</span>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
