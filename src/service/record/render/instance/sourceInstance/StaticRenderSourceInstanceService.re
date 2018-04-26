open InstanceType;

open RenderSourceInstanceType;

let isTransformStatic = (sourceInstance: sourceInstance, {isTransformStaticMap}) =>
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

let markIsSendTransformMatrixData =
    (sourceInstance: sourceInstance, isSend, {isSendTransformMatrixDataMap} as record) => {
  ...record,
  isSendTransformMatrixDataMap:
    MarkIsSendTransformMatrixDataService.markIsSendTransformMatrixData(
      sourceInstance,
      isSend,
      isSendTransformMatrixDataMap
    )
};

let isSendTransformMatrixData = (sourceInstance: sourceInstance, {isSendTransformMatrixDataMap}) =>
  switch (isSendTransformMatrixDataMap |> WonderCommonlib.SparseMapService.get(sourceInstance)) {
  | None => false
  | Some(isSend) => isSend
  };