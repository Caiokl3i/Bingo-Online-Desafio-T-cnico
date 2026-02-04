// Retorna o status operacional da API para fins de monitoramento (Health Check).
export const check = (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API funcionando'
  });
};