open GlType;

open Gl;

open GameObjectType;

open StateDataType;

open Contract;

open GLSLSenderStateUtils;

open GLSLSenderSendDataUtils;

open GLSLSenderConfigDataHandleShaderDataCommon;

let addUniformSendDataByType =
    (
      pos,
      (
        sendNoCachableDataList,
        sendCachableDataList,
        shaderSendNoCachableDataList,
        instanceSendNoCachableDataList
      ),
      getDataFunc
    ) => (
  [
    (
      {pos, sendNoCachableDataFunc: sendMatrix4, getNoCachableDataFunc: getDataFunc |> Obj.magic}: uniformSendNoCachableData
    ),
    ...sendNoCachableDataList
  ],
  sendCachableDataList,
  shaderSendNoCachableDataList,
  instanceSendNoCachableDataList
);

let setToUniformSendMap = (shaderIndex, uniformSendNoCachableDataMap, sendNoCachableDataList) =>
  uniformSendNoCachableDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, sendNoCachableDataList)
  |> ignore;

let getUniformSendData = (shaderIndex: int, state: StateDataType.state) =>
  GLSLSenderConfigDataHandleUniformUtils.getUniformSendData(
    shaderIndex,
    getGLSLSenderData(state).uniformSendNoCachableDataMap
  );