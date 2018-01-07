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
        sendNoCacheableDataList,
        sendCacheableDataList,
        shaderSendNoCacheableDataList,
        instanceSendNoCacheableDataList
      ),
      getDataFunc
    ) => (
  [
    (
      {pos, sendNoCacheableDataFunc: sendMatrix4, getNoCacheableDataFunc: getDataFunc |> Obj.magic}: uniformSendNoCacheableData
    ),
    ...sendNoCacheableDataList
  ],
  sendCacheableDataList,
  shaderSendNoCacheableDataList,
  instanceSendNoCacheableDataList
);

let setToUniformSendMap = (shaderIndex, uniformSendNoCacheableDataMap, sendNoCacheableDataList) =>
  uniformSendNoCacheableDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, sendNoCacheableDataList)
  |> ignore;

let getUniformSendData = (shaderIndex: int, state: StateDataType.state) =>
  GLSLSenderConfigDataHandleUniformUtils.getUniformSendData(
    shaderIndex,
    getGLSLSenderData(state).uniformSendNoCacheableDataMap
  );