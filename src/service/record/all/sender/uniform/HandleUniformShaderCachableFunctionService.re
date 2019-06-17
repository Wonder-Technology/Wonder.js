open WonderWebgl.GlType;

open WonderWebgl.Gl;

open AllGLSLSenderType;

let addUniformSendDataByType =
    (
      (program, shaderCacheMap, locationMap),
      {
        renderObjectSendModelDataArr,
        renderObjectSendMaterialDataArr,
        shaderSendNoCachableDataArr,
        shaderSendCachableDataArr,
        shaderSendCachableFunctionDataArr,
        instanceSendNoCachableDataArr,
        noMaterialShaderSendCachableDataArr,
      },
      sendDataFunc,
    ) => {
  renderObjectSendModelDataArr,
  renderObjectSendMaterialDataArr,
  shaderSendNoCachableDataArr,
  shaderSendCachableDataArr,
  shaderSendCachableFunctionDataArr:
    shaderSendCachableFunctionDataArr
    |> ArrayService.push(
         {
           program,
           shaderCacheMap,
           locationMap,
           sendCachableFunctionDataFunc: sendDataFunc,
         }: uniformShaderSendCachableFunctionData,
       ),
  instanceSendNoCachableDataArr,
  noMaterialShaderSendCachableDataArr,
};

let setToUniformSendMap =
    (
      shaderIndex,
      uniformShaderSendCachableFunctionDataMap,
      shaderSendCachableFunctionDataArr,
    ) =>
  uniformShaderSendCachableFunctionDataMap
  |> WonderCommonlib.MutableSparseMapService.set(
       shaderIndex,
       shaderSendCachableFunctionDataArr,
     );

let reduceiValidShaderSendCachableFunctionData =
    (glslSenderRecord, func, initValue) =>
  glslSenderRecord.uniformShaderSendCachableFunctionDataMap
  |> WonderCommonlib.MutableSparseMapService.reduceiValid(func, initValue);

let removeData =
    (
      shaderIndex,
      {uniformShaderSendCachableFunctionDataMap} as glslSenderRecord,
    ) => {
  WonderCommonlib.MutableSparseMapService.has(
    shaderIndex,
    uniformShaderSendCachableFunctionDataMap,
  ) ?
    uniformShaderSendCachableFunctionDataMap
    |> WonderCommonlib.MutableSparseMapService.deleteVal(shaderIndex)
    |> ignore :
    ();

  glslSenderRecord;
};