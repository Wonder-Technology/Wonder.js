open GlType;

open Gl;

open SendGLSLDataService;

open GLSLSenderAllType;

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
  |> WonderCommonlib.SparseMapService.set(shaderIndex, instanceSendNoCachableDataArr)
  |> ignore;

let unsafeGetUniformSendData = (shaderIndex: int, glslSenderRecord) =>
  HandleUniformConfigDataMapService.unsafeGetUniformSendData(
    shaderIndex,
    glslSenderRecord.uniformInstanceSendNoCachableDataMap
  );