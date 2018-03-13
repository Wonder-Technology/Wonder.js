open GlType;

open Gl;

open GameObjectType;

open StateDataType;



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
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, renderObjectSendMaterialDataArr)
  |> ignore;

let unsafeGetUniformSendData = (shaderIndex: int, state: StateDataType.state) =>
  HandleUniformConfigDataMapService.unsafeGetUniformSendData(
    shaderIndex,
    state.glslSenderRecord.uniformRenderObjectSendMaterialDataMap
  );