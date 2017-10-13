open Jest;

let _ =
  describe
    "Expect"
    (
      fun () => {
        open Expect;
        test "toBe1" (fun () => expect (1 + 2) |> toBe 3);
        test "toBe2" (fun () => expect (1 + 2) |> toBe 3);
      }
    );

describe
  "Expect.Operators"
  (
    fun () => {
      open Expect;
      open! Expect.Operators;
      test "==" (fun () => expect (1 + 2) === 3);
    }
  );