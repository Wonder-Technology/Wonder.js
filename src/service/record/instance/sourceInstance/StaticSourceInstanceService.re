open SourceInstanceType;

let markModelMatrixIsStatic =
    (sourceInstance: sourceInstance, isStatic: bool, {isTransformStaticMap} as record) => {
  ...record,
  isTransformStaticMap:
    isTransformStaticMap |> WonderCommonlib.SparseMapSystem.set(sourceInstance, isStatic)
};

let isTransformStatic = (sourceInstance: sourceInstance, {isTransformStaticMap}) =>
  isTransformStaticMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(sourceInstance)
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
       StateData.stateData.isDebug
     );

let markIsSendTransformMatrixData =
    (sourceInstance: sourceInstance, isSend, {isSendTransformMatrixDataMap} as record) => {
  ...record,
  isSendTransformMatrixDataMap:
    isSendTransformMatrixDataMap |> WonderCommonlib.SparseMapSystem.set(sourceInstance, isSend)
};

let isSendTransformMatrixData = (sourceInstance: sourceInstance, {isSendTransformMatrixDataMap}) =>
  isSendTransformMatrixDataMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(sourceInstance)
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
       StateData.stateData.isDebug
     );