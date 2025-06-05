// app/raaswallet/page.tsx
export default function Raaswallet() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">👜 Raaswallet</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">Your wallet for managing Raaskoin, Raastoken, and other assets.</p>

      <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold mb-4">Wallet Overview</h2>
        <p className="text-gray-600 mb-4">View and manage your assets here.</p>

        {/* Add wallet functionality components here */}
        <div className="mb-6">
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Connect Wallet
          </button>
        </div>

        {/* Display wallet balance */}
        <div className="flex justify-between">
          <p className="text-gray-600">Balance:</p>
          <p className="font-semibold">5,000 RAASKOIN</p>
        </div>
      </div>
    </main>
  );
}
