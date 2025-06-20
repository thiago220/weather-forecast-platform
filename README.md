# 🌦️ WeatherAll

Aplicação completa para previsão do tempo por localização e por cidade, com histórico de buscas, autenticação protegida por token JWT e testes automatizados em frontend e backend.

---

## 📁 Estrutura de Diretórios

```
WeatherAll/
├── backend/         # API Express com autenticação, segurança, MongoDB e testes
├── frontend/        # Aplicação React com Context API e integração com backend
├── README.md
```

---

## 🔧 Requisitos

- Node.js 18+
- MongoDB local ou em nuvem
- npm

---

## 🚀 Backend

**Diretório:** `./backend`

### Iniciar em modo de desenvolvimento

```bash
cd backend
npm install
npm run dev
```

### Variáveis de ambiente

Crie um arquivo `.env` no diretório `backend` com:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/weatherdb
JWT_SECRET=sua_chave_secreta
OPENWEATHER_API_KEY=sua_chave
CORS_ORIGIN=http://localhost:5173
```

### Testes

```bash
npm test
```

---

## 💻 Frontend

**Diretório:** `./frontend`

### Iniciar

```bash
cd frontend
npm install
npm run dev
```

A aplicação será acessível via: `http://localhost:5173`

### Variáveis de ambiente

Crie um arquivo `.env` no diretório `frontend` com:

```env
VITE_API_URL=http://localhost:5000/api
```

### Testes

```bash
npm test
```

---

## 🧪 Funcionalidades

- 🔐 Registro e login de usuário
- 📍 Clima por geolocalização
- 🌆️ Clima por cidade
- 📜 Histórico de buscas
- 🦾 Testes completos (Jest, Supertest, React Testing Library)
- 🛡️ Segurança (Helmet, CORS, Rate Limiting, Sanitize)
- ⚙️ Cache de resultados

---

## 📌 Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Helmet
- **Frontend:** React, TailwindCSS, Context API, Axios
- **Testes:** Jest, Supertest, React Testing Library

---

## 📄 Licença

MIT
