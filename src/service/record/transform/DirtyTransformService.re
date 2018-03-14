open TransformType;

let mark = (transform: transform, isDirty, {dirtyMap} as record) => {
  dirtyMap |> WonderCommonlib.SparseMapSystem.set(transform, isDirty) |> ignore;
  record
  /* ...record,
     dirtyMap: dirtyMap |> WonderCommonlib.SparseMapSystem.set(transform, isDirty) */
};

let isDirty = (transform: transform, {dirtyMap} as record) =>
  dirtyMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(transform)
  |> WonderLog.Contract.ensureCheck(
       (isDirty) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|return bool|j}, ~actual={j|not|j}),
                 () => {
                   isDirty |> assertNullableExist;
                   isDirty |> assertIsBool
                 }
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(MainStateData.stateData)
     );