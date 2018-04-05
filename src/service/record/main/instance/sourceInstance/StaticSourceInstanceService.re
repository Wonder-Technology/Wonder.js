open SourceInstanceType;

let markModelMatrixIsStatic =
    (sourceInstance: sourceInstance, isStatic: bool, {isTransformStaticMap} as record) => {
  ...record,
  isTransformStaticMap:
    isTransformStaticMap |> WonderCommonlib.SparseMapService.set(sourceInstance, isStatic)
};

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
       IsDebugMainService.getIsDebug(MainStateData.stateData)
     );

let markIsSendTransformMatrixData =
    (sourceInstance: sourceInstance, isSend, {isSendTransformMatrixDataMap} as record) => {
  ...record,
  isSendTransformMatrixDataMap:
    isSendTransformMatrixDataMap |> WonderCommonlib.SparseMapService.set(sourceInstance, isSend)
};

let isSendTransformMatrixData = (sourceInstance: sourceInstance, {isSendTransformMatrixDataMap}) =>
  isSendTransformMatrixDataMap
  |> WonderCommonlib.SparseMapService.unsafeGet(sourceInstance)
  |> WonderLog.Contract.ensureCheck(
       (isSend) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|isSend exist|j}, ~actual={j|not|j}),
                 () => isSend |> assertNullableExist
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(MainStateData.stateData)
     );