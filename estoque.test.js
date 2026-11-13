const { verificarEstoque } = require("./src/estoque");

describe("verificarEstoque", () => {
  describe("quantidade desejada inválida", () => {
    test.each([[0], [-1], [-100], [NaN], [undefined], [null], ["5"]])(
      "qtdDesejada %p retorna QUANTIDADE_INVALIDA",
      (qtd) => {
        expect(verificarEstoque(qtd, 10)).toBe("QUANTIDADE_INVALIDA");
      }
    );
  });

  describe("disponibilidade", () => {
    test("estoque maior que o desejado: DISPONIVEL", () => {
      expect(verificarEstoque(5, 10)).toBe("DISPONIVEL");
    });
    test("limite: estoque igual ao desejado: DISPONIVEL", () => {
      expect(verificarEstoque(10, 10)).toBe("DISPONIVEL");
    });
    test("limite: falta 1 unidade: INDISPONIVEL", () => {
      expect(verificarEstoque(11, 10)).toBe("INDISPONIVEL");
    });
    test("estoque zerado: INDISPONIVEL", () => {
      expect(verificarEstoque(1, 0)).toBe("INDISPONIVEL");
    });
    test("estoque negativo (dado corrompido): INDISPONIVEL", () => {
      expect(verificarEstoque(1, -5)).toBe("INDISPONIVEL");
    });
  });

  describe("estoque ausente", () => {
    test.each([[null], [undefined], [NaN], ["10"]])(
      "qtdEstoque %p retorna INDISPONIVEL",
      (estoque) => {
        expect(verificarEstoque(5, estoque)).toBe("INDISPONIVEL");
      }
    );
  });
});
