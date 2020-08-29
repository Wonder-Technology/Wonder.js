let toFail = (result, message) => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;

  result->Result.either(
    _ => {expect(true) == true},
    err => {expect(err -> Js.Exn.message) == Some(message)},
    
  );
};
