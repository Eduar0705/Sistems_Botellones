import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import './styles/App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [user, setUser] = useState(null)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
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

  // Show login if not authenticated
  if (!user) {
    return (
      <>
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
        <Login onLogin={handleLogin} />
      </>
    )
  }

  return (
    <>
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
    </>
  )
}

export default App
