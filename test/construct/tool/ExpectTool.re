let _toFailWithErr = (err, message) => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;

  expect(err->Js.Exn.message) == Some(message);
};

let toFail = (result, message) => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;

  result->Result.either(
    _ => {expect(true) == true},
    err => {_toFailWithErr(err, message)},
  );
};

// let toPass = () => {
//   open Wonder_jest;
//   open Expect;
//   open! Expect.Operators;

//   true->expect == true;
// };
