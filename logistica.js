function calcularTempoEntrega(distanciaKm, ehExpress) {
  if (typeof distanciaKm !== "number" || isNaN(distanciaKm) || distanciaKm <= 0) {
    return -1;
  }

  let tempo = 15 + 5 * distanciaKm;

  if (ehExpress === true) {
    tempo = tempo / 2;
  }

  return tempo;
}

module.exports = { calcularTempoEntrega };
