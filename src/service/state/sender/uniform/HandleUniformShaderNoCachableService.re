open GlType;

open Gl;

open GameObjectType;

open StateDataType;



open SendGLSLDataService;



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
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, shaderSendNoCachableDataArr);

let unsafeGetUniformSendData = (shaderIndex: int, state: StateDataType.state) =>
  HandleUniformConfigDataMapService.unsafeGetUniformSendData(
    shaderIndex,
    state.glslSenderRecord.uniformShaderSendNoCachableDataMap
  );