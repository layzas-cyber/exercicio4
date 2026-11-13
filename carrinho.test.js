const { calcularTotalPedido } = require("./src/carrinho");

describe("calcularTotalPedido", () => {
  describe("carrinho vazio ou inválido retorna 0", () => {
    test("array vazio", () => {
      expect(calcularTotalPedido([], 7)).toBe(0);
    });
    test("null", () => {
      expect(calcularTotalPedido(null, 7)).toBe(0);
    });
    test("undefined", () => {
      expect(calcularTotalPedido(undefined, 7)).toBe(0);
    });
    test("não é array (string/objeto)", () => {
      expect(calcularTotalPedido("abc", 7)).toBe(0);
      expect(calcularTotalPedido({ preco: 10, quantidade: 1 }, 7)).toBe(0);
    });
  });

  describe("cálculo do total", () => {
    test("um item: 10 x 2 + taxa 5 = 25", () => {
      expect(calcularTotalPedido([{ preco: 10, quantidade: 2 }], 5)).toBe(25);
    });
    test("vários itens: (10x2) + (5x1) + taxa 7 = 32", () => {
      const itens = [{ preco: 10, quantidade: 2 }, { preco: 5, quantidade: 1 }];
      expect(calcularTotalPedido(itens, 7)).toBe(32);
    });
    test("taxa de entrega zero (retirada)", () => {
      expect(calcularTotalPedido([{ preco: 10, quantidade: 3 }], 0)).toBe(30);
    });
    test("taxa não informada é tratada como 0", () => {
      expect(calcularTotalPedido([{ preco: 10, quantidade: 3 }])).toBe(30);
    });
    test("item com quantidade 0 não soma ao subtotal", () => {
      const itens = [{ preco: 50, quantidade: 0 }, { preco: 10, quantidade: 1 }];
      expect(calcularTotalPedido(itens, 5)).toBe(15);
    });
  });

  describe("precisão com centavos", () => {
    test("19.99 x 3 + taxa 5 = 64.97", () => {
      expect(calcularTotalPedido([{ preco: 19.99, quantidade: 3 }], 5)).toBe(64.97);
    });
    test("0.1 x 3 = 0.3 (sem erro de ponto flutuante)", () => {
      expect(calcularTotalPedido([{ preco: 0.1, quantidade: 3 }], 0)).toBe(0.3);
    });
  });
});
