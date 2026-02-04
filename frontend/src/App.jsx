import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute"; // Import ajustado para PascalCase
import BingosPage from "./pages/BingosPage";
import BingoCreatePage from "./pages/BingoCreatePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import BingoGamePage from "./pages/BingoGamePage";
import UserProfilePage from "./pages/UserProfilePage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import "./App.css";

// Componente Raiz: Gerencia o roteamento e o estado global de autenticação (Token).

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <Routes>
      {/* --- ROTAS PÚBLICAS --- */}
      <Route
        path="/"
        element={token ? <Navigate to="/bingos" /> : <LoginPage onLogin={setToken} />}
      />

      <Route
        path="/register"
        element={token ? <Navigate to="/bingos" /> : <RegisterPage onRegister={() => navigate("/")} />}
      />

      {/* --- ROTAS PROTEGIDAS (Jogadores) --- */}
      <Route
        path="/bingos"
        element={
          <ProtectedRoute token={token}>
            <BingosPage onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bingos/:id"
        element={
          <ProtectedRoute token={token}>
            <BingoGamePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute token={token}>
            <UserProfilePage />
          </ProtectedRoute>
        }
      />

      {/* --- ROTAS ADMINISTRATIVAS (Requer adminOnly=true) --- */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute token={token} adminOnly={true}>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bingos/create"
        element={
          <ProtectedRoute token={token} adminOnly={true}>
            <BingoCreatePage />
          </ProtectedRoute>
        }
      />

      {/* Fallback para URLs inválidas */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}