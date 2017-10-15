open CompileConfig;

open InitConfigSystem;

open Exception;

let describe (message: string) func ::preCondition=(fun () => true) () =>
  preCondition () ?
    try (func ()) {
    | Check_fail failMessage => failwith {j|$message->$failMessage|j}
    } :
    ();

let it (message: string) (func: unit => unit) =>
  try (func ()) {
  | Check_fail failMessage => failwith {j|$message->$failMessage|j}
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

let _getEqualMessage source target => {j|"expect to be $source, but actual is $target"|j};

let assertEqual (type g) (kind: assertEqual g) (source: g) (target: g) =>
  switch kind {
  | _ => _assert (source == target) (_getEqualMessage source target)
  };