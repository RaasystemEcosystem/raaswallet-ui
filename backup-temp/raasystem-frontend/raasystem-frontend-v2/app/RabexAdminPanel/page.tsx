// app/RabexAdminPanel/page.tsx
export default function RabexAdminPanel() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">🛠 Rabex Admin Panel</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">Manage markets, users, and configurations for Rabex.</p>

      <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
        <p className="text-gray-600 mb-4">View system stats, market configurations, and user activity.</p>

        {/* Admin Panel Controls */}
        <div className="mb-6">
          <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition">
            View User Activity
          </button>
        </div>

        <div className="mb-6">
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Manage Markets
          </button>
        </div>

        <div className="mb-6">
          <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
            System Configurations
          </button>
        </div>
      </div>
    </main>
  );
}
