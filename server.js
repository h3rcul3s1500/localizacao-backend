const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Armazena as localizações recebidas em memória
const localizacoes = [];

// Rota para testar se a API está viva
app.get("/", (req, res) => {
  res.send("API de localização em memória está ativa.");
});

// Recebe localização
app.post("/api/localizacao", (req, res) => {
  const novaLocalizacao = req.body;

  if (!novaLocalizacao || !novaLocalizacao.latitude || !novaLocalizacao.longitude) {
    return res.status(400).send("Dados inválidos");
  }

  localizacoes.push({
    ...novaLocalizacao,
    recebidoEm: new Date().toISOString()
  });

  console.log("Localização salva:", novaLocalizacao);
  res.status(200).send("Localização salva em memória.");
});

// Rota para visualizar localizações salvas (opcional)
app.get("/api/localizacoes", (req, res) => {
  res.json(localizacoes);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
