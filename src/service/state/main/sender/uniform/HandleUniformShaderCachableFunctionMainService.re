open GlType;

open Gl;

open GameObjectType;

open StateDataType;

open SendGLSLDataMainService;

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
  |> ArrayService.push(
       {program, shaderCacheMap, locationMap, sendCachableFunctionDataFunc: sendDataFunc}: uniformShaderSendCachableFunctionData
     ),
  instanceSendNoCachableDataArr
);

let setToUniformSendMap =
    (shaderIndex, uniformShaderSendCachableFunctionDataMap, shaderSendCachableFunctionDataArr) =>
  uniformShaderSendCachableFunctionDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, shaderSendCachableFunctionDataArr);

let unsafeGetUniformSendData = (shaderIndex: int, state: StateDataType.state) =>
  HandleUniformConfigDataMapService.unsafeGetUniformSendData(
    shaderIndex,
    state.glslSenderRecord.uniformShaderSendCachableFunctionDataMap
  );