open WonderWebgl.GlType;

open WonderWebgl.Gl;

open StateRenderType;

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

let unsafeGetUniformSendData = (shaderIndex: int, {uniformRenderObjectSendModelDataMap}) =>
  HandleUniformConfigDataMapService.unsafeGetUniformSendData(
    shaderIndex,
    uniformRenderObjectSendModelDataMap
  );