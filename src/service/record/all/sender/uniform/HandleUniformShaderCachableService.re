open WonderWebgl.GlType;

open WonderWebgl.Gl;

open GLSLSenderType;

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
  |> WonderCommonlib.SparseMapService.set(
       shaderIndex,
       shaderSendCachableDataArr,
     );

let reduceiValidShaderSendCachableData = (glslSenderRecord, func, initValue) =>
  glslSenderRecord.uniformShaderSendCachableDataMap
  |> SparseMapService.reduceiValid(func, initValue);

let removeData = (shaderIndex, glslSenderRecord) => {
  glslSenderRecord.uniformShaderSendCachableDataMap
  |> Obj.magic
  |> WonderCommonlib.SparseMapService.deleteVal(shaderIndex)
  |> ignore;

  glslSenderRecord;
};