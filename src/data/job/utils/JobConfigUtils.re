let unsafeFindFirst = (arr: array('a), targetValue, func) =>
  arr
  |> ArraySystem.unsafeFind(func)
  |> WonderLog.Contract.ensureCheck(
       (first) => {
         open WonderLog;
         open Contract;
         open Operators;
         let arrJson = WonderLog.Log.getJsonStr(arr);
         test(
           Log.buildAssertMessage(~expect={j|find $targetValue in $arrJson|j}, ~actual={j|not|j}),
           () => first |> assertNullableExist
         )
       },
       StateData.stateData.isDebug
     );

let findFirst = (arr: array('a), targetValue, func) => arr |> Js.Array.find(func);

let filterTargetName = (name, targetName) => name == targetName;