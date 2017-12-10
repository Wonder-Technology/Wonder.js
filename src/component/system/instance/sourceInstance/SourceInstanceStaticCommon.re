open SourceInstanceType;

open Contract;

let markModelMatrixIsStatic =
    (sourceInstance: sourceInstance, isStatic: bool, state: StateDataType.state) => {
  SourceInstanceStateCommon.getData(state).isModelMatrixStaticMap
  |> WonderCommonlib.SparseMapSystem.set(sourceInstance, isStatic);
  state
};

let isModelMatrixIsStatic = (sourceInstance: sourceInstance, state: StateDataType.state) =>
  SourceInstanceStateCommon.getData(state).isModelMatrixStaticMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(sourceInstance)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "should exist",
             () =>
               SourceInstanceStateCommon.getData(state).isModelMatrixStaticMap
               |> WonderCommonlib.SparseMapSystem.get(sourceInstance)
               |> assertExist
           )
         )
     );

let markSendModelMatrix = (sourceInstance: sourceInstance, isSend, state: StateDataType.state) => {
  SourceInstanceStateCommon.getData(state).isSendModelMatrixDataMap
  |> WonderCommonlib.SparseMapSystem.set(sourceInstance, isSend);
  state
};

let isSendModelMatrix = (sourceInstance: sourceInstance, state: StateDataType.state) =>
  SourceInstanceStateCommon.getData(state).isSendModelMatrixDataMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(sourceInstance)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "should exist",
             () =>
               SourceInstanceStateCommon.getData(state).isSendModelMatrixDataMap
               |> WonderCommonlib.SparseMapSystem.get(sourceInstance)
               |> assertExist
           )
         )
     );