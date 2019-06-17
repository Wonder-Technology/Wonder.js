open WonderWebgl.GlType;

open WonderWebgl.Gl;

open AllGLSLSenderType;

let addUniformSendDataByType =
    (
      pos,
      {
        renderObjectSendModelDataArr,
        renderObjectSendMaterialDataArr,
        shaderSendNoCachableDataArr,
        shaderSendCachableDataArr,
        shaderSendCachableFunctionDataArr,
        instanceSendNoCachableDataArr,
        noMaterialShaderSendCachableDataArr,
      },
      (getDataFunc, sendDataFunc),
    ) => {
  renderObjectSendModelDataArr,
  renderObjectSendMaterialDataArr,
  shaderSendNoCachableDataArr,
  shaderSendCachableDataArr,
  shaderSendCachableFunctionDataArr,
  instanceSendNoCachableDataArr:
    instanceSendNoCachableDataArr
    |> ArrayService.push(
         {pos, sendDataFunc, getDataFunc}: uniformInstanceSendNoCachableData,
       ),
  noMaterialShaderSendCachableDataArr,
};

let setToUniformSendMap =
    (
      shaderIndex,
      uniformInstanceSendNoCachableDataMap,
      instanceSendNoCachableDataArr,
    ) =>
  uniformInstanceSendNoCachableDataMap
  |> WonderCommonlib.MutableSparseMapService.set(
       shaderIndex,
       instanceSendNoCachableDataArr,
     )
  |> ignore;

let unsafeGetUniformSendData = (shaderIndex: int, glslSenderRecord) =>
  HandleUniformConfigDataMapService.unsafeGetUniformSendData(
    shaderIndex,
    glslSenderRecord.uniformInstanceSendNoCachableDataMap,
  );