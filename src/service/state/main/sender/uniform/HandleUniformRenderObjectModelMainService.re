open GlType;

open Gl;

open GameObjectType;

open MainStateDataType;



open SendGLSLDataMainService;



let addUniformSendDataByType =
    (
      (pos, type_),
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
  renderObjectSendModelDataArr
  |> ArrayService.push(
       {
         pos,
         sendDataFunc: SendUniformService.getSendNoCachableDataByType(type_),
         getDataFunc: getDataFunc |> Obj.magic
       }: uniformRenderObjectSendModelData
     ),
  renderObjectSendMaterialDataArr,
  shaderSendNoCachableDataArr,
  shaderSendCachableDataArr,
  shaderSendCachableFunctionDataArr,
  instanceSendNoCachableDataArr
);

let setToUniformSendMap =
    (shaderIndex, uniformRenderObjectSendModelDataMap, renderObjectSendModelDataArr) =>
  uniformRenderObjectSendModelDataMap
  |> WonderCommonlib.SparseMapService.set(shaderIndex, renderObjectSendModelDataArr)
  |> ignore;

let unsafeGetUniformSendData = (shaderIndex: int, state: MainStateDataType.state) =>
  HandleUniformConfigDataMapService.unsafeGetUniformSendData(
    shaderIndex,
    state.glslSenderRecord.uniformRenderObjectSendModelDataMap
  );