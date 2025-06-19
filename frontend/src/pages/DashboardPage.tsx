import { useAuth } from '../contexts/AuthContext'

export default function DashboardPage() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-6 bg-white rounded shadow">
        <h1 className="text-xl font-bold mb-4">Bem-vindo, {user?.name || 'usuário'}!</h1>
        <p className="text-gray-600 mb-4">Você está autenticado.</p>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Sair
        </button>
      </div>
    </div>
  )
}
