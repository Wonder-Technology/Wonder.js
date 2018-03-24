open GlType;

open Gl;

open MainStateDataType;

open MainStateDataType;



open SendGLSLDataMainService;



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

let setToUniformSendMap =
    (shaderIndex, uniformRenderObjectSendMaterialDataMap, renderObjectSendMaterialDataArr) =>
  uniformRenderObjectSendMaterialDataMap
  |> WonderCommonlib.SparseMapService.set(shaderIndex, renderObjectSendMaterialDataArr)
  |> ignore;

let unsafeGetUniformSendData = (shaderIndex: int, state: MainStateDataType.state) =>
  HandleUniformConfigDataMapService.unsafeGetUniformSendData(
    shaderIndex,
    state.glslSenderRecord.uniformRenderObjectSendMaterialDataMap
  );