const express = require("express");
const app = express();
const port = 3000;
let pokemons = [
  { name: "Charizard", type: "Fire" },
  { name: "Mega Charizard X", type: "Fire" }
];

app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/pokemons", (req, res) => res.send(pokemons));
app.post("/pokemons", (req, res) => {
  pokemons.push(req.body)
  console.log(req.body);
  res.send("Still work in progress...");
});

app.listen(port, () => console.log(`Example app listening no port ${port}`));
