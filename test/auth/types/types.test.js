import { types } from "../../../src/auth/types/types";

describe("Pruebas en Types.js", () => {
  test("Debe regresar estos types", () => {
    expect(types).toEqual({
      login: "[Auth] login",
      logout: "[Auth] logout",
    });
  });
});
