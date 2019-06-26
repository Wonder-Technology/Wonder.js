open WonderWebgl.GlType;

open WonderWebgl.Gl;

open AllGLSLSenderType;

let addUniformSendDataByType =
    (
      (shaderCacheMap, name, pos, type_),
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
  renderObjectSendModelDataArr,
  renderObjectSendMaterialDataArr:
    renderObjectSendMaterialDataArr
    |> ArrayService.push(
         {
           shaderCacheMap,
           name,
           pos,
           sendDataFunc: SendUniformService.getSendCachableDataByType(type_),
           getDataFunc: getDataFunc |> Obj.magic,
         }: uniformRenderObjectSendMaterialData,
       ),
  shaderSendNoCachableDataArr,
  shaderSendCachableDataArr,
  shaderSendCachableFunctionDataArr,
  instanceSendNoCachableDataArr,
  noMaterialShaderSendCachableDataArr,
};

let addUniformTextureSendDataByType =
    (
      (shaderCacheMap, name, pos, type_),
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
  renderObjectSendModelDataArr,
  renderObjectSendMaterialDataArr:
    renderObjectSendMaterialDataArr
    |> ArrayService.push(
         {
           shaderCacheMap,
           name,
           pos,
           /* sendDataFunc: SendTextureRenderService.sendData |> Obj.magic, */
           sendDataFunc: SendGLSLDataService.sendInt |> Obj.magic,
           getDataFunc: getDataFunc |> Obj.magic,
         }: uniformRenderObjectSendMaterialData,
       ),
  shaderSendNoCachableDataArr,
  shaderSendCachableDataArr,
  shaderSendCachableFunctionDataArr,
  instanceSendNoCachableDataArr,
  noMaterialShaderSendCachableDataArr,
};

let setToUniformSendMap =
    (
      shaderIndex,
      uniformRenderObjectSendMaterialDataMap,
      renderObjectSendMaterialDataArr,
    ) =>
  uniformRenderObjectSendMaterialDataMap
  |> WonderCommonlib.MutableSparseMapService.set(
       shaderIndex,
       renderObjectSendMaterialDataArr,
     )
  |> ignore;

let unsafeGetUniformSendData = (shaderIndex: int, glslSenderRecord) =>
  HandleUniformConfigDataMapService.unsafeGetUniformSendData(
    shaderIndex,
    glslSenderRecord.uniformRenderObjectSendMaterialDataMap,
  );