import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

interface SignupData {
  name: string
  email: string
  password: string
}



export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const signup = async (data: SignupData) => {
    const res = await api.post('/auth/signup', data)
    return res.data.token
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
        const token = await signup(form)
        localStorage.setItem('token', token)
        navigate('/dashboard')
    } catch (err: any) {
        setError(err.response?.data?.error || 'Erro ao cadastrar.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Cadastro
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            type="text"
            placeholder="Nome"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            name="email"
            type="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            name="password"
            type="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Cadastrar
          </button>
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          <p className="text-center text-sm text-gray-600">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
