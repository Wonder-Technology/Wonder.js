open Jest;

let _ =
  describe(
    "Expect",
    () => {
      open Expect;
      test("toBe1", () => expect(1 + 2) |> toBe(3));
      test("toBe2", () => expect(1 + 2) |> toBe(3))
    }
  );

describe(
  "Expect.Operators",
  () => {
    open Expect;
    open! Expect.Operators;
    test("==", () => expect(1 + 2) === 3)
  }
);
