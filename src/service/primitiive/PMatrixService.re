let unsafeGetPMatrix = (index, pMatrixMap) =>
  WonderCommonlib.SparseMapSystem.unsafeGet(index, pMatrixMap)
  |> WonderLog.Contract.ensureCheck(
       (pMatrix) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|pMatrix exist|j}, ~actual={j|not|j}),
                 () => pMatrix |> assertNullableExist
               )
             )
           )
         ),
       StateData.stateData.isDebug
     );

let setDefaultPMatrix = (index, pMatrixMap) =>
  WonderCommonlib.SparseMapSystem.set(
    index,
    Matrix4System.createIdentityMatrix4(),
    pMatrixMap
  );
