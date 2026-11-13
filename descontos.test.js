const { calcularDescontoCupom } = require("./src/descontos");

describe("calcularDescontoCupom", () => {
  describe("valor de entrada inválido", () => {
    test("valor zero retorna 0", () => {
      expect(calcularDescontoCupom(0, "CIMATEC10")).toBe(0);
    });
    test("valor negativo retorna 0", () => {
      expect(calcularDescontoCupom(-50, "ALUNO15")).toBe(0);
    });
    test("valor não numérico retorna 0", () => {
      expect(calcularDescontoCupom("100", "CIMATEC10")).toBe(0);
      expect(calcularDescontoCupom(undefined, "CIMATEC10")).toBe(0);
      expect(calcularDescontoCupom(NaN, "CIMATEC10")).toBe(0);
    });
  });

  describe("cupom CIMATEC10 (10%)", () => {
    test("100 vira 90", () => {
      expect(calcularDescontoCupom(100, "CIMATEC10")).toBe(90);
    });
    test("arredonda em 2 casas (33.33 -> 30)", () => {
      expect(calcularDescontoCupom(33.33, "CIMATEC10")).toBe(30);
    });
  });

  describe("cupom ALUNO15 (R$ 15 fixos)", () => {
    test("100 vira 85", () => {
      expect(calcularDescontoCupom(100, "ALUNO15")).toBe(85);
    });
    test("limite: 15 vira 0", () => {
      expect(calcularDescontoCupom(15, "ALUNO15")).toBe(0);
    });
    test("valor menor que 15 nunca fica negativo", () => {
      expect(calcularDescontoCupom(10, "ALUNO15")).toBe(0);
    });
    test("limite: 15.01 vira 0.01", () => {
      expect(calcularDescontoCupom(15.01, "ALUNO15")).toBe(0.01);
    });
  });

  describe("cupom inválido ou inexistente", () => {
    test.each([["XPTO"], [""], [null], [undefined], ["cimatec10"], [" CIMATEC10"]])(
      "cupom %p mantém o valor original",
      (cupom) => {
        expect(calcularDescontoCupom(100, cupom)).toBe(100);
      }
    );
    test("sem cupom mantém o valor", () => {
      expect(calcularDescontoCupom(59.9)).toBe(59.9);
    });
  });
});
