open GlType;

open Gl;

open GameObjectType;

open StateDataType;

open GLSLSenderStateUtils;

open GLSLSenderSendDataUtils;

open GLSLSenderConfigDataHandleShaderDataCommon;

let addUniformSendDataByType =
    (
      (program, shaderCacheMap, locationMap),
      (
        sendNoCachableDataArr,
        sendCachableDataArr,
        shaderSendNoCachableDataArr,
        shaderSendCachableFunctionDataArr,
        instanceSendNoCachableDataArr
      ),
      sendDataFunc
    ) => (
  sendNoCachableDataArr,
  sendCachableDataArr,
  shaderSendNoCachableDataArr,
  shaderSendCachableFunctionDataArr
  |> ArraySystem.push(
       {program, shaderCacheMap, locationMap, sendCachableFunctionDataFunc: sendDataFunc}: shaderUniformSendCachableFunctionData
     ),
  instanceSendNoCachableDataArr
);

let setToUniformSendMap =
    (shaderIndex, shaderUniformSendCachableFunctionDataMap, shaderSendCachableFunctionDataArr) =>
  shaderUniformSendCachableFunctionDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, shaderSendCachableFunctionDataArr);

let unsafeGetUniformSendData = (shaderIndex: int, state: StateDataType.state) =>
  GLSLSenderConfigDataHandleUniformUtils.unsafeGetUniformSendData(
    shaderIndex,
    getGLSLSenderData(state).shaderUniformSendCachableFunctionDataMap
  );