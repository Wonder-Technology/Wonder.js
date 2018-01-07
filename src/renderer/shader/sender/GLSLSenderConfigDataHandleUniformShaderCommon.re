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
        sendNoCacheableDataList,
        sendCacheableDataList,
        shaderSendNoCacheableDataList,
        instanceSendNoCacheableDataList
      ),
      getDataFunc
    ) =>
  switch type_ {
  | "mat4" => (
      sendNoCacheableDataList,
      sendCacheableDataList,
      [
        (
          {pos, sendNoCacheableDataFunc: sendMatrix4, getNoCacheableDataFunc: getDataFunc}: shaderUniformSendNoCacheableData
        ),
        ...shaderSendNoCacheableDataList
      ],
      instanceSendNoCacheableDataList
    )
  | _ => ExceptionHandleSystem.throwMessage({j|unknow type:$type_|j})
  };

let setToUniformSendMap =
    (shaderIndex, shaderUniformSendNoCacheableDataMap, shaderSendNoCacheableDataList) =>
  shaderUniformSendNoCacheableDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, shaderSendNoCacheableDataList);

let getUniformSendData = (shaderIndex: int, state: StateDataType.state) =>
  GLSLSenderConfigDataHandleUniformUtils.getUniformSendData(
    shaderIndex,
    getGLSLSenderData(state).shaderUniformSendNoCacheableDataMap
  );