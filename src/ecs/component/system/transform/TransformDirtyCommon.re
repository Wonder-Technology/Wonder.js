open TransformType;

open Contract;

let mark = (transform: transform, isDirty, {dirtyMap} as data) => {
  dirtyMap |> WonderCommonlib.SparseMapSystem.set(transform, isDirty) |> ignore;
  data
};

let rec markHierachyDirty = (transform: transform, {dirtyMap} as data) =>
  data
  |> mark(transform, true)
  |> TransformHierachyCommon.unsafeGetChildren(transform)
  |> WonderCommonlib.ArraySystem.reduceOneParam([@bs] ((data, child) => markHierachyDirty(child, data)), data);

let isDirty = (transform: transform, {dirtyMap} as data) =>
  dirtyMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(transform)
  |> ensureCheck(
       (isDirty) =>
         Contract.Operators.(
           test(
             "should return bool",
             () => {
               dirtyMap |> WonderCommonlib.SparseMapSystem.get(transform) |> assertExist;
               isDirty |> assertIsBool
             }
           )
         )
     );