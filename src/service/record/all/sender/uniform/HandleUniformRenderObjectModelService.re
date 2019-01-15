open WonderWebgl.GlType;

open WonderWebgl.Gl;

open GLSLSenderType;

let addUniformSendDataByType =
    (
      (pos, type_),
      {
        renderObjectSendModelDataArr,
        renderObjectSendMaterialDataArr,
        shaderSendNoCachableDataArr,
        shaderSendCachableDataArr,
        shaderSendCachableFunctionDataArr,
        instanceSendNoCachableDataArr,
        noMaterialShaderSendCachableDataArr,
      },
      getDataFunc,
    ) => {
  renderObjectSendModelDataArr:
    renderObjectSendModelDataArr
    |> ArrayService.push(
         {
           pos,
           sendDataFunc:
             SendUniformService.getSendNoCachableDataByType(type_),
           getDataFunc: getDataFunc |> Obj.magic,
         }: uniformRenderObjectSendModelData,
       ),
  renderObjectSendMaterialDataArr,
  shaderSendNoCachableDataArr,
  shaderSendCachableDataArr,
  shaderSendCachableFunctionDataArr,
  instanceSendNoCachableDataArr,
  noMaterialShaderSendCachableDataArr,
};

let setToUniformSendMap =
    (
      shaderIndex,
      uniformRenderObjectSendModelDataMap,
      renderObjectSendModelDataArr,
    ) =>
  uniformRenderObjectSendModelDataMap
  |> WonderCommonlib.SparseMapService.set(
       shaderIndex,
       renderObjectSendModelDataArr,
     )
  |> ignore;

let unsafeGetUniformSendData =
    (shaderIndex: int, {uniformRenderObjectSendModelDataMap}) =>
  HandleUniformConfigDataMapService.unsafeGetUniformSendData(
    shaderIndex,
    uniformRenderObjectSendModelDataMap,
  );