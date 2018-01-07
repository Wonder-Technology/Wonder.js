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
      pos,
      (
        sendNoCachableDataArr,
        sendCachableDataArr,
        shaderSendNoCachableDataArr,
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
  instanceSendNoCachableDataArr
);

let setToUniformSendMap = (shaderIndex, uniformSendNoCachableDataMap, sendNoCachableDataArr) =>
  uniformSendNoCachableDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, sendNoCachableDataArr)
  |> ignore;

let getUniformSendData = (shaderIndex: int, state: StateDataType.state) =>
  GLSLSenderConfigDataHandleUniformUtils.getUniformSendData(
    shaderIndex,
    getGLSLSenderData(state).uniformSendNoCachableDataMap
  );