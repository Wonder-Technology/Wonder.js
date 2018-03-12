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
/* 
let setPointsWithArray =
    (
      (index: int, points, record, pointsMap),
      (getTypeArrFromPoolFunc, fillTypeArrayFunc, makeTypeArrayFunc),
      state
    ) =>
  switch points {
  | None =>
    let typeArr =
      switch ([@bs] getTypeArrFromPoolFunc(record |> Js.Array.length, state.typeArrayPoolRecord)) {
      | None => [@bs] makeTypeArrayFunc(record)
      | Some(typeArr) => [@bs] fillTypeArrayFunc(typeArr, record, 0)
      };
    pointsMap |> WonderCommonlib.SparseMapSystem.set(index, typeArr)
  | Some(indices) =>
    [@bs] fillTypeArrayFunc(indices, record, 0) |> ignore;
    pointsMap
  }; */

let setPoints = (index: int, record, pointsMap) =>
  pointsMap |> Obj.magic |> WonderCommonlib.SparseMapSystem.set(index, record) |> Obj.magic;