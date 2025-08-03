import React, { useState } from 'react';
import './Pages.css';
import alpacaLogo from '../../img/alpaca.jpg';

const PublicAddress = () => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const walletInfo = {
    address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b7',
    balance: {
      ETH: 2.45,
      BTC: 0.023,
      USDT: 1250.50,
      PCH: 5000.00
    },
    network: 'Ethereum Mainnet',
    connected: true,
    lastTransaction: '2024-01-15 14:30:25',
    totalValue: 8750.75
  };

  const transactionHistory = [
    {
      id: 1,
      type: 'deposit',
      amount: 100,
      currency: 'USDT',
      date: '2024-01-15 14:30:25',
      status: 'completed',
      hash: '0x1234...5678'
    },
    {
      id: 2,
      type: 'withdrawal',
      amount: 50,
      currency: 'ETH',
      date: '2024-01-14 09:15:10',
      status: 'completed',
      hash: '0x8765...4321'
    },
    {
      id: 3,
      type: 'swap',
      amount: 25,
      currency: 'BTC',
      date: '2024-01-13 16:45:30',
      status: 'pending',
      hash: '0xabcd...efgh'
    },
    {
      id: 4,
      type: 'deposit',
      amount: 200,
      currency: 'PCH',
      date: '2024-01-12 11:20:15',
      status: 'completed',
      hash: '0x9876...5432'
    }
  ];

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#28a745';
      case 'pending': return '#ffc107';
      case 'failed': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'deposit': return '📥';
      case 'withdrawal': return '📤';
      case 'swap': return '🔄';
      default: return '💱';
    }
  };

  const renderOverview = () => (
    <div className="address-overview">
      <div className="wallet-card">
        <div className="wallet-header">
          <div className="wallet-info">
            <h4>👛 Wallet Pública</h4>
            <p className="network-info">{walletInfo.network}</p>
          </div>
          <div className="connection-status">
            <span className={`status-dot ${walletInfo.connected ? 'connected' : 'disconnected'}`}></span>
            <span className="status-text">{walletInfo.connected ? 'Conectado' : 'Desconectado'}</span>
          </div>
        </div>
        
        <div className="address-section">
          <div className="address-display">
            <span className="address-label">Dirección:</span>
            <div className="address-container">
              <span className="address-text">{walletInfo.address}</span>
              <button 
                className="copy-btn"
                onClick={() => copyToClipboard(walletInfo.address)}
              >
                {copiedAddress ? '✅' : '📋'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="balance-summary">
          <h5>💰 Balance Total: ${walletInfo.totalValue.toLocaleString()}</h5>
          <div className="balance-grid">
            {Object.entries(walletInfo.balance).map(([currency, amount]) => (
              <div key={currency} className="balance-item">
                <span className="currency-icon">
                  {currency === 'ETH' ? '⚡' : currency === 'BTC' ? '₿' : currency === 'USDT' ? '💵' : '🪙'}
                </span>
                <div className="balance-info">
                  <span className="currency-name">{currency}</span>
                  <span className="balance-amount">{amount.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div className="transactions-section">
      <div className="transactions-header">
        <h3>📊 Historial de Transacciones</h3>
        <div className="transaction-filters">
          <button className="filter-btn active">Todas</button>
          <button className="filter-btn">Depósitos</button>
          <button className="filter-btn">Retiros</button>
          <button className="filter-btn">Swaps</button>
        </div>
      </div>
      
      <div className="transactions-list">
        {transactionHistory.map(transaction => (
          <div key={transaction.id} className="transaction-item">
            <div className="transaction-icon">
              {getTransactionIcon(transaction.type)}
            </div>
            
            <div className="transaction-content">
              <div className="transaction-info">
                <h5 className="transaction-title">
                  {transaction.type === 'deposit' ? 'Depósito' : 
                   transaction.type === 'withdrawal' ? 'Retiro' : 'Swap'}
                </h5>
                <p className="transaction-date">{transaction.date}</p>
              </div>
              
              <div className="transaction-amount">
                <span className="amount-value">
                  {transaction.type === 'withdrawal' ? '-' : '+'}
                  {transaction.amount} {transaction.currency}
                </span>
                <span className="amount-time">{transaction.date}</span>
              </div>
            </div>
            
            <div className="transaction-status">
              <span className={`transaction-status ${transaction.status}`}>
                {transaction.status === 'completed' ? 'Completado' : 
                 transaction.status === 'pending' ? 'Pendiente' : 'Fallido'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="security-section">
      <div className="security-header">
        <span className="security-icon">🔒</span>
        <h3>Seguridad de la Wallet</h3>
      </div>
      
      <div className="security-grid">
        <div className="security-item">
          <div className="security-item-header">
            <div className="security-item-icon">🔐</div>
            <h5 className="security-item-title">Autenticación de Dos Factores</h5>
          </div>
          <p className="security-item-description">Protege tu wallet con 2FA</p>
          <div className="security-item-actions">
            <button className="security-btn">Configurar</button>
            <button className="security-btn secondary">Ver Detalles</button>
          </div>
        </div>
        
        <div className="security-item">
          <div className="security-item-header">
            <div className="security-item-icon">📱</div>
            <h5 className="security-item-title">Verificación Biométrica</h5>
          </div>
          <p className="security-item-description">Usa huella dactilar o Face ID</p>
          <div className="security-item-actions">
            <button className="security-btn">Activar</button>
            <button className="security-btn secondary">Configurar</button>
          </div>
        </div>
        
        <div className="security-item">
          <div className="security-item-header">
            <div className="security-item-icon">🔔</div>
            <h5 className="security-item-title">Notificaciones de Transacciones</h5>
          </div>
          <p className="security-item-description">Recibe alertas en tiempo real</p>
          <div className="security-item-actions">
            <button className="security-btn">Activar</button>
            <button className="security-btn secondary">Configurar</button>
          </div>
        </div>
        
        <div className="security-item">
          <div className="security-item-header">
            <div className="security-item-icon">🛡️</div>
            <h5 className="security-item-title">Lista Blanca de Direcciones</h5>
          </div>
          <p className="security-item-description">Restringe transacciones a direcciones conocidas</p>
          <div className="security-item-actions">
            <button className="security-btn">Configurar</button>
            <button className="security-btn secondary">Ver Lista</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="settings-section">
      <div className="settings-header">
        <span className="settings-icon">⚙️</span>
        <h3>Configuración de la Wallet</h3>
      </div>
      
      <div className="settings-grid">
        <div className="setting-item">
          <div className="setting-item-header">
            <div className="setting-item-icon">🌐</div>
            <h5 className="setting-item-title">Red Principal</h5>
          </div>
          <p className="setting-item-description">Ethereum Mainnet</p>
          <div className="setting-item-controls">
            <button className="security-btn">Cambiar Red</button>
          </div>
        </div>
        
        <div className="setting-item">
          <div className="setting-item-header">
            <div className="setting-item-icon">⛽</div>
            <h5 className="setting-item-title">Gas Price</h5>
          </div>
          <p className="setting-item-description">Automático (Recomendado)</p>
          <div className="setting-item-controls">
            <button className="security-btn">Configurar</button>
          </div>
        </div>
        
        <div className="setting-item">
          <div className="setting-item-header">
            <div className="setting-item-icon">📊</div>
            <h5 className="setting-item-title">Límite de Transacción</h5>
          </div>
          <p className="setting-item-description">$1,000 por día</p>
          <div className="setting-item-controls">
            <button className="security-btn">Modificar</button>
          </div>
        </div>
        
        <div className="setting-item">
          <div className="setting-item-header">
            <div className="setting-item-icon">🔑</div>
            <h5 className="setting-item-title">Exportar Clave Privada</h5>
          </div>
          <p className="setting-item-description">Guarda tu clave de forma segura</p>
          <div className="setting-item-controls">
            <button className="security-btn">Exportar</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'transactions':
        return renderTransactions();
      case 'security':
        return renderSecurity();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="logo-container">
          <img src={alpacaLogo} alt="PachaCoin Logo" className="alpaca-logo" />
          <h1 className="page-title">📍 Dirección Pública</h1>
        </div>
        <div className="address-stats">
          <div className="stat-item">
            <span className="stat-icon">💰</span>
            <span className="stat-value">${walletInfo.totalValue.toLocaleString()}</span>
            <span className="stat-label">Balance</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">📊</span>
            <span className="stat-value">{transactionHistory.length}</span>
            <span className="stat-label">Transacciones</span>
          </div>
        </div>
      </div>

      <div className="public-address-container">
        {/* Address Tabs - Ahora están encima de las secciones */}
        <div className="address-tabs">
          <button 
            className={`address-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📋 Resumen
          </button>
          <button 
            className={`address-tab ${activeTab === 'transactions' ? 'active' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            📊 Transacciones
          </button>
          <button 
            className={`address-tab ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            🔒 Seguridad
          </button>
          <button 
            className={`address-tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Configuración
          </button>
        </div>

        {/* Address Content - Contenido de las secciones */}
        <div className="address-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default PublicAddress; 