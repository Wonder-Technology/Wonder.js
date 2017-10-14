open CompileConfig;

open InitConfigSystem;

open Exception;

let describe (message: string) func ::preCondition=(fun () => true) () =>
  preCondition () ?
    try (func ()) {
    | Check_fail faileMessage => failwith (Format.sprintf "%s->%s" message faileMessage)
    } :
    ();

let it (message: string) (func: unit => unit) =>
  try (func ()) {
  | Check_fail faileMessage => failwith (Format.sprintf "%s->%s" message faileMessage)
  };

let requireCheck (f: unit => unit) :unit =>
  switch (compileConfig.isCompileTest, getIsTest ()) {
  | (true, true) => f ()
  | (_, _) => ()
  };

let ensureCheck (f: 'a => unit) (returnVal: 'a) :'a =>
  switch (compileConfig.isCompileTest, getIsTest ()) {
  | (true, true) =>
    f returnVal;
    returnVal
  | (_, _) => returnVal
  };

let _assert (result: bool) (message: string) =>
  switch result {
  | false => failwith message
  | true => ()
  };

let assertTrue (source: bool) => _assert (source == true) "expect to be true, but actual is false";

let assertFalse (source: bool) =>
  _assert (source == false) "expect to be false, but actual is true";

type assertEqual _ =
  | Int :assertEqual int
  | Float :assertEqual float
  | String :assertEqual string;

let assertEqual (type g) (kind: assertEqual g) (source: g) (target: g) => {
  let result = source == target;
  switch kind {
  | Int => _assert result (Format.sprintf "expect to be %i, but actual is %i" source target)
  | Float => _assert result (Format.sprintf "expect to be %f, but actual is %f" source target)
  | String => _assert result (Format.sprintf "expect to be %s, but actual is %s" source target)
  }
};