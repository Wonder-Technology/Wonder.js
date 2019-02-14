open TransformType;

let mark = (transform: transform, isDirty, {dirtyMap} as record) => {
  dirtyMap |> WonderCommonlib.MutableSparseMapService.set(transform, isDirty) |> ignore;
  record
};

let isDirty = (transform: transform, {dirtyMap} as record) =>
  dirtyMap
  |> WonderCommonlib.MutableSparseMapService.unsafeGet(transform) === true
  |> WonderLog.Contract.ensureCheck(
       (isDirty) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|return bool|j}, ~actual={j|not|j}),
                 () => {
                   /* isDirty |> assertNullableExist; */
                   isDirty |> assertIsBool
                 }
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     );