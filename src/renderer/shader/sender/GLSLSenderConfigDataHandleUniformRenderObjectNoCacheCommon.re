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
        sendNoCachableDataArr,
        sendCachableDataArr,
        shaderSendNoCachableDataArr,
        shaderSendCachableFunctionDataArr,
        instanceSendNoCachableDataArr
      ),
      getDataFunc
    ) => (
  sendNoCachableDataArr
  |> ArraySystem.push(
       {pos, sendNoCachableDataFunc: sendMatrix4, getNoCachableDataFunc: getDataFunc |> Obj.magic}: uniformSendNoCachableData
     ),
  sendCachableDataArr,
  shaderSendNoCachableDataArr,
  shaderSendCachableFunctionDataArr,
  instanceSendNoCachableDataArr
);

let setToUniformSendMap = (shaderIndex, uniformSendNoCachableDataMap, sendNoCachableDataArr) =>
  uniformSendNoCachableDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, sendNoCachableDataArr)
  |> ignore;

let unsafeGetUniformSendData = (shaderIndex: int, state: StateDataType.state) =>
  GLSLSenderConfigDataHandleUniformUtils.unsafeGetUniformSendData(
    shaderIndex,
    getGLSLSenderData(state).uniformSendNoCachableDataMap
  );