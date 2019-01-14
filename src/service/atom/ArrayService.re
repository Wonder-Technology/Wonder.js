[@bs.send.pipe: array('a)]
external unsafeFind : ('a => [@bs.uncurry] bool) => 'a = "find";

let deleteBySwap = (index: int, lastIndex: int, arr: array('item)) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      let len = arr |> Js.Array.length;
      test(
        Log.buildAssertMessage(
          ~expect={j|lastIndex:$lastIndex === arr.length:$len|j},
          ~actual={j|not|j},
        ),
        () =>
        lastIndex |> assertEqual(Int, Js.Array.length(arr) - 1)
      );
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  WonderCommonlib.ArrayService.unsafeSet(
    arr,
    index,
    WonderCommonlib.ArrayService.unsafeGet(arr, lastIndex),
  );
  WonderCommonlib.ArrayService.unsafePop(arr) |> ignore;
};

let range = (a: int, b: int) => {
  let result = WonderCommonlib.ArrayService.createEmpty();
  for (i in a to b) {
    Js.Array.push(i, result) |> ignore;
  };
  result;
};

let rangeReverse = (a: int, b: int) => {
  let result = WonderCommonlib.ArrayService.createEmpty();
  for (i in a downto b) {
    Js.Array.push(i, result) |> ignore;
  };
  result;
};

let join = arr => {
  let output = ref("");
  for (i in 0 to Js.Array.length(arr)) {
    output := output^ ++ arr[i];
  };
  output^;
};

let push = (item, arr) => {
  arr |> Js.Array.push(item) |> ignore;
  arr;
};

let unsafeGetFirst = arr => Array.unsafe_get(arr, 0);

let getFirst = arr => unsafeGetFirst(arr) |> Obj.magic |> Js.toOption;

let unsafeFindFirst = (arr: array('a), targetValue, func) =>
  arr
  |> unsafeFind(func)
  |> WonderLog.Contract.ensureCheck(
       first => {
         open WonderLog;
         open Contract;
         open Operators;
         let arrJson = WonderLog.Log.getJsonStr(arr);
         test(
           Log.buildAssertMessage(
             ~expect={j|find $targetValue in $arrJson|j},
             ~actual={j|not|j},
           ),
           () =>
           first |> assertNullableExist
         );
       },
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );

let findFirst = (arr: array('a), targetValue, func) =>
  arr |> Js.Array.find(func);

let unsafeGetLast = arr => Array.unsafe_get(arr, Js.Array.length(arr) - 1);

let getLast = arr => unsafeGetLast(arr) |> Obj.magic |> Js.toOption;

let getNth = (index, arr) =>
  Array.unsafe_get(arr, index) |> Obj.magic |> Js.toOption;

/* let removeDuplicateItems = (isDuplicateFunc, arr) => { */
let removeDuplicateItems = (buildKeyFunc, arr) => {
  open WonderCommonlib;
  let resultArr = [||];
  let map = HashMapService.createEmpty();
  for (i in 0 to Js.Array.length(arr) - 1) {
    let item = Array.unsafe_get(arr, i);
    /* let key = Js.Int.toString(item); */
    let key = buildKeyFunc(. item);
    switch (HashMapService.get(key, map)) {
    | None =>
      Js.Array.push(item, resultArr) |> ignore;
      HashMapService.set(key, item, map) |> ignore;
    /* setMapFunc() */
    | Some(_) => ()
    };
  };
  resultArr;
};

let isNotValid = value =>
  Obj.magic(value) === Js.Nullable.null
  || Obj.magic(value) === Js.Nullable.undefined;

let reduceOneParamValidi = (func, param, arr) => {
  let mutableParam = ref(param);
  for (i in 0 to Js.Array.length(arr) - 1) {
    let value = Array.unsafe_get(arr, i);

    if (isNotValid(value)) {
      ();
    } else {
      mutableParam := func(. mutableParam^, Array.unsafe_get(arr, i), i);
    };
  };
  mutableParam^;
};

let fastConcat = (arr1, arr2) =>
  arr2
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. arr1, value2) => arr1 |> push(value2),
       arr1,
     );