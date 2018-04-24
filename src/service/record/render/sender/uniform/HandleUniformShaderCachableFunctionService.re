open GlType;

open Gl;

open StateRenderType;

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
  |> WonderCommonlib.SparseMapService.set(shaderIndex, shaderSendCachableFunctionDataArr);

let unsafeGetUniformSendData = (shaderIndex: int, glslSenderRecord) =>
  HandleUniformConfigDataMapService.unsafeGetUniformSendData(
    shaderIndex,
    glslSenderRecord.uniformShaderSendCachableFunctionDataMap
  );