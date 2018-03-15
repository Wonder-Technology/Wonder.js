open GlType;

open Gl;

open GameObjectType;

open MainStateDataType;



open SendGLSLDataMainService;



let addUniformSendDataByType =
    (
      (type_, pos),
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
  renderObjectSendModelDataArr,
  renderObjectSendMaterialDataArr,
  shaderSendNoCachableDataArr
  |> ArrayService.push(
       {
         pos,
         sendDataFunc: SendUniformService.getSendNoCachableDataByType(type_),
         getDataFunc: getDataFunc |> Obj.magic
       }: uniformShaderSendNoCachableData
     ),
  shaderSendCachableDataArr,
  shaderSendCachableFunctionDataArr,
  instanceSendNoCachableDataArr
);

let setToUniformSendMap =
    (shaderIndex, uniformShaderSendNoCachableDataMap, shaderSendNoCachableDataArr) =>
  uniformShaderSendNoCachableDataMap
  |> WonderCommonlib.SparseMapService.set(shaderIndex, shaderSendNoCachableDataArr);

let unsafeGetUniformSendData = (shaderIndex: int, state: MainStateDataType.state) =>
  HandleUniformConfigDataMapService.unsafeGetUniformSendData(
    shaderIndex,
    state.glslSenderRecord.uniformShaderSendNoCachableDataMap
  );