open SourceInstanceType;

let markModelMatrixIsStatic =
    (sourceInstance: sourceInstance, isStatic: bool, state: StateDataType.state) => {
  let {isTransformStaticMap} as data = SourceInstanceStateCommon.getSourceInstanceData(state);
  {
    ...state,
    sourceInstanceData: {
      ...data,
      isTransformStaticMap:
        isTransformStaticMap |> WonderCommonlib.SparseMapSystem.set(sourceInstance, isStatic)
    }
  }
};

let isTransformStatic = (sourceInstance: sourceInstance, state: StateDataType.state) =>
  SourceInstanceStateCommon.getSourceInstanceData(state).isTransformStaticMap
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

let markIsSendTransformMatrixData = (sourceInstance: sourceInstance, isSend, state: StateDataType.state) => {
  let {isSendTransformMatrixDataMap} as data = SourceInstanceStateCommon.getSourceInstanceData(state);
  {
    ...state,
    sourceInstanceData: {
      ...data,
      isSendTransformMatrixDataMap:
        isSendTransformMatrixDataMap |> WonderCommonlib.SparseMapSystem.set(sourceInstance, isSend)
    }
  }
};

let isSendTransformMatrixData = (sourceInstance: sourceInstance, state: StateDataType.state) =>
  SourceInstanceStateCommon.getSourceInstanceData(state).isSendTransformMatrixDataMap
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