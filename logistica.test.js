const { calcularTempoEntrega } = require("./src/logistica");

describe("calcularTempoEntrega", () => {
  describe("entrada inválida retorna -1", () => {
    test.each([[0], [-5], [NaN], [undefined], [null], ["10"]])(
      "distância %p",
      (dist) => {
        expect(calcularTempoEntrega(dist, false)).toBe(-1);
      }
    );
  });

  describe("entrega normal (15 min + 5 min/km)", () => {
    test("10 km = 65 min", () => {
      expect(calcularTempoEntrega(10, false)).toBe(65);
    });
    test("limite: 1 km = 20 min", () => {
      expect(calcularTempoEntrega(1, false)).toBe(20);
    });
    test("distância fracionada: 0.5 km = 17.5 min", () => {
      expect(calcularTempoEntrega(0.5, false)).toBe(17.5);
    });
    test("sem informar ehExpress, trata como normal", () => {
      expect(calcularTempoEntrega(10)).toBe(65);
    });
  });

  describe("entrega express (metade do tempo)", () => {
    test("10 km = 32.5 min", () => {
      expect(calcularTempoEntrega(10, true)).toBe(32.5);
    });
    test("1 km = 10 min", () => {
      expect(calcularTempoEntrega(1, true)).toBe(10);
    });
    test("express com distância inválida continua -1", () => {
      expect(calcularTempoEntrega(0, true)).toBe(-1);
    });
  });

  describe("valores 'quase' verdadeiros não ativam express", () => {
    test.each([["true"], [1], ["sim"]])("ehExpress %p", (valor) => {
      expect(calcularTempoEntrega(10, valor)).toBe(65);
    });
  });
});
