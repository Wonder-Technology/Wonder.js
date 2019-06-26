open WonderWebgl.GlType;

open WonderWebgl.Gl;

open AllGLSLSenderType;

let addUniformSendDataByType =
    (
      (type_, pos),
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
  shaderSendNoCachableDataArr:
    shaderSendNoCachableDataArr
    |> ArrayService.push(
         {
           pos,
           sendDataFunc:
             SendUniformService.getSendNoCachableDataByType(type_),
           getDataFunc: getDataFunc |> Obj.magic,
         }: uniformShaderSendNoCachableData,
       ),
  shaderSendCachableDataArr,
  shaderSendCachableFunctionDataArr,
  instanceSendNoCachableDataArr,
  noMaterialShaderSendCachableDataArr,
};

let setToUniformSendMap =
    (
      shaderIndex,
      uniformShaderSendNoCachableDataMap,
      shaderSendNoCachableDataArr,
    ) =>
  uniformShaderSendNoCachableDataMap
  |> WonderCommonlib.MutableSparseMapService.set(
       shaderIndex,
       shaderSendNoCachableDataArr,
     );

let reduceiValidShaderSendNoCachableData = (glslSenderRecord, func, initValue) =>
  glslSenderRecord.uniformShaderSendNoCachableDataMap
  |> WonderCommonlib.MutableSparseMapService.reduceiValid(func, initValue);

let removeData =
    (shaderIndex, {uniformShaderSendNoCachableDataMap} as glslSenderRecord) => {
  WonderCommonlib.MutableSparseMapService.has(
    shaderIndex,
    uniformShaderSendNoCachableDataMap,
  ) ?
    uniformShaderSendNoCachableDataMap
    |> WonderCommonlib.MutableSparseMapService.deleteVal(shaderIndex)
    |> ignore :
    ();

  glslSenderRecord;
};