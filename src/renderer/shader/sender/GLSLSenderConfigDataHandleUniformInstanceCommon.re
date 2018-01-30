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
        shaderSendCachableFunctionDataArr,
        instanceSendNoCachableDataArr
      ),
      getDataFunc
    ) =>
  switch type_ {
  | "mat4" => (
      sendNoCachableDataArr,
      sendCachableDataArr,
      shaderSendNoCachableDataArr,
      shaderSendCachableFunctionDataArr,
      instanceSendNoCachableDataArr
      |> ArraySystem.push(
           {pos, sendNoCachableDataFunc: sendMatrix4, getNoCachableDataFunc: getDataFunc}: instanceUniformSendNoCachableData
         )
    )
  | _ => ExceptionHandleSystem.throwMessage({j|unknow type:$type_|j})
  };

let setToUniformSendMap =
    (shaderIndex, instanceUniformSendNoCachableDataMap, instanceSendNoCachableDataArr) =>
  instanceUniformSendNoCachableDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, instanceSendNoCachableDataArr)
  |> ignore;

let unsafeGetUniformSendData = (shaderIndex: int, state: StateDataType.state) =>
  GLSLSenderConfigDataHandleUniformUtils.unsafeGetUniformSendData(
    shaderIndex,
    getGLSLSenderData(state).instanceUniformSendNoCachableDataMap
  );