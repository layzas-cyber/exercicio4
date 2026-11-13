function arredondar(valor) {
  return Math.round(valor * 100) / 100;
}

function calcularDescontoCupom(valorTotal, cupom) {
  if (typeof valorTotal !== "number" || isNaN(valorTotal) || valorTotal <= 0) {
    return 0;
  }

  if (cupom === "CIMATEC10") {
    return arredondar(valorTotal * 0.9);
  }

  if (cupom === "ALUNO15") {
    return Math.max(0, arredondar(valorTotal - 15));
  }

  return valorTotal;
}

module.exports = { calcularDescontoCupom };
