import axios from "axios";

// Configuração da instância Axios para comunicação com o backend.
const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json"
  }
});

// Interceptor de Requisição: Injeta o token JWT no header Authorization automaticamente.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Interceptor de Resposta: Retorna diretamente o corpo da resposta (data) para o frontend.
api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default api;