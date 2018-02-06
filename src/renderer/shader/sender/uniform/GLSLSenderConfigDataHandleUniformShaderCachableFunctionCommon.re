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
        renderObjectSendModelDataArr,
        renderObjectSendMaterialDataArr,
        shaderSendNoCachableDataArr,
        shaderSendCachableDataArr,
        shaderSendCachableFunctionDataArr,
        instanceSendNoCachableDataArr
      ),
      sendDataFunc
    ) => (
  renderObjectSendModelDataArr,
  renderObjectSendMaterialDataArr,
  shaderSendNoCachableDataArr,
  shaderSendCachableDataArr,
  shaderSendCachableFunctionDataArr
  |> ArraySystem.push(
       {program, shaderCacheMap, locationMap, sendCachableFunctionDataFunc: sendDataFunc}: uniformShaderSendCachableFunctionData
     ),
  instanceSendNoCachableDataArr
);

let setToUniformSendMap =
    (shaderIndex, uniformShaderSendCachableFunctionDataMap, shaderSendCachableFunctionDataArr) =>
  uniformShaderSendCachableFunctionDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, shaderSendCachableFunctionDataArr);

let unsafeGetUniformSendData = (shaderIndex: int, state: StateDataType.state) =>
  GLSLSenderConfigDataHandleUniformUtils.unsafeGetUniformSendData(
    shaderIndex,
    getGLSLSenderData(state).uniformShaderSendCachableFunctionDataMap
  );