open GlType;

open Gl;

open GameObjectType;

open StateDataType;

open GLSLSenderStateUtils;

open GLSLSenderSendDataUtils;

open GLSLSenderConfigDataHandleShaderDataCommon;

let addUniformSendDataByType =
    (
      (shaderCacheMap, name, pos),
      (
        renderObjectSendModelDataArr,
        renderObjectSendMaterialDataArr,
        shaderSendNoCachableDataArr,
        shaderSendCachableFunctionDataArr,
        instanceSendNoCachableDataArr
      ),
      (getDataFunc, sendDataFunc)
    ) => (
  renderObjectSendModelDataArr,
  renderObjectSendMaterialDataArr
  |> ArraySystem.push(
       {
         shaderCacheMap,
         name,
         pos,
         sendDataFunc: sendDataFunc,
         getDataFunc: getDataFunc |> Obj.magic
       }: uniformRenderObjectSendMaterialData
     ),
  shaderSendNoCachableDataArr,
  shaderSendCachableFunctionDataArr,
  instanceSendNoCachableDataArr
);

let setToUniformSendMap = (shaderIndex, uniformRenderObjectSendMaterialDataMap, renderObjectSendMaterialDataArr) =>
  uniformRenderObjectSendMaterialDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, renderObjectSendMaterialDataArr)
  |> ignore;

let unsafeGetUniformSendData = (shaderIndex: int, state: StateDataType.state) =>
  GLSLSenderConfigDataHandleUniformUtils.unsafeGetUniformSendData(
    shaderIndex,
    getGLSLSenderData(state).uniformRenderObjectSendMaterialDataMap
  );