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
  renderObjectSendMaterialDataArr,
  shaderSendNoCachableDataArr,
  shaderSendCachableDataArr:
    shaderSendCachableDataArr
    |> ArrayService.push(
         {
           shaderCacheMap,
           name,
           pos,
           getDataFunc: getDataFunc |> Obj.magic,
           sendDataFunc: SendUniformService.getSendCachableDataByType(type_),
         }: uniformShaderSendCachableData,
       ),
  shaderSendCachableFunctionDataArr,
  instanceSendNoCachableDataArr,
  noMaterialShaderSendCachableDataArr,
};

let setToUniformSendMap =
    (shaderIndex, uniformShaderSendCachableDataMap, shaderSendCachableDataArr) =>
  uniformShaderSendCachableDataMap
  |> WonderCommonlib.MutableSparseMapService.set(
       shaderIndex,
       shaderSendCachableDataArr,
     );

let reduceiValidShaderSendCachableData = (glslSenderRecord, func, initValue) =>
  glslSenderRecord.uniformShaderSendCachableDataMap
  |> WonderCommonlib.MutableSparseMapService.reduceiValid(func, initValue);

let removeData =
    (shaderIndex, {uniformShaderSendCachableDataMap} as glslSenderRecord) => {
  WonderCommonlib.MutableSparseMapService.has(
    shaderIndex,
    uniformShaderSendCachableDataMap,
  ) ?
    uniformShaderSendCachableDataMap
    |> WonderCommonlib.MutableSparseMapService.deleteVal(shaderIndex)
    |> ignore :
    ();

  glslSenderRecord;
};