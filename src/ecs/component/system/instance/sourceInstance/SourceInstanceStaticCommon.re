open SourceInstanceType;

open Contract;

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
  |> ensureCheck(
       (isStatic) =>
         Contract.Operators.(test("should exist", () => isStatic |> assertNullableExist))
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
  |> ensureCheck(
       (isSend) => Contract.Operators.(test("should exist", () => isSend |> assertNullableExist))
     );