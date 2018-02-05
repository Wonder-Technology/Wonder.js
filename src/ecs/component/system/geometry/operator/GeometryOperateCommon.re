open GeometryGetStateDataCommon;

open Js.Typed_array;

open TypeArrayUtils;

open GeometryType;

open StateDataType;

let getPoints = (index: int, pointsMap) => pointsMap |> WonderCommonlib.SparseMapSystem.get(index);

let unsafeGetPoints = (index: int, pointsMap) =>
  pointsMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(index)
  |> WonderLog.Contract.ensureCheck(
       (points) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|points exist|j}, ~actual={j|not|j}),
                 () => points |> assertNullableExist
               )
             )
           )
         ),
       StateData.stateData.isDebug
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
    pointsMap |> WonderCommonlib.SparseMapSystem.set(index, typeArr)
  | Some(indices) =>
    [@bs] fillTypeArrayFunc(indices, data, 0) |> ignore;
    pointsMap
  };

let setPoints = (index: int, data, pointsMap) =>
  pointsMap |> Obj.magic |> WonderCommonlib.SparseMapSystem.set(index, data) |> Obj.magic;