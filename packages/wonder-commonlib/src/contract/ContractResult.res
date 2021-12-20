let _assert = (result: bool, message) => result

// let _throw = [%bs.raw {|
// function(message) {
// throw new Error(message);
// }
// |}];

let test = (message, func) =>
  // func() ? () : _throw(message);
  func()
    ? ()
    : Js.Exn.raiseError(message)

let requireCheck = // (f: unit => (string, bool), isTest: bool): Result.t2(unit) =>
(f: unit => unit, isTest: bool): Result.t2<unit> =>
  isTest
    ? try f()->Result.succeed catch {
      | Js.Exn.Error(e) => Result.fail(e)
      }
    : Result.succeed()

// switch (isTest) {
// | true =>
//   let (message, isPass) = f();

//   switch (isPass) {
//   | false => Result.fail(Js.Exn.raiseError(message))
//   | true => Result.succeed()
//   };
// | _ => Result.succeed()
// };

let ensureCheck = // (returnVal: 'a, f: 'a => (string, bool), isTest: bool): Result.t2('a) =>
(returnVal: 'a, f: 'a => unit, isTest: bool): Result.t2<'a> =>
  // switch (isTest) {
  // | true =>
  //   let (message, isPass) = f(returnVal);
  //   switch (isPass) {
  //   | false => Result.fail(Js.Exn.raiseError(message))
  //   | true => Result.succeed(returnVal)
  //   };
  // | _ => Result.succeed(returnVal)
  // };
  isTest
    ? try f(returnVal)->Result.succeed->Result.mapSuccess(() => returnVal) catch {
      | Js.Exn.Error(e) => Result.fail(e)
      }
    : Result.succeed(returnVal)

let assertPass = () => true

let assertTrue = (source: bool) => _assert(source == true, "expect to be true, but actual is false")

let assertFalse = (source: bool) =>
  _assert(source == false, "expect to be false, but actual is true")

let assertJsTrue = (source: bool) =>
  _assert(source == true, "expect to be true, but actual is false")

let assertJsFalse = (source: bool) =>
  _assert(source == false, "expect to be false, but actual is true")

let assertIsBool = (source: bool) =>
  _assert(source == true || source == false, "expect to be bool, but actual not")

let _isNullableExist = %bs.raw(`
function(source) {
    return source !== undefined && source !== null;
}
`)

let assertNullableExist = (source: 'a) =>
  _assert(_isNullableExist(source), "expect exist, but actual not")

let _isNullableListExist = sourceList =>
  sourceList->Belt.List.getBy(source => Obj.magic(source)->Js.Nullable.isNullable)->Js.Option.isNone

let assertNullableListExist = sourceList =>
  _assert(_isNullableListExist(sourceList), "expect exist, but actual not")

let assertExist = (source: option<'a>) =>
  _assert(Js.Option.isSome(source), "expect exist, but actual not")

let assertNotExist = (source: option<'a>) =>
  _assert(Js.Option.isNone(source), "expect not exist, but actual exist")

type rec assertEqual<_> =
  | Int: assertEqual<int>
  | Float: assertEqual<float>
  | String: assertEqual<string>

let _getEqualMessage = (source, target) => j`"expect to be $target, but actual is $source"`

let assertEqual = (type g, kind: assertEqual<g>, source: g, target: g) =>
  switch kind {
  | _ => _assert(source == target, _getEqualMessage(source, target))
  }

type rec assertNotEqual<_> =
  | Int: assertNotEqual<int>
  | Float: assertNotEqual<float>
  | String: assertNotEqual<string>

let _getNotEqualMessage = (source, target) => j`"expect not to be $target, but actual is $source"`

let assertNotEqual = (type g, kind: assertNotEqual<g>, source: g, target: g) =>
  switch kind {
  | _ => _assert(source != target, _getNotEqualMessage(source, target))
  }

type rec assertNumber<_> =
  | Int: assertNumber<int>
  | Float: assertNumber<float>

let assertGt = (type g, kind: assertNumber<g>, source: g, target: g) =>
  switch kind {
  | _ => _assert(source > target, j`expect $source > $target, but actual isn't`)
  }

let assertGte = (type g, kind: assertNumber<g>, source: g, target: g) =>
  switch kind {
  | _ => _assert(source >= target, j`expect $source >= $target, but actual isn't`)
  }

let assertLt = (type g, kind: assertNumber<g>, source: g, target: g) =>
  switch kind {
  | _ => _assert(source < target, j`expect $source < $target, but actual isn't`)
  }

let assertLte = (type g, kind: assertNumber<g>, source: g, target: g) =>
  switch kind {
  | _ => _assert(source <= target, j`expect $source <= $target, but actual isn't`)
  }

module Operators = {
  let \"=" = (a, b) => assertEqual(Int, a, b)
  let \"==." = (a, b) => assertEqual(Float, a, b)
  let \"==^" = (a, b) => assertEqual(String, a, b)
  let \"<>=" = (a, b) => assertNotEqual(Int, a, b)
  let \"<>=." = (a, b) => assertNotEqual(Float, a, b)
  let \">" = (a, b) => assertGt(Int, a, b)
  let \">." = (a, b) => assertGt(Float, a, b)
  let \">=" = (a, b) => assertGte(Int, a, b)
  let \">=." = (a, b) => assertGte(Float, a, b)
  let \"<" = (a, b) => assertLt(Int, a, b)
  let \"<." = (a, b) => assertLt(Float, a, b)
  let \"<=" = (a, b) => assertLte(Int, a, b)
  let \"<=." = (a, b) => assertLte(Float, a, b)
}
