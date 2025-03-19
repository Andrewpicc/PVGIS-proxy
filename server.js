const express = require('express');
const cors = require('cors');
const request = require('request');
const bodyParser = require('body-parser'); // Per richieste POST con body JSON

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // CORS per tutte le origini (per ora)
app.use(bodyParser.json()); // Parsing del body JSON

app.post('/', (req, res) => {
  const pvgisUrl = req.body.url; // Estrai l'URL dal corpo

  if (!pvgisUrl) {
    return res.status(400).send({message: "PVGIS URL mancante.", status: 400});
  }

  console.log("Richiesta ricevuta dal proxy. Inoltro a:", pvgisUrl);

  request(pvgisUrl, (error, response, body) => {
    if (error) {
      console.error("Errore nell'inoltro:", error);
      return res.status(500).send({message: "Errore del proxy.", status: 500});
    }
    res.status(response.statusCode).send(body);
  });
});

app.listen(port, () => {
  console.log(`Proxy CORS in ascolto sulla porta ${port}`);
});