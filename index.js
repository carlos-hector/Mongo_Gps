const express = require("express");
const mongoose = require("mongoose");
const Coordenada = require("./models/Coordenada");

require("dotenv").config({ path: "./.env" });
const bbdd = process.env.URI;

const app = express();

app.use(express.json());

mongoose.connect(bbdd);
mongoose.connection.on("connected", () => {
  console.log("Yao mongoose ok");
  app.listen(3000, () => console.log("YAO-K"));
});
mongoose.connection.on("error", (error) => {
  console.log("Yao mongoose", error);
});

app.post("/posicion", async (req, res) => {
  try {
    if (!req.body.usuario) {
      return res.status(422).json({ error: "nombre de usuario requerido" });
    }
    const newPosicion = await Coordenada.create(req.body);
    return res.status(201).json(newPosicion);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  // Coordenada.create(req.body)
  //   .then((newPosicion) => {
  //     return res.status(201).json(newPosicion);
  //   })
  //   .catch((error) => {
  //     return res.status(500).json({ error: error.message });
  //   });
});
app.get("/posicion", async (req, res) => {
  try {
    const posiciones = await Coordenada.find().select("-__v");
    return res.status(201).json(posiciones);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
app.get("/", (req, res) => {
  res.send("Soe");
});
