const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, "db.json");

app.use(express.json());

app.post("/api/localizacao", (req, res) => {
  const novaLocalizacao = req.body;

  fs.readFile(DB_PATH, "utf-8", (err, data) => {
    let db = [];
    if (!err && data) {
      try {
        db = JSON.parse(data);
      } catch {}
    }

    db.push(novaLocalizacao);

    fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), (err) => {
      if (err) return res.status(500).send("Erro ao salvar");
      res.status(200).send("Salvo com sucesso");
    });
  });
});

app.get("/", (req, res) => {
  res.send("API de localização funcionando.");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
