open Contract;

open GeometryGetStateDataCommon;

open Js.Typed_array;

open TypeArrayUtils;

open GeometryType;

open StateDataType;

let getPoints = (index: int, pointsMap) => pointsMap |> WonderCommonlib.SparseMapSystem.get(index);

let unsafeGetPoints = (index: int, pointsMap) =>
  pointsMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(index)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "indices should exist",
             () => pointsMap |> WonderCommonlib.SparseMapSystem.get(index) |> assertExist
           )
         )
     );

let setPointsWithArray =
    (
      (index: int, points, data, pointsMap),
      (getTypeArrFromPoolFunc, fillTypeArrayFunc, makeTypeArrayFunc),
      state
    ) =>
  switch points {
  | None =>
    let typeArr =
      switch ([@bs] getTypeArrFromPoolFunc(data |> Js.Array.length, state)) {
      | None => [@bs] makeTypeArrayFunc(data)
      | Some(typeArr) => [@bs] fillTypeArrayFunc(typeArr, data, 0)
      };
    pointsMap |> WonderCommonlib.SparseMapSystem.set(index, typeArr) |> ignore;
    state
  | Some(indices) =>
    [@bs] fillTypeArrayFunc(indices, data, 0) |> ignore;
    state
  };

let setPoints = (index: int, pointsMap, data) =>
  pointsMap |> WonderCommonlib.SparseMapSystem.set(index, data);