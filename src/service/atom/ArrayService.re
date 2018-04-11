[@bs.send.pipe : array('a)] external unsafeFind : ('a => [@bs.uncurry] bool) => 'a = "find";

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
          ~actual={j|not|j}
        ),
        () => lastIndex |> assertEqual(Int, Js.Array.length(arr) - 1)
      )
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  WonderCommonlib.ArrayService.unsafeSet(
    arr,
    index,
    WonderCommonlib.ArrayService.unsafeGet(arr, lastIndex)
  );
  WonderCommonlib.ArrayService.unsafePop(arr) |> ignore
};

let range = (a: int, b: int) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|b:$b should >= a:$a|j}, ~actual={j|not|j}),
              () => b >= a
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  let result = WonderCommonlib.ArrayService.createEmpty();
  for (i in a to b) {
    Js.Array.push(i, result) |> ignore
  };
  result
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