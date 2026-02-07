import { FiMenu, FiSearch, FiBell, FiChevronDown, FiLogOut, FiUser } from 'react-icons/fi'
import { useState } from 'react'
import toast from 'react-hot-toast'
import '../styles/Navbar.css'

function Navbar({ toggleSidebar, user, onLogout }) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogout = () => {
    toast.success('Sesión cerrada correctamente')
    setTimeout(() => onLogout(), 500)
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <FiMenu />
        </button>
        <div className="logo">
          <img src="/Logo.webp" alt="H2OManager Logo" className="logo-img" />
          <span className="logo-text">H2OManager</span>
        </div>
      </div>
      <div className="navbar-right">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Buscar..." />
        </div>
        <div className="notifications">
          <FiBell />
          <span className="notif-badge">3</span>
        </div>
        <div className="user-profile" onClick={() => setShowUserMenu(!showUserMenu)}>
          <div className="avatar">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <span className="user-name">{user?.name || 'Usuario'}</span>
          <FiChevronDown className={`chevron ${showUserMenu ? 'open' : ''}`} />
          
          {showUserMenu && (
            <div className="user-menu">
              <div className="user-menu-item">
                <FiUser />
                <span>Mi Perfil</span>
              </div>
              <div className="user-menu-item logout" onClick={handleLogout}>
                <FiLogOut />
                <span>Cerrar Sesión</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
