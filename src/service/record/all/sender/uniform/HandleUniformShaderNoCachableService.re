open WonderWebgl.GlType;

open WonderWebgl.Gl;

open GLSLSenderType;

let addUniformSendDataByType =
    (
      (type_, pos),
      (
        renderObjectSendModelDataArr,
        renderObjectSendMaterialDataArr,
        shaderSendNoCachableDataArr,
        shaderSendCachableDataArr,
        shaderSendCachableFunctionDataArr,
        instanceSendNoCachableDataArr,
      ),
      getDataFunc,
    ) => (
  renderObjectSendModelDataArr,
  renderObjectSendMaterialDataArr,
  shaderSendNoCachableDataArr
  |> ArrayService.push(
       {
         pos,
         sendDataFunc: SendUniformService.getSendNoCachableDataByType(type_),
         getDataFunc: getDataFunc |> Obj.magic,
       }: uniformShaderSendNoCachableData,
     ),
  shaderSendCachableDataArr,
  shaderSendCachableFunctionDataArr,
  instanceSendNoCachableDataArr,
);

let setToUniformSendMap =
    (
      shaderIndex,
      uniformShaderSendNoCachableDataMap,
      shaderSendNoCachableDataArr,
    ) =>
  uniformShaderSendNoCachableDataMap
  |> WonderCommonlib.SparseMapService.set(
       shaderIndex,
       shaderSendNoCachableDataArr,
     );

let reduceiValidShaderSendNoCachableData = (glslSenderRecord, func, initValue) =>
  glslSenderRecord.uniformShaderSendNoCachableDataMap
  |> SparseMapService.reduceiValid(func, initValue);

let removeData = (shaderIndex, glslSenderRecord) => {
  glslSenderRecord.uniformShaderSendNoCachableDataMap
  |> Obj.magic
  |> WonderCommonlib.SparseMapService.deleteVal(shaderIndex)
  |> ignore;

  glslSenderRecord;
};