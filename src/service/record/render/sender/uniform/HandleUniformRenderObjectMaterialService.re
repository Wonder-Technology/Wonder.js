open GlType;

open Gl;

open StateRenderType;

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
  renderObjectSendMaterialDataArr
  |> ArrayService.push(
       {
         shaderCacheMap,
         name,
         pos,
         sendDataFunc: SendUniformService.getSendCachableDataByType(type_),
         getDataFunc: getDataFunc |> Obj.magic
       }: uniformRenderObjectSendMaterialData
     ),
  shaderSendNoCachableDataArr,
  shaderSendCachableDataArr,
  shaderSendCachableFunctionDataArr,
  instanceSendNoCachableDataArr
);

let addUniformTextureSendDataByType =
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
  renderObjectSendMaterialDataArr
  |> ArrayService.push(
       {
         shaderCacheMap,
         name,
         pos,
         sendDataFunc: SendTextureRenderService.sendData |> Obj.magic,
         getDataFunc: getDataFunc |> Obj.magic
       }: uniformRenderObjectSendMaterialData
     ),
  shaderSendNoCachableDataArr,
  shaderSendCachableDataArr,
  shaderSendCachableFunctionDataArr,
  instanceSendNoCachableDataArr
);

let setToUniformSendMap =
    (shaderIndex, uniformRenderObjectSendMaterialDataMap, renderObjectSendMaterialDataArr) =>
  uniformRenderObjectSendMaterialDataMap
  |> WonderCommonlib.SparseMapService.set(shaderIndex, renderObjectSendMaterialDataArr)
  |> ignore;

let unsafeGetUniformSendData = (shaderIndex: int, glslSenderRecord) =>
  HandleUniformConfigDataMapService.unsafeGetUniformSendData(
    shaderIndex,
    glslSenderRecord.uniformRenderObjectSendMaterialDataMap
  );