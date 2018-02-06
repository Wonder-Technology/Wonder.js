open GlType;

open Gl;

open GameObjectType;

open StateDataType;

open GLSLSenderStateUtils;

open GLSLSenderSendDataUtils;

open GLSLSenderConfigDataHandleShaderDataCommon;

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
  |> ArraySystem.push(
       {
         pos,
         sendDataFunc: GLSLSenderUniformUtils.getSendNoCachableDataByType(type_),
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
  GLSLSenderConfigDataHandleUniformUtils.unsafeGetUniformSendData(
    shaderIndex,
    getGLSLSenderData(state).uniformShaderSendNoCachableDataMap
  );