import jwt from "jsonwebtoken";

// Middleware que valida o token JWT e protege rotas privadas.
export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  // Separa o prefixo "Bearer" do token
  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Anexa dados do usuário à requisição
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
}