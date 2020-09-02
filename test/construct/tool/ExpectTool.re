let _toFailContainErrMessage = (err, message) => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;

  expect(err->Js.Exn.message->OptionSt.getExn)->toContainString(message, _);
};

let toFail = (result, message) => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;

  result->Result.either(
    _ => {expect(true) == true},
    err => {_toFailContainErrMessage(err, message)},
  );
};

// let toPass = () => {
//   open Wonder_jest;
//   open Expect;
//   open! Expect.Operators;

//   true->expect == true;
// };
