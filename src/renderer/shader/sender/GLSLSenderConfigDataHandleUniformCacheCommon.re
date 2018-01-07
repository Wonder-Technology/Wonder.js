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
      (shaderCacheMap, name, pos),
      (
        sendNoCacheableDataList,
        sendCacheableDataList,
        shaderSendNoCacheableDataList,
        instanceSendNoCacheableDataList
      ),
      getDataFunc
    ) => (
  sendNoCacheableDataList,
  [
    (
      {
        shaderCacheMap,
        name,
        pos,
        sendCacheableDataFunc: sendFloat3,
        getCacheableDataFunc: getDataFunc |> Obj.magic
      }: uniformSendCacheableData
    ),
    ...sendCacheableDataList
  ],
  shaderSendNoCacheableDataList,
  instanceSendNoCacheableDataList
);

let setToUniformSendMap =
    (shaderIndex, uniformSendCacheableDataMap, sendCacheableDataList) =>
  uniformSendCacheableDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, sendCacheableDataList)
  |> ignore;

let getUniformSendData = (shaderIndex: int, state: StateDataType.state) =>
  GLSLSenderConfigDataHandleUniformUtils.getUniformSendData(
    shaderIndex,
    getGLSLSenderData(state).uniformSendCacheableDataMap
  );