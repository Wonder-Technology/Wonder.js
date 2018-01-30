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
        shaderSendCachableFunctionDataArr,
        instanceSendNoCachableDataArr
      ),
      getDataFunc
    ) =>
  switch type_ {
  | "mat4" => (
      renderObjectSendModelDataArr,
      renderObjectSendMaterialDataArr,
      shaderSendNoCachableDataArr,
      shaderSendCachableFunctionDataArr,
      instanceSendNoCachableDataArr
      |> ArraySystem.push(
           {pos, sendDataFunc: sendMatrix4, getDataFunc: getDataFunc}: uniformInstanceSendNoCachableData
         )
    )
  | _ => ExceptionHandleSystem.throwMessage({j|unknow type:$type_|j})
  };

let setToUniformSendMap =
    (shaderIndex, uniformInstanceSendNoCachableDataMap, instanceSendNoCachableDataArr) =>
  uniformInstanceSendNoCachableDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, instanceSendNoCachableDataArr)
  |> ignore;

let unsafeGetUniformSendData = (shaderIndex: int, state: StateDataType.state) =>
  GLSLSenderConfigDataHandleUniformUtils.unsafeGetUniformSendData(
    shaderIndex,
    getGLSLSenderData(state).uniformInstanceSendNoCachableDataMap
  );