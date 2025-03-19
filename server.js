const express = require('express');
const cors = require('cors');
const request = require('request');
const bodyParser = require('body-parser'); // Importante: per gestire richieste POST con body JSON

const app = express();
const port = process.env.PORT || 3000;

// Abilita CORS per tutte le origini (per il test locale; in produzione, limita a origini specifiche)
app.use(cors());

// Abilita il parsing del body JSON per le richieste POST
app.use(bodyParser.json());

// Gestisci le richieste POST a '/'
app.post('/', (req, res) => {
  // Estrai l'URL di PVGIS dal corpo della richiesta (chiave 'url')
  const pvgisUrl = req.body.url;

  // Verifica che l'URL di PVGIS sia presente
  if (!pvgisUrl) {
    return res.status(400).send("Errore: URL di PVGIS mancante."); // Restituisci un errore 400 se l'URL è mancante
  }

  console.log("Richiesta ricevuta dal proxy. Inoltro a:", pvgisUrl); // Log per il debugging

  // Inoltra la richiesta a PVGIS
  request(pvgisUrl, (error, response, body) => {
    if (error) {
      console.error("Errore nell'inoltro della richiesta a PVGIS:", error);
      return res.status(500).send("Errore del proxy."); // Restituisci un errore 500 in caso di errore del proxy
    }

    // Invia la risposta di PVGIS al client (simulatore)
    res.status(response.statusCode).send(body); // Invia lo status code e il corpo della risposta originali
  });
});

app.listen(port, () => {
  console.log(`Proxy CORS in ascolto sulla porta ${port}`);
});