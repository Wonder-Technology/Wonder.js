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
        sendNoCachableDataArr,
        sendCachableDataArr,
        shaderSendNoCachableDataArr,
        instanceSendNoCachableDataArr
      ),
      getDataFunc
    ) =>
  switch type_ {
  | "mat4" => (
      sendNoCachableDataArr,
      sendCachableDataArr,
      shaderSendNoCachableDataArr
      |> ArraySystem.push(
           {pos, sendNoCachableDataFunc: sendMatrix4, getNoCachableDataFunc: getDataFunc}: shaderUniformSendNoCachableData
         ),
      instanceSendNoCachableDataArr
    )
  | _ => ExceptionHandleSystem.throwMessage({j|unknow type:$type_|j})
  };

let setToUniformSendMap =
    (shaderIndex, shaderUniformSendNoCachableDataMap, shaderSendNoCachableDataArr) =>
  shaderUniformSendNoCachableDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, shaderSendNoCachableDataArr);

let getUniformSendData = (shaderIndex: int, state: StateDataType.state) =>
  GLSLSenderConfigDataHandleUniformUtils.getUniformSendData(
    shaderIndex,
    getGLSLSenderData(state).shaderUniformSendNoCachableDataMap
  );