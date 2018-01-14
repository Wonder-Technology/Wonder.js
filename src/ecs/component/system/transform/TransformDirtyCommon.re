open TransformType;

let mark = (transform: transform, isDirty, {dirtyMap} as data) => {
  dirtyMap |> WonderCommonlib.SparseMapSystem.set(transform, isDirty) |> ignore;
  data
};

let rec markHierachyDirty = (transform: transform, {dirtyMap} as data) =>
  data
  |> mark(transform, true)
  |> TransformHierachyCommon.unsafeGetChildren(transform)
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs] ((data, child) => markHierachyDirty(child, data)),
       data
     );

let isDirty = (transform: transform, {dirtyMap} as data) =>
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
       StateData.stateData.isTest
     );