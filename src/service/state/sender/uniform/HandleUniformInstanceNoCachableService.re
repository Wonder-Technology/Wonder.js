open GlType;

open Gl;

open GameObjectType;

open StateDataType;

open SendGLSLDataService;

let addUniformSendDataByType =
    (
      pos,
      (
        renderObjectSendModelDataArr,
        renderObjectSendMaterialDataArr,
        shaderSendNoCachableDataArr,
        shaderSendCachableDataArr,
        shaderSendCachableFunctionDataArr,
        instanceSendNoCachableDataArr
      ),
      (getDataFunc, sendDataFunc)
    ) => (
  renderObjectSendModelDataArr,
  renderObjectSendMaterialDataArr,
  shaderSendNoCachableDataArr,
  shaderSendCachableDataArr,
  shaderSendCachableFunctionDataArr,
  instanceSendNoCachableDataArr
  |> ArrayService.push({pos, sendDataFunc, getDataFunc}: uniformInstanceSendNoCachableData)
);

let setToUniformSendMap =
    (shaderIndex, uniformInstanceSendNoCachableDataMap, instanceSendNoCachableDataArr) =>
  uniformInstanceSendNoCachableDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, instanceSendNoCachableDataArr)
  |> ignore;

let unsafeGetUniformSendData = (shaderIndex: int, state: StateDataType.state) =>
  HandleUniformConfigDataMapService.unsafeGetUniformSendData(
    shaderIndex,
    state.glslSenderRecord.uniformInstanceSendNoCachableDataMap
  );