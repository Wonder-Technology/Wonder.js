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
        renderObjectSendModelDataArr,
        renderObjectSendMaterialDataArr,
        shaderSendNoCachableDataArr,
        shaderSendCachableFunctionDataArr,
        instanceSendNoCachableDataArr
      ),
      getDataFunc
    ) => {
  let sendDataFunc =
    switch type_ {
    | "mat4" => sendMatrix4
    | "mat3" => sendMatrix3 |> Obj.magic
    | "vec3" => sendVec3 |> Obj.magic
    | _ => ExceptionHandleSystem.throwMessage({j|unknow type:$type_|j})
    };
  (
    renderObjectSendModelDataArr,
    renderObjectSendMaterialDataArr,
    shaderSendNoCachableDataArr
    |> ArraySystem.push(
         {pos, sendDataFunc: sendDataFunc, getDataFunc: getDataFunc |> Obj.magic}: uniformShaderSendNoCachableData
       ),
    shaderSendCachableFunctionDataArr,
    instanceSendNoCachableDataArr
  )
};

let setToUniformSendMap =
    (shaderIndex, uniformShaderSendNoCachableDataMap, shaderSendNoCachableDataArr) =>
  uniformShaderSendNoCachableDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, shaderSendNoCachableDataArr);

let unsafeGetUniformSendData = (shaderIndex: int, state: StateDataType.state) =>
  GLSLSenderConfigDataHandleUniformUtils.unsafeGetUniformSendData(
    shaderIndex,
    getGLSLSenderData(state).uniformShaderSendNoCachableDataMap
  );