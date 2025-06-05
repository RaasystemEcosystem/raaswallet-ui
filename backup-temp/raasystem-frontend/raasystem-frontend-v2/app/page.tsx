// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">🚀 Raasystem is Live</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">Welcome to the AI Trading Frontier</p>

      <div className="grid gap-6 md:grid-cols-3">
        <Link href="/raaswallet">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-2xl font-semibold mb-2">👜 Raaswallet</h2>
            <p className="text-gray-600">Manage your Raaskoin, Raastoken & assets.</p>
          </div>
        </Link>

        <Link href="/rabex">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-2xl font-semibold mb-2">📈 Rabex</h2>
            <p className="text-gray-600">Trade crypto & assets with AI precision.</p>
          </div>
        </Link>

        <Link href="/RabexAdminPanel">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-2xl font-semibold mb-2">🛠 Admin Panel</h2>
            <p className="text-gray-600">Manage markets, users, and configurations.</p>
          </div>
        </Link>
      </div>
    </main>
  );
}
