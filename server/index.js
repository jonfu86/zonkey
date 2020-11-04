const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../database');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.get('/animal/:id', (req, res) => {
  const { id } = req.params;
  db.getAnimal(id)
    .then((animal) => {
      if (!animal) {
        res.status(404).send(`no animal found with id: ${id}`);
      } else {
        res.status(200).send(animal);
      }
    })
    .catch((err) => {
      res.status(500).send(`error while finding animal | ${err}`)
    });
});

app.post('/animal', (req, res) => {
  db.addAnimal(req.body)
    .then((response) => {
      if (response) {
        res.status(200).send('successfully added animal');
      }
    })
    .catch((err) => {
      res.status(500).send(`error while adding animal | ${err}`)
    });
});

app.get('/animalCount', (req, res) => {
  db.animalCount()
    .then((count) => {
      if (!count) {
        res.status(404).send(`count could not be found`);
      } else {
        res.status(200).send(`${count}`);
      }
    })
    .catch((err) => {
      res.status(500).send(`error while finding count | ${err} `)
    });
});