open SourceInstanceType;

let markModelMatrixIsStatic =
    (sourceInstance: sourceInstance, isStatic: bool, state: StateDataType.state) => {
  SourceInstanceStateCommon.getSourceInstanceData(state).isModelMatrixStaticMap
  |> WonderCommonlib.SparseMapSystem.set(sourceInstance, isStatic)
  |> ignore;
  state
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
       StateData.stateData.isTest
     );

let markSendModelMatrix = (sourceInstance: sourceInstance, isSend, state: StateDataType.state) => {
  SourceInstanceStateCommon.getSourceInstanceData(state).isSendModelMatrixDataMap
  |> WonderCommonlib.SparseMapSystem.set(sourceInstance, isSend)
  |> ignore;
  state
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
       StateData.stateData.isTest
     );