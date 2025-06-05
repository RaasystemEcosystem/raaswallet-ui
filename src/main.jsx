import React from 'react';
import ReactDOM from 'react-dom/client';
import WalletDashboard from './components/WalletDashboard';
import './index.css';  // or your global styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WalletDashboard />
  </React.StrictMode>
);
