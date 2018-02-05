open SourceInstanceType;

let markModelMatrixIsStatic =
    (sourceInstance: sourceInstance, isStatic: bool, state: StateDataType.state) => {
  let {isModelMatrixStaticMap} as data = SourceInstanceStateCommon.getSourceInstanceData(state);
  {
    ...state,
    sourceInstanceData: {
      ...data,
      isModelMatrixStaticMap:
        isModelMatrixStaticMap |> WonderCommonlib.SparseMapSystem.set(sourceInstance, isStatic)
    }
  }
};

let isModelMatrixIsStatic = (sourceInstance: sourceInstance, state: StateDataType.state) =>
  SourceInstanceStateCommon.getSourceInstanceData(state).isModelMatrixStaticMap
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

let markSendModelMatrix = (sourceInstance: sourceInstance, isSend, state: StateDataType.state) => {
  let {isSendModelMatrixDataMap} as data = SourceInstanceStateCommon.getSourceInstanceData(state);
  {
    ...state,
    sourceInstanceData: {
      ...data,
      isSendModelMatrixDataMap:
        isSendModelMatrixDataMap |> WonderCommonlib.SparseMapSystem.set(sourceInstance, isSend)
    }
  }
};

let isSendModelMatrix = (sourceInstance: sourceInstance, state: StateDataType.state) =>
  SourceInstanceStateCommon.getSourceInstanceData(state).isSendModelMatrixDataMap
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