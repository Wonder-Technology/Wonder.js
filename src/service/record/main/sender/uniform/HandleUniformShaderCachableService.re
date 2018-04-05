open GlType;

open Gl;

open SendGLSLDataService;

let addUniformSendDataByType =
    (
      (shaderCacheMap, name, pos, type_),
      (
        renderObjectSendModelDataArr,
        renderObjectSendMaterialDataArr,
        shaderSendNoCachableDataArr,
        shaderSendCachableDataArr,
        shaderSendCachableFunctionDataArr,
        instanceSendNoCachableDataArr
      ),
      getDataFunc
    ) => (
  renderObjectSendModelDataArr,
  renderObjectSendMaterialDataArr,
  shaderSendNoCachableDataArr,
  shaderSendCachableDataArr
  |> ArrayService.push(
       {
         shaderCacheMap,
         name,
         pos,
         getDataFunc: getDataFunc |> Obj.magic,
         sendDataFunc: SendUniformService.getSendCachableDataByType(type_)
       }: uniformShaderSendCachableData
     ),
  shaderSendCachableFunctionDataArr,
  instanceSendNoCachableDataArr
);

let setToUniformSendMap =
    (shaderIndex, uniformShaderSendCachableDataMap, shaderSendCachableDataArr) =>
  uniformShaderSendCachableDataMap
  |> WonderCommonlib.SparseMapService.set(shaderIndex, shaderSendCachableDataArr);

let unsafeGetUniformSendData = (shaderIndex: int, glslSenderRecord) =>
  HandleUniformConfigDataMapService.unsafeGetUniformSendData(
    shaderIndex,
    glslSenderRecord.uniformShaderSendCachableDataMap
  );