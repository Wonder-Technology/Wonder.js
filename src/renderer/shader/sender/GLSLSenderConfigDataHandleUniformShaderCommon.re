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
      [
        (
          {pos, sendNoCachableDataFunc: sendMatrix4, getNoCachableDataFunc: getDataFunc}: shaderUniformSendNoCachableData
        ),
        ...shaderSendNoCachableDataList
      ],
      instanceSendNoCachableDataList
    )
  | _ => ExceptionHandleSystem.throwMessage({j|unknow type:$type_|j})
  };

let setToUniformSendMap =
    (shaderIndex, shaderUniformSendNoCachableDataMap, shaderSendNoCachableDataList) =>
  shaderUniformSendNoCachableDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, shaderSendNoCachableDataList);

let getUniformSendData = (shaderIndex: int, state: StateDataType.state) =>
  GLSLSenderConfigDataHandleUniformUtils.getUniformSendData(
    shaderIndex,
    getGLSLSenderData(state).shaderUniformSendNoCachableDataMap
  );