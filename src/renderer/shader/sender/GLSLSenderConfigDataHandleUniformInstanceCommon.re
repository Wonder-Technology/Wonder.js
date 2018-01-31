open GlType;

open Gl;

open GameObjectType;

open StateDataType;

open GLSLSenderStateUtils;

open GLSLSenderSendDataUtils;

open GLSLSenderConfigDataHandleShaderDataCommon;

let addUniformSendDataByType =
    (
      (pos, type_),
      (
        renderObjectSendModelDataArr,
        renderObjectSendMaterialDataArr,
        shaderSendNoCachableDataArr,
        shaderSendCachableDataArr,
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
      shaderSendCachableDataArr,
      shaderSendCachableFunctionDataArr,
      instanceSendNoCachableDataArr
      |> ArraySystem.push(
           {pos, sendDataFunc: sendMatrix4, getDataFunc}: uniformInstanceSendNoCachableData
         )
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="addUniformSendDataByType",
        ~description={j|unknown type:$type_|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
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