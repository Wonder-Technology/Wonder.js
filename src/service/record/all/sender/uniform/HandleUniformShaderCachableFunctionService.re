open WonderWebgl.GlType;

open WonderWebgl.Gl;

open GLSLSenderType;

let addUniformSendDataByType =
    (
      (program, shaderCacheMap, locationMap),
      (
        renderObjectSendModelDataArr,
        renderObjectSendMaterialDataArr,
        shaderSendNoCachableDataArr,
        shaderSendCachableDataArr,
        shaderSendCachableFunctionDataArr,
        instanceSendNoCachableDataArr,
      ),
      sendDataFunc,
    ) => (
  renderObjectSendModelDataArr,
  renderObjectSendMaterialDataArr,
  shaderSendNoCachableDataArr,
  shaderSendCachableDataArr,
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
);

let setToUniformSendMap =
    (
      shaderIndex,
      uniformShaderSendCachableFunctionDataMap,
      shaderSendCachableFunctionDataArr,
    ) =>
  uniformShaderSendCachableFunctionDataMap
  |> WonderCommonlib.SparseMapService.set(
       shaderIndex,
       shaderSendCachableFunctionDataArr,
     );

let reduceiValidShaderSendCachableFunctionData =
    (glslSenderRecord, func, initValue) =>
  glslSenderRecord.uniformShaderSendCachableFunctionDataMap
  |> SparseMapService.reduceiValid(func, initValue);

let removeData = (shaderIndex, glslSenderRecord) => {
  glslSenderRecord.uniformShaderSendCachableFunctionDataMap
  |> Obj.magic
  |> WonderCommonlib.SparseMapService.deleteVal(shaderIndex)
  |> ignore;

  glslSenderRecord;
};