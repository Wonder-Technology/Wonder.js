open GlType;

open Gl;

open GameObjectType;

open StateDataType;

open Contract;

open GLSLSenderStateUtils;

open GLSLSenderSendDataUtils;

open GLSLSenderConfigDataHandleShaderDataCommon;

let addUniformSendDataByType =
    (
      (type_, pos),
      (
        sendNoCachableDataList,
        sendCachableDataList,
        shaderSendNoCachableDataList,
        instanceSendNoCachableDataList
      ),
      getDataFunc
    ) =>
  switch type_ {
  | "mat4" => (
      sendNoCachableDataList,
      sendCachableDataList,
      shaderSendNoCachableDataList,
      [
        (
          {pos, sendNoCachableDataFunc: sendMatrix4, getNoCachableDataFunc: getDataFunc}: instanceUniformSendNoCachableData
        ),
        ...instanceSendNoCachableDataList
      ]
    )
  | _ => ExceptionHandleSystem.throwMessage({j|unknow type:$type_|j})
  };

let setToUniformSendMap =
    (shaderIndex, instanceUniformSendNoCachableDataMap, instanceSendNoCachableDataList) =>
  instanceUniformSendNoCachableDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, instanceSendNoCachableDataList)
  |> ignore;

let getUniformSendData = (shaderIndex: int, state: StateDataType.state) =>
  GLSLSenderConfigDataHandleUniformUtils.getUniformSendData(
    shaderIndex,
    getGLSLSenderData(state).instanceUniformSendNoCachableDataMap
  );