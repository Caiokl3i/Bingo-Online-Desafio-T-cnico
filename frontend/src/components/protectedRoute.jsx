import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Componente que bloqueia acesso não autorizado e valida permissões de administrador.
export default function ProtectedRoute({ children, token, adminOnly = false }) {
  if (!token) return <Navigate to="/" />;

  try {
    const decoded = jwtDecode(token);

    // Se a rota exige admin e o usuário não for, redireciona para o lobby
    if (adminOnly && !decoded.isAdmin) {
      alert("Acesso negado: Somente administradores.");
      return <Navigate to="/bingos" />;
    }

    return children;
  } catch (error) {
    localStorage.removeItem("token");
    return <Navigate to="/" />;
  }
}