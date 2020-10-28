// let exec =
//     (
//       ~execFunc,
//       ~handleSuccessFunc,
//       ~handleFailFunc=ResultTool.buildEmptyHandleFailFunc(),
//       (),
//     ) => {
//   execFunc()
//   ->WonderBsMost.Most.recoverWith(
//       err => {WonderBsMost.Most.just(err->Result.fail)},
//       _,
//     )
//   ->WonderBsMost.Most.tap(
//       result => {result->Result.handleFail(handleFailFunc)->ignore},
//       _,
//     )
//   ->WonderBsMost.Most.drain
//   ->Js.Promise.then_(
//       () =>
//         {
//           handleSuccessFunc();
//         }
//         ->Js.Promise.resolve,
//       _,
//     );
// };
