import React, { useState } from 'react'
import WalletConnect from './components/WalletConnect'

function App() {
  const [walletAddress, setWalletAddress] = useState(null)
  const [balance, setBalance] = useState(0)

  const handleConnect = () => {
    // Simulate wallet connect (replace with real logic)
    setWalletAddress("xdc1234...abcd")
    setBalance(250.75)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Raasystem Wallet</h1>
        <WalletConnect
          walletAddress={walletAddress}
          balance={balance}
          onConnect={handleConnect}
        />
      </div>
    </div>
  )
}

export default App
