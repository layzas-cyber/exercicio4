function calcularTotalPedido(itens, taxaEntrega) {
  if (!Array.isArray(itens) || itens.length === 0) {
    return 0;
  }

  let subtotal = 0;
  for (let i = 0; i < itens.length; i++) {
    subtotal = subtotal + itens[i].preco * itens[i].quantidade;
  }

  const taxa = typeof taxaEntrega === "number" && !isNaN(taxaEntrega) ? taxaEntrega : 0;

  return Math.round((subtotal + taxa) * 100) / 100;
}

module.exports = { calcularTotalPedido };
