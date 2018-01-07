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
        sendNoCachableDataList,
        sendCachableDataList,
        shaderSendNoCachableDataList,
        instanceSendNoCachableDataList
      ),
      getDataFunc
    ) => (
  sendNoCachableDataList,
  [
    (
      {
        shaderCacheMap,
        name,
        pos,
        sendCachableDataFunc: sendFloat3,
        getCachableDataFunc: getDataFunc |> Obj.magic
      }: uniformSendCachableData
    ),
    ...sendCachableDataList
  ],
  shaderSendNoCachableDataList,
  instanceSendNoCachableDataList
);

let setToUniformSendMap =
    (shaderIndex, uniformSendCachableDataMap, sendCachableDataList) =>
  uniformSendCachableDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, sendCachableDataList)
  |> ignore;

let getUniformSendData = (shaderIndex: int, state: StateDataType.state) =>
  GLSLSenderConfigDataHandleUniformUtils.getUniformSendData(
    shaderIndex,
    getGLSLSenderData(state).uniformSendCachableDataMap
  );