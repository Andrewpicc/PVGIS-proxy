const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Abilita CORS per tutte le origini

app.use((req, res) => {
  // 1. Estrai l'URL di PVGIS dal parametro di query 'url'
  const pvgisUrl = req.query.url;

  // 2. Verifica se l'URL è presente
  if (!pvgisUrl) {
    return res.status(400).send("Errore: URL di PVGIS mancante.");
  }

  // 3. Log dell'URL (per debugging)
  console.log("Richiesta ricevuta dal proxy. Inoltro a:", pvgisUrl);

  // 4. Inoltra la richiesta a PVGIS
  request(pvgisUrl, (error, response, body) => {
    // 5. Gestisci eventuali errori nell'inoltro
    if (error) {
      console.error("Errore nell'inoltro della richiesta a PVGIS:", error);
      return res.status(500).send("Errore del proxy.");
    }

    // 6. Invia la risposta di PVGIS al client (simulatore)
    res.status(response.statusCode).send(body);
  });
});

app.listen(port, () => {
  console.log(`Proxy CORS in ascolto sulla porta ${port}`);
});