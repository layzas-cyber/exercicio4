const TRANSICOES = {
  PENDENTE: ["PAGO", "CANCELADO"],
  PAGO: ["ENVIADO", "CANCELADO"],
  ENVIADO: ["ENTREGUE"]
};

function validarTransicaoStatus(statusAtual, novoStatus) {
  if (!Object.prototype.hasOwnProperty.call(TRANSICOES, statusAtual)) {
    return false;
  }

  return TRANSICOES[statusAtual].includes(novoStatus);
}

module.exports = { validarTransicaoStatus };
