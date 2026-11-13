function verificarEstoque(qtdDesejada, qtdEstoque) {
  if (typeof qtdDesejada !== "number" || isNaN(qtdDesejada) || qtdDesejada <= 0) {
    return "QUANTIDADE_INVALIDA";
  }

  if (typeof qtdEstoque !== "number" || isNaN(qtdEstoque)) {
    return "INDISPONIVEL";
  }

  if (qtdEstoque >= qtdDesejada) {
    return "DISPONIVEL";
  } else {
    return "INDISPONIVEL";
  }
}

module.exports = { verificarEstoque };
