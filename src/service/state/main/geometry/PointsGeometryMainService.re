open MainStateDataType;

/* let setPointsWithArray =
   (
     (index: int, points, record, pointsMap),
     (getTypeArrFromPoolFunc, fillTypeArrayFunc, makeTypeArrayFunc),
     typeArrayPoolRecord
   ) => */
let setPointsWithArray =
    (
      (index: int, points, record),
      (getTypeArrFromPoolFunc, fillTypeArrayFunc, makeTypeArrayFunc),
      (typeArrayPoolRecord, pointsMap)
    ) =>
  switch points {
  | None =>
    let typeArr =
      switch ([@bs] getTypeArrFromPoolFunc(record |> Js.Array.length, typeArrayPoolRecord)) {
      | None => [@bs] makeTypeArrayFunc(record)
      | Some(typeArr) => [@bs] fillTypeArrayFunc(typeArr, record, 0)
      };
    (typeArrayPoolRecord, pointsMap |> WonderCommonlib.SparseMapSystem.set(index, typeArr))
  | Some(indices) =>
    [@bs] fillTypeArrayFunc(indices, record, 0) |> ignore;
    (typeArrayPoolRecord, pointsMap)
  };