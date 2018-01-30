open GlType;

open Gl;

open GameObjectType;

open StateDataType;

open GLSLSenderStateUtils;

open GLSLSenderSendDataUtils;

open GLSLSenderConfigDataHandleShaderDataCommon;

let addUniformSendDataByType =
    (
      (shaderCacheMap, name, pos),
      (
        sendNoCachableDataArr,
        sendCachableDataArr,
        shaderSendNoCachableDataArr,
        shaderSendCachableFunctionDataArr,
        instanceSendNoCachableDataArr
      ),
      (getDataFunc, sendDataFunc)
    ) => (
  sendNoCachableDataArr,
  sendCachableDataArr
  |> ArraySystem.push(
       {
         shaderCacheMap,
         name,
         pos,
         sendCachableDataFunc: sendDataFunc,
         getCachableDataFunc: getDataFunc |> Obj.magic
       }: uniformSendCachableData
     ),
  shaderSendNoCachableDataArr,
  shaderSendCachableFunctionDataArr,
  instanceSendNoCachableDataArr
);

let setToUniformSendMap = (shaderIndex, uniformSendCachableDataMap, sendCachableDataArr) =>
  uniformSendCachableDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, sendCachableDataArr)
  |> ignore;

let unsafeGetUniformSendData = (shaderIndex: int, state: StateDataType.state) =>
  GLSLSenderConfigDataHandleUniformUtils.unsafeGetUniformSendData(
    shaderIndex,
    getGLSLSenderData(state).uniformSendCachableDataMap
  );