const { validarTransicaoStatus } = require("./src/pedidos");

describe("validarTransicaoStatus", () => {
  describe("transições permitidas", () => {
    test.each([
      ["PENDENTE", "PAGO"],
      ["PENDENTE", "CANCELADO"],
      ["PAGO", "ENVIADO"],
      ["PAGO", "CANCELADO"],
      ["ENVIADO", "ENTREGUE"]
    ])("%s -> %s retorna true", (de, para) => {
      expect(validarTransicaoStatus(de, para)).toBe(true);
    });
  });

  describe("pulando etapas", () => {
    test.each([
      ["PENDENTE", "ENVIADO"],
      ["PENDENTE", "ENTREGUE"],
      ["PAGO", "ENTREGUE"]
    ])("%s -> %s retorna false", (de, para) => {
      expect(validarTransicaoStatus(de, para)).toBe(false);
    });
  });

  describe("voltando no fluxo", () => {
    test.each([
      ["PAGO", "PENDENTE"],
      ["ENVIADO", "PAGO"],
      ["ENVIADO", "PENDENTE"],
      ["ENTREGUE", "ENVIADO"]
    ])("%s -> %s retorna false", (de, para) => {
      expect(validarTransicaoStatus(de, para)).toBe(false);
    });
  });

  describe("cancelamento tardio", () => {
    test("ENVIADO -> CANCELADO não é permitido", () => {
      expect(validarTransicaoStatus("ENVIADO", "CANCELADO")).toBe(false);
    });
  });

  describe("estados finais não mudam", () => {
    test.each([
      ["ENTREGUE", "PENDENTE"],
      ["ENTREGUE", "CANCELADO"],
      ["CANCELADO", "PENDENTE"],
      ["CANCELADO", "PAGO"]
    ])("%s -> %s retorna false", (de, para) => {
      expect(validarTransicaoStatus(de, para)).toBe(false);
    });
  });

  describe("mesmo status e entradas estranhas", () => {
    test("PENDENTE -> PENDENTE retorna false", () => {
      expect(validarTransicaoStatus("PENDENTE", "PENDENTE")).toBe(false);
    });
    test("status desconhecido retorna false", () => {
      expect(validarTransicaoStatus("XPTO", "PAGO")).toBe(false);
    });
    test("novo status desconhecido retorna false", () => {
      expect(validarTransicaoStatus("PENDENTE", "XPTO")).toBe(false);
    });
    test("minúsculo não é aceito", () => {
      expect(validarTransicaoStatus("pendente", "pago")).toBe(false);
    });
    test("null e undefined retornam false", () => {
      expect(validarTransicaoStatus(null, "PAGO")).toBe(false);
      expect(validarTransicaoStatus(undefined, undefined)).toBe(false);
    });
    test("nomes de propriedades do JS ('constructor') não quebram", () => {
      expect(validarTransicaoStatus("constructor", "PAGO")).toBe(false);
      expect(validarTransicaoStatus("toString", "PAGO")).toBe(false);
    });
  });
});
