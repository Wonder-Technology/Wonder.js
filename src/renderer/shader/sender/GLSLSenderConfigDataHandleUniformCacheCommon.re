open GlType;

open Gl;

open GameObjectType;

open StateDataType;

open GLSLSenderStateUtils;

open GLSLSenderSendDataUtils;

open GLSLSenderConfigDataHandleShaderDataCommon;

let addUniformSendDataByType =
    (
      (shaderCacheMap, name, pos),
      (
        sendNoCachableDataArr,
        sendCachableDataArr,
        shaderSendNoCachableDataArr,
        instanceSendNoCachableDataArr
      ),
      getDataFunc
    ) => (
  sendNoCachableDataArr,
  sendCachableDataArr
  |> ArraySystem.push(
       {
         shaderCacheMap,
         name,
         pos,
         sendCachableDataFunc: sendFloat3,
         getCachableDataFunc: getDataFunc |> Obj.magic
       }: uniformSendCachableData
     ),
  shaderSendNoCachableDataArr,
  instanceSendNoCachableDataArr
);

let setToUniformSendMap = (shaderIndex, uniformSendCachableDataMap, sendCachableDataArr) =>
  uniformSendCachableDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, sendCachableDataArr)
  |> ignore;

let unsafeGetUniformSendData = (shaderIndex: int, state: StateDataType.state) =>
  GLSLSenderConfigDataHandleUniformUtils.unsafeGetUniformSendData(
    shaderIndex,
    getGLSLSenderData(state).uniformSendCachableDataMap
  );