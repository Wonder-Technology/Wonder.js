open GlType;

open Gl;

open GameObjectType;

open StateDataType;

open GLSLSenderStateUtils;

open GLSLSenderSendDataUtils;

open GLSLSenderConfigDataHandleShaderDataCommon;

let addUniformSendDataByType =
    (
      pos,
      (
        renderObjectSendModelDataArr,
        renderObjectSendMaterialDataArr,
        shaderSendNoCachableDataArr,
        shaderSendCachableFunctionDataArr,
        instanceSendNoCachableDataArr
      ),
      ( getDataFunc, sendDataFunc )
    ) => (
  renderObjectSendModelDataArr
  |> ArraySystem.push(
       {pos, sendDataFunc: sendDataFunc, getDataFunc: getDataFunc |> Obj.magic}: uniformRenderObjectSendModelData
     ),
  renderObjectSendMaterialDataArr,
  shaderSendNoCachableDataArr,
  shaderSendCachableFunctionDataArr,
  instanceSendNoCachableDataArr
);

let setToUniformSendMap = (shaderIndex, uniformRenderObjectSendModelDataMap, renderObjectSendModelDataArr) =>
  uniformRenderObjectSendModelDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, renderObjectSendModelDataArr)
  |> ignore;

let unsafeGetUniformSendData = (shaderIndex: int, state: StateDataType.state) =>
  GLSLSenderConfigDataHandleUniformUtils.unsafeGetUniformSendData(
    shaderIndex,
    getGLSLSenderData(state).uniformRenderObjectSendModelDataMap
  );