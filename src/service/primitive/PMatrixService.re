let unsafeGetPMatrix = (index, pMatrixMap) =>
  WonderCommonlib.MutableSparseMapService.unsafeGet(index, pMatrixMap)
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
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     );

let setDefaultPMatrix = (index, pMatrixMap) =>
  WonderCommonlib.MutableSparseMapService.set(
    index,
    Matrix4Service.createIdentityMatrix4(),
    pMatrixMap
  );
