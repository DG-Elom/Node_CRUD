const express = require('express');
const mongoose = require('mongoose');

const app = express();
const uri = "mongodb+srv://david:david@firstcluster.wzcjyls.mongodb.net/?retryWrites=true&w=majority"

app.get('/', (req, res) => { res.sendFile(__dirname + '/client/index.html')});

let promise = mongoose.connect(uri, {useNewUrlParser: true});

promise.then((db) => {
    console.log("Base de données connecté avec succès! ");

    app.listen(3000, () => {
        console.log('Ecoute sur le port 3000!');
    });
})

app.use('/pages', express.static('./client/pages'));
app.use('/assets', express.static('./client/assets'));
app.use(require('express').json());

const Produit = require('./models/produit');
app.post('/produit', (req, res) => {
  let newProduit = new Produit(req.body);
  console.log(req.body);
  newProduit.save((err, ob) => {
    if(err) {
      console.log(err);
      return res.send(500);
    }
    res.sendStatus(200);
  });
});

app.get('/produit', (req, res) => {
    Produit.find({}, (err, obj) => {
      if(err) {
        console.log(err);
        return res.send(500);
      }
      return res.send(obj);
    });
  });

  app.delete('/produit/:id', (req, res) => {
    Produit.deleteOne({_id: req.params.id}, (err, obj) => {
      if(err) {
        console.log(err);
        return res.send(500);
      }
      res.sendStatus(200);
    });
  });
  
  app.get('/produit/:id', (req, res) => {
    console.log(req.params.id);
    Produit.findOne({_id: req.params.id}, (err, obj) => {
      if(err) {
        console.log(err);
        return res.send(500);
      }
      console.log(obj);
      return res.send(obj);
    })
  });
  
