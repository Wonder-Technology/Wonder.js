open Contract;

open StateDataType;

[@bs.send.pipe : array('a)] external unsafeFind : ('a => [@bs.uncurry] bool) => 'a = "find";

let deleteBySwap = (index: int, lastIndex: int, arr: array('item)) => {
  requireCheck(
    () =>
      test(
        "lastIndex should == arr.length",
        () => lastIndex |> assertEqual(Int, Js.Array.length(arr) - 1)
      )
  );
  WonderCommonlib.ArraySystem.unsafeSet(
    arr,
    index,
    WonderCommonlib.ArraySystem.unsafeGet(arr, lastIndex)
  );
  WonderCommonlib.ArraySystem.unsafePop(arr) |> ignore
};

let range = (a: int, b: int) => {
  let result = WonderCommonlib.ArraySystem.createEmpty();
  for (i in a to b) {
    Js.Array.push(i, result) |> ignore
  };
  result
};

let reduceState = (func, state, arr) : state => {
  let mutableState = ref(state);
  for (i in 0 to Js.Array.length(arr) - 1) {
    mutableState := [@bs] func(mutableState^, Array.unsafe_get(arr, i))
  };
  mutableState^
};

let reduceStatei = (func, state, arr) : state => {
  let mutableState = ref(state);
  for (i in 0 to Js.Array.length(arr) - 1) {
    mutableState := [@bs] func(mutableState^, Array.unsafe_get(arr, i), i)
  };
  mutableState^
};

let join = (arr) => {
  let output = ref("");
  for (i in 0 to Js.Array.length(arr)) {
    output := output^ ++ arr[i]
  };
  output^
};

let push = (item, arr) => {
  arr |> Js.Array.push(item) |> ignore;
  arr
};