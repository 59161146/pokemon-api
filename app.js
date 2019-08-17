const express = require("express");
const app = express();

app.use(express.json());

let pokemons = [];
pokemons.push(createPokemon("Charizard", "Fire"));
pokemons.push(createPokemon("Mega Charizard X", "Fire"));

app.get("/", (req, res) => res.send({ message: "Hello world" }));
app.get("/pokemon", (req, res) => res.send(pokemons));

app.get("/pokemon/:id", (req, res) => {
  if (!isSufficientParam(req.params.id)) {
    res.status(400).send({
      error: "Insufficient parameters: id are required parameter"
    });
    return;
  }
  let id = req.params.id;
  let p = pokemons[id - 1];
  if (p === undefined ) {
    res.status(400).send({
      error: "Cannot find pokemon: Pokemon is not found"
    });
    return;
  }
  res.send(p);
});

//UPDATE
app.put("/pokemon/:id", (req, res) => {
  if (!isSufficientParam(req.body.type2)) {
    res.status(400).send({
      error: "Insufficient parameters: type2 are required parameter"
    });
    return;
  }

  let id = req.params.id;
  if (!isSufficientParam(id)) {
    res.status(400).send({
      error: "Insufficient parameters: id are required parameter"
    });
    return;
  }

  let p = pokemons[id - 1];
  if (p === undefined) {
    res.status(400).send({
      error: "Cannot update pokemon: Pokemon is not found"
    });
    return;
  }

  p.type2 = req.body.type2;
  pokemons[id - 1] = p;
  res.sendStatus(200);
});

// DELETE
app.delete("/pokemon/:id", (req, res) => {
  if (!isSufficientParam(req.params.id)) {
    res.status(400).send({
      error: "Insufficient parameters: id are required parameter"
    });
    return;
  }

  let id = req.params.id;
  if (id === undefined) {
    res.status(400).send({
      error: "Cannot delete pokemon: Pokemon is not found"
    });
    return;
  }

  delete pokemons[id - 1];
  res.sendStatus(204);
});

//CREATE
app.post("/pokemon", (req, res) => {
  if (!isSufficientParam(req.body.name) || !isSufficientParam(req.body.type)) {
    res.status(400).send({
      error: "Insufficient parameters: name and type are required parameter"
    });
    return;
  }

  let p = new Pokemon(req.body.name, req.body.type);
  pokemons.push(p);
  res.sendStatus(201);
});

function isSufficientParam(v) {
  return v !== null && v !== "" && v !== undefined;
}

function Pokemon(name, type) {
  this.name = name;
  this.type = type;
  this.id = null;
  this.type2 = null;
}

function generateNewId(num) {
  return num + 1;
}

function createPokemon(name, type) {
  let p = new Pokemon(name, type);
  p.id = generateNewId(pokemons.length);
  return p;
}

module.exports = app

