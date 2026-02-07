import { useState } from 'react'
import { 
  FiUser, 
  FiDollarSign, 
  FiLock, 
  FiDroplet,
  FiSettings,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiSave,
  FiPackage,
  FiTruck,
  FiPercent,
  FiRefreshCw
} from 'react-icons/fi'
import toast from 'react-hot-toast'
import '../styles/Configuracion.css'

function Configuracion({ section = 'general' }) {
  // Estado para la sección actual
  const [activeTab, setActiveTab] = useState(section)
  
  // Estado para cambio de clave
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })

  // Estado para configuración de moneda - Bolívares como moneda principal
  const [currencyConfig, setCurrencyConfig] = useState({
    monedaSecundaria: 'USD',
    tasaCambio: 36.50,
    iva: 16
  })

  // Estado para precios por litro
  const [priceConfig, setPriceConfig] = useState({
    precioLitro: 0.50,
    precioBotellon18L: 9.00,
    precioBotellon20L: 10.00,
    precioDelivery: 2.00
  })

  // Usuarios de ejemplo
  const [usuarios] = useState([
    { id: 1, nombre: 'Admin Principal', email: 'admin@h2omanager.com', rol: 'Administrador', estado: 'Activo' },
    { id: 2, nombre: 'Juan Operador', email: 'juan@h2omanager.com', rol: 'Operador', estado: 'Activo' },
    { id: 3, nombre: 'María Vendedora', email: 'maria@h2omanager.com', rol: 'Vendedor', estado: 'Activo' },
  ])

  // Tabs de configuración
  const tabs = [
    { id: 'usuarios', icon: FiUser, label: 'Usuarios' },
    { id: 'moneda', icon: FiDollarSign, label: 'Moneda' },
    { id: 'clave', icon: FiLock, label: 'Cambiar Clave' },
    { id: 'precios', icon: FiDroplet, label: 'Precios por Litro' },
    { id: 'general', icon: FiSettings, label: 'General' },
  ]

  // Manejar cambio de contraseña
  const handlePasswordChange = (e) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Las contraseñas no coinciden')
      return
    }
    if (passwordData.newPassword.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres')
      return
    }
    toast.success('Contraseña actualizada correctamente')
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  // Manejar guardado de configuración de moneda
  const handleCurrencySave = () => {
    toast.success('Configuración de moneda guardada')
  }

  // Manejar guardado de precios
  const handlePricesSave = () => {
    toast.success('Precios actualizados correctamente')
  }

  // Opciones de moneda secundaria
  const monedasSecundarias = [
    { codigo: 'USD', nombre: 'USD - Dólar', simbolo: '$' },
    { codigo: 'EUR', nombre: 'EUR - Euro', simbolo: '€' },
    { codigo: 'COP', nombre: 'COP - Peso Colombiano', simbolo: '$' },
  ]

  // Renderizar contenido según la pestaña activa
  const renderContent = () => {
    switch (activeTab) {
      case 'usuarios':
        return (
          <div className="config-section">
            <div className="section-header">
              <h2>Gestión de Usuarios</h2>
              <button className="btn-primary">
                <FiPlus /> Nuevo Usuario
              </button>
            </div>
            
            <div className="search-bar">
              <FiSearch className="search-icon" />
              <input type="text" placeholder="Buscar usuarios..." />
            </div>

            <div className="users-table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map(user => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-info">
                          <div className="user-avatar">{user.nombre.charAt(0)}</div>
                          <span>{user.nombre}</span>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td><span className={`role-badge ${user.rol.toLowerCase()}`}>{user.rol}</span></td>
                      <td><span className={`status-badge ${user.estado.toLowerCase()}`}>{user.estado}</span></td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-icon" title="Editar"><FiEdit2 /></button>
                          <button className="btn-icon danger" title="Eliminar"><FiTrash2 /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      case 'moneda':
        return (
          <div className="config-section">
            <div className="section-header">
              <h2>Configuración de Moneda</h2>
            </div>
            
            <div className="config-form currency-form">
              <div className="currency-info-box">
                <FiDollarSign className="info-icon" />
                <div>
                  <strong>Moneda Principal: Bolívares (VES)</strong>
                  <p>Todos los precios se manejan en Bolívares. Configure la tasa de cambio para convertir a dólares u otra moneda.</p>
                </div>
              </div>

              <div className="form-group">
                <label>
                  <FiDollarSign className="label-icon" />
                  Moneda
                </label>
                <select 
                  value={currencyConfig.monedaSecundaria}
                  onChange={(e) => setCurrencyConfig({...currencyConfig, monedaSecundaria: e.target.value})}
                  className="currency-select"
                >
                  {monedasSecundarias.map(moneda => (
                    <option key={moneda.codigo} value={moneda.codigo}>
                      {moneda.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>
                  <FiRefreshCw className="label-icon" />
                  Tasa de Cambio / Precio de la Moneda
                </label>
                <input 
                  type="number" 
                  step="0.01"
                  value={currencyConfig.tasaCambio}
                  onChange={(e) => setCurrencyConfig({...currencyConfig, tasaCambio: parseFloat(e.target.value)})}
                  className="currency-input"
                />
                <span className="input-hint">Tasa de cambio o precio de referencia</span>
              </div>

              <div className="form-group">
                <label>
                  <FiPercent className="label-icon" />
                  IVA (%)
                </label>
                <input 
                  type="number" 
                  step="1"
                  min="0"
                  max="100"
                  value={currencyConfig.iva}
                  onChange={(e) => setCurrencyConfig({...currencyConfig, iva: parseInt(e.target.value)})}
                  className="currency-input"
                />
                <span className="input-hint">Porcentaje de impuesto IVA</span>
              </div>

              <div className="preview-box dark">
                <div className="preview-row">
                  <span className="preview-label">Ejemplo: 100 {currencyConfig.monedaSecundaria}</span>
                  <span className="preview-value">= Bs. {(100 * currencyConfig.tasaCambio).toLocaleString('es-VE', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="preview-row">
                  <span className="preview-label">Con IVA ({currencyConfig.iva}%):</span>
                  <span className="preview-value">= Bs. {(100 * currencyConfig.tasaCambio * (1 + currencyConfig.iva/100)).toLocaleString('es-VE', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <button className="btn-primary btn-save" onClick={handleCurrencySave}>
                <FiSave /> Guardar Configuración
              </button>
            </div>
          </div>
        )

      case 'clave':
        return (
          <div className="config-section">
            <div className="section-header">
              <h2>Cambiar Contraseña</h2>
            </div>
            
            <form className="config-form password-form" onSubmit={handlePasswordChange}>
              <div className="form-group">
                <label>Contraseña Actual</label>
                <div className="password-input">
                  <input 
                    type={showPasswords.current ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    placeholder="Ingresa tu contraseña actual"
                  />
                  <button 
                    type="button"
                    className="toggle-pass"
                    onClick={() => setShowPasswords({...showPasswords, current: !showPasswords.current})}
                  >
                    {showPasswords.current ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Nueva Contraseña</label>
                <div className="password-input">
                  <input 
                    type={showPasswords.new ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    placeholder="Ingresa la nueva contraseña"
                  />
                  <button 
                    type="button"
                    className="toggle-pass"
                    onClick={() => setShowPasswords({...showPasswords, new: !showPasswords.new})}
                  >
                    {showPasswords.new ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Confirmar Nueva Contraseña</label>
                <div className="password-input">
                  <input 
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    placeholder="Confirma la nueva contraseña"
                  />
                  <button 
                    type="button"
                    className="toggle-pass"
                    onClick={() => setShowPasswords({...showPasswords, confirm: !showPasswords.confirm})}
                  >
                    {showPasswords.confirm ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="password-requirements">
                <p>La contraseña debe tener:</p>
                <ul>
                  <li className={passwordData.newPassword.length >= 6 ? 'valid' : ''}>
                    <FiCheck /> Mínimo 6 caracteres
                  </li>
                  <li className={/[A-Z]/.test(passwordData.newPassword) ? 'valid' : ''}>
                    <FiCheck /> Al menos una mayúscula
                  </li>
                  <li className={/[0-9]/.test(passwordData.newPassword) ? 'valid' : ''}>
                    <FiCheck /> Al menos un número
                  </li>
                </ul>
              </div>

              <button type="submit" className="btn-primary btn-save">
                <FiLock /> Actualizar Contraseña
              </button>
            </form>
          </div>
        )

      case 'precios':
        return (
          <div className="config-section">
            <div className="section-header">
              <h2>Configuración de Precios</h2>
            </div>
            
            <div className="config-form">
              <div className="price-card">
                <div className="price-icon"><FiDroplet /></div>
                <div className="price-info">
                  <label>Precio por Litro de Agua</label>
                  <div className="price-input">
                    <span className="currency">$</span>
                    <input 
                      type="number" 
                      step="0.01"
                      value={priceConfig.precioLitro}
                      onChange={(e) => setPriceConfig({...priceConfig, precioLitro: parseFloat(e.target.value)})}
                    />
                  </div>
                </div>
              </div>

              <div className="price-card">
                <div className="price-icon"><FiPackage /></div>
                <div className="price-info">
                  <label>Botellón 18 Litros</label>
                  <div className="price-input">
                    <span className="currency">$</span>
                    <input 
                      type="number" 
                      step="0.01"
                      value={priceConfig.precioBotellon18L}
                      onChange={(e) => setPriceConfig({...priceConfig, precioBotellon18L: parseFloat(e.target.value)})}
                    />
                  </div>
                </div>
              </div>

              <div className="price-card">
                <div className="price-icon"><FiPackage /></div>
                <div className="price-info">
                  <label>Botellón 20 Litros</label>
                  <div className="price-input">
                    <span className="currency">$</span>
                    <input 
                      type="number" 
                      step="0.01"
                      value={priceConfig.precioBotellon20L}
                      onChange={(e) => setPriceConfig({...priceConfig, precioBotellon20L: parseFloat(e.target.value)})}
                    />
                  </div>
                </div>
              </div>

              <div className="price-card">
                <div className="price-icon"><FiTruck /></div>
                <div className="price-info">
                  <label>Tarifa de Delivery</label>
                  <div className="price-input">
                    <span className="currency">$</span>
                    <input 
                      type="number" 
                      step="0.01"
                      value={priceConfig.precioDelivery}
                      onChange={(e) => setPriceConfig({...priceConfig, precioDelivery: parseFloat(e.target.value)})}
                    />
                  </div>
                </div>
              </div>

              <button className="btn-primary btn-save" onClick={handlePricesSave}>
                <FiSave /> Guardar Precios
              </button>
            </div>
          </div>
        )

      default:
        return (
          <div className="config-section">
            <div className="section-header">
              <h2>Configuración General</h2>
            </div>
            
            <div className="config-form">
              <div className="form-group">
                <label>Nombre de la Empresa</label>
                <input type="text" defaultValue="H2OManager" />
              </div>
              <div className="form-group">
                <label>RIF / NIT</label>
                <input type="text" placeholder="Ej: J-12345678-9" />
              </div>
              <div className="form-group">
                <label>Dirección</label>
                <textarea rows={3} placeholder="Dirección de la empresa"></textarea>
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input type="tel" placeholder="+58 424 1234567" />
              </div>
              <div className="form-group">
                <label>Email de Contacto</label>
                <input type="email" placeholder="contacto@empresa.com" />
              </div>

              <button className="btn-primary btn-save">
                <FiSave /> Guardar Cambios
              </button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="configuracion-page">
      <div className="config-sidebar">
        <h3>Configuración</h3>
        <ul className="config-tabs">
          {tabs.map(tab => {
            const IconComponent = tab.icon
            return (
              <li 
                key={tab.id}
                className={`config-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <IconComponent />
                <span>{tab.label}</span>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="config-content">
        {renderContent()}
      </div>
    </div>
  )
}

export default Configuracion
