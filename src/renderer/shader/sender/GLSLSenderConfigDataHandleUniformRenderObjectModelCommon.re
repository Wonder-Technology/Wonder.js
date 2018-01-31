open GlType;

open Gl;

open GameObjectType;

open StateDataType;

open GLSLSenderStateUtils;

open GLSLSenderSendDataUtils;

open GLSLSenderConfigDataHandleShaderDataCommon;

let addUniformSendDataByType =
    (
      (pos, type_),
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
  renderObjectSendModelDataArr
  |> ArraySystem.push(
       {
         pos,
         sendDataFunc: GLSLSenderUniformUtils.getSendNoCachableDataByType(type_),
         getDataFunc: getDataFunc |> Obj.magic
       }: uniformRenderObjectSendModelData
     ),
  renderObjectSendMaterialDataArr,
  shaderSendNoCachableDataArr,
  shaderSendCachableDataArr,
  shaderSendCachableFunctionDataArr,
  instanceSendNoCachableDataArr
);

let setToUniformSendMap =
    (shaderIndex, uniformRenderObjectSendModelDataMap, renderObjectSendModelDataArr) =>
  uniformRenderObjectSendModelDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, renderObjectSendModelDataArr)
  |> ignore;

let unsafeGetUniformSendData = (shaderIndex: int, state: StateDataType.state) =>
  GLSLSenderConfigDataHandleUniformUtils.unsafeGetUniformSendData(
    shaderIndex,
    getGLSLSenderData(state).uniformRenderObjectSendModelDataMap
  );