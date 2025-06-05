// app/rabex/page.tsx
export default function Rabex() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">📈 Rabex</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">Trade assets with AI-driven market insights and liquidity management.</p>

      <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold mb-4">Market Overview</h2>
        <p className="text-gray-600 mb-4">View trading pairs, market trends, and trade with precision.</p>

        {/* Add market trading functionality */}
        <div className="mb-6">
          <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
            Start Trading
          </button>
        </div>

        {/* Display market data */}
        <div className="flex justify-between mb-4">
          <p className="text-gray-600">BTC/USDT:</p>
          <p className="font-semibold">$54,000</p>
        </div>

        <div className="flex justify-between mb-4">
          <p className="text-gray-600">ETH/USDT:</p>
          <p className="font-semibold">$4,000</p>
        </div>
      </div>
    </main>
  );
}
