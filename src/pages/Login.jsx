import { useState } from 'react'
import { 
  FiMail, 
  FiLock, 
  FiEye, 
  FiEyeOff,
  FiCheck,
  FiTruck,
  FiUsers,
  FiBarChart2,
  FiShield,
  FiArrowRight
} from 'react-icons/fi'
import toast from 'react-hot-toast'
import '../styles/Login.css'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('Por favor completa todos los campos', {
        icon: '⚠️'
      })
      return
    }

    if (!email.includes('@')) {
      toast.error('Por favor ingresa un correo válido', {
        icon: '📧'
      })
      return
    }

    if (password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres', {
        icon: '🔐'
      })
      return
    }

    setIsLoading(true)
    
    // Simulación de login
    setTimeout(() => {
      setIsLoading(false)
      toast.success('¡Bienvenido al sistema!', {
        icon: '👋'
      })
      onLogin({ email, name: 'Administrador' })
    }, 1500)
  }

  const features = [
    { icon: FiTruck, title: 'Control de Entregas', desc: 'Gestiona todas tus entregas en tiempo real' },
    { icon: FiUsers, title: 'Gestión de Clientes', desc: 'Administra tu cartera de clientes' },
    { icon: FiBarChart2, title: 'Reportes Detallados', desc: 'Analiza el rendimiento de tu negocio' },
    { icon: FiShield, title: 'Seguridad Avanzada', desc: 'Protección de datos garantizada' },
  ]

  return (
    <div className="login-page">
      {/* Left Panel - Branding */}
      <div className="login-branding">
        <div className="branding-content">
          <div className="brand-header">
            <div className="brand-logo">
              <img src="/logo.png" alt="H2OManager Logo" className="logo-img" />
              <span className="logo-name">H2OManager</span>
            </div>
            <span className="brand-badge">Pro</span>
          </div>
          
          <div className="brand-hero">
            <h1>Sistema de Gestión de Botellones</h1>
            <p>La plataforma integral para administrar tu negocio de distribución de agua de manera eficiente y profesional.</p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    <IconComponent />
                  </div>
                  <div className="feature-text">
                    <h3>{feature.title}</h3>
                    <p>{feature.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
        
        <div className="branding-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>
      </div>
      
      {/* Right Panel - Login Form */}
      <div className="login-form-panel">
        <div className="form-container">
          <div className="form-header">
            <div className="mobile-logo">
              <img src="/Logo.webp" alt="H2OManager Logo" className="mobile-logo-img" />
              <span>H2OManager</span>
            </div>
            <h2>Bienvenido de nuevo</h2>
            <p>Ingresa tus credenciales para acceder al sistema</p>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">
                <FiMail className="label-icon" />
                Correo Electrónico
              </label>
              <div className="input-container">
                <input
                  type="email"
                  id="email"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={email ? 'has-value' : ''}
                />
                {email && email.includes('@') && (
                  <FiCheck className="input-valid-icon" />
                )}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="password">
                <FiLock className="label-icon" />
                Contraseña
              </label>
              <div className="input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={password ? 'has-value' : ''}
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            
            <div className="form-options">
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="checkmark">
                  <FiCheck />
                </span>
                <span className="checkbox-label">Recordar sesión</span>
              </label>
              <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
            </div>
            
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  <span>Iniciando sesión...</span>
                </>
              ) : (
                <>
                  <span>Iniciar Sesión</span>
                  <FiArrowRight className="btn-arrow" />
                </>
              )}
            </button>
          </form>
          
          <div className="form-footer">
            <div className="divider">
              <span>Información</span>
            </div>
            <p className="help-text">
              ¿Necesitas ayuda? Contacta a <a href="#">soporte@h2omanager.com</a>
            </p>
          </div>
          
          <div className="copyright">
            <p>© 2026 H2OManager. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
