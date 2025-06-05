import React from 'react';
import WalletConnect from './components/WalletConnect';

function App() {
  const [walletAddress, setWalletAddress] = React.useState(null);
  const [balance, setBalance] = React.useState('0.00');

  const handleConnect = () => {
    // Placeholder: simulate wallet connection
    setWalletAddress('xdc123...abcd');
    setBalance('100.25');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6 font-sans">
      <h1 className="text-3xl font-bold mb-4">Raasystem Dashboard</h1>
      <WalletConnect
        walletAddress={walletAddress}
        balance={balance}
        onConnect={handleConnect}
      />
      {/* Additional UI components will go here */}
    </div>
  );
}

export default App;

