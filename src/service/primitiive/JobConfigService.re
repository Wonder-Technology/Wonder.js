let unsafeFindFirst = (arr: array('a), targetValue, func) =>
  arr
  |> ArrayService.unsafeFind(func)
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
       IsDebugMainService.getIsDebug(MainStateData.stateData)
     );

let findFirst = (arr: array('a), targetValue, func) => arr |> Js.Array.find(func);

let filterTargetName = (name, targetName) => name == targetName;

let _throwJobFlagsShouldBeDefined = () =>
  WonderLog.Log.fatal(
    WonderLog.Log.buildFatalMessage(
      ~title="throwJobFlagsShouldBeDefined",
      ~description={j|jobFlags should be defined|j},
      ~reason="",
      ~solution={j||j},
      ~params={j||j}
    )
  );

let unsafeGetFlags = (flags) =>
  switch flags {
  | None => _throwJobFlagsShouldBeDefined()
  | Some(flags) => flags
  };