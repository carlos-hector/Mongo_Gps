const mongoose = require("mongoose");

const coordenadaSchema = new mongoose.Schema(
  {
    usuario: {
      type: String,
      required: true,
    },
    longitud: {
      type: String,
      required: true,
    },
    latitud: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Coordenada", coordenadaSchema);
