open InstanceType;

open SourceInstanceType;

let markModelMatrixIsStatic =
    (sourceInstance: sourceInstance, isStatic: bool, {isTransformStaticMap} as record) => {
  ...record,
  isTransformStaticMap:
    isTransformStaticMap |> WonderCommonlib.SparseMapService.set(sourceInstance, isStatic)
};

let isTransformStatic = (sourceInstance: sourceInstance, isTransformStaticMap) =>
  isTransformStaticMap
  |> WonderCommonlib.SparseMapService.unsafeGet(sourceInstance)
  |> WonderLog.Contract.ensureCheck(
       (isStatic) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|isStatic exist|j}, ~actual={j|not|j}),
                 () => isStatic |> assertNullableExist
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     );

let isSendTransformMatrixData = (sourceInstance: sourceInstance, isSendTransformMatrixDataMap) =>
  switch (isSendTransformMatrixDataMap |> WonderCommonlib.SparseMapService.get(sourceInstance)) {
  | None => false
  | Some(isSend) => isSend
  };