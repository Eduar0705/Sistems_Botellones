import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import './styles/App.css'

// Contenido principal de la aplicación (usa el contexto de autenticación)
function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentPage, setCurrentPage] = useState('dashboard')
  const { user, loginMock, logout, isAuthenticated } = useAuth()

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const handleLogin = (userData) => {
    // Usar login simulado por ahora - usará login real cuando el backend esté listo
    loginMock(userData)
  }

  const handleLogout = () => {
    logout()
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'clientes':
        return <div className="page-content"><h2>Gestión de Clientes</h2><p>Próximamente...</p></div>
      case 'botellones':
        return <div className="page-content"><h2>Inventario de Botellones</h2><p>Próximamente...</p></div>
      case 'entregas':
        return <div className="page-content"><h2>Control de Entregas</h2><p>Próximamente...</p></div>
      case 'rutas':
        return <div className="page-content"><h2>Gestión de Rutas</h2><p>Próximamente...</p></div>
      case 'reportes':
        return <div className="page-content"><h2>Reportes</h2><p>Próximamente...</p></div>
      default:
        return <Dashboard />
    }
  }

  // Mostrar login si no está autenticado
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="app">
      <Navbar toggleSidebar={toggleSidebar} user={user} onLogout={handleLogout} />
      <div className="app-container">
        <Sidebar 
          isOpen={sidebarOpen} 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <main className={`main-content ${sidebarOpen ? '' : 'expanded'}`}>
          {renderPage()}
        </main>
      </div>
    </div>
  )
}

// Aplicación raíz con proveedores de contexto
function App() {
  return (
    <AuthProvider>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#1e293b',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            borderRadius: '12px',
            padding: '16px 20px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <AppContent />
    </AuthProvider>
  )
}

export default App
