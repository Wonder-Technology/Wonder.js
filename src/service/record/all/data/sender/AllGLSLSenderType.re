open WonderWebgl.GlType;

open ComponentType;

open Js.Typed_array;

open MaterialType;

open GLSLSenderPrimitiveType;

type attributeSendData = {
  pos: attributeLocation,
  size: int,
  buffer: AllVboBufferType.bufferEnum,
  sendFunc:
    (
      . webgl1Context,
      (attributeLocation, int),
      WonderWebgl.GlType.buffer,
      SubStateSendRenderDataType.sendRenderDataSubState
    ) =>
    unit,
};

type instanceAttributeSendData = {
  pos: attributeLocation,
  size: int,
  getOffsetFunc: (. int) => int,
};

type uniformRenderObjectSendModelData = {
  pos: uniformLocation,
  getDataFunc:
    (. component, SubStateGetRenderDataType.getRenderDataSubState) =>
    Float32Array.t,
  sendDataFunc: (. webgl1Context, uniformLocation, Float32Array.t) => unit,
};

type uniformRenderObjectSendMaterialData = {
  shaderCacheMap,
  name: string,
  pos: uniformLocation,
  getDataFunc:
    (. component, SubStateGetRenderDataType.getRenderDataSubState) =>
    array(float),
  sendDataFunc:
    (
      . webgl1Context,
      shaderCacheMap,
      (string, uniformLocation),
      array(float)
    ) =>
    unit,
};

type uniformShaderSendNoCachableData = {
  pos: uniformLocation,
  getDataFunc:
    (. SubStateGetRenderDataType.getRenderDataSubState) => Float32Array.t,
  sendDataFunc: (. webgl1Context, uniformLocation, Float32Array.t) => unit,
};

type uniformShaderSendCachableData = {
  shaderCacheMap,
  name: string,
  pos: uniformLocation,
  getDataFunc:
    (. SubStateGetRenderDataType.getRenderDataSubState) => array(float),
  sendDataFunc:
    (
      . webgl1Context,
      shaderCacheMap,
      (string, uniformLocation),
      array(float)
    ) =>
    unit,
};

type uniformShaderSendCachableFunctionData = {
  program,
  shaderCacheMap,
  locationMap: AllGLSLLocationType.uniformLocationMapOfShader,
  sendCachableFunctionDataFunc:
    (
      . webgl1Context,
      (program, shaderCacheMap, AllGLSLLocationType.uniformLocationMapOfShader),
      SubStateSendRenderDataType.sendRenderDataSubState
    ) =>
    unit,
};

type uniformInstanceSendNoCachableData = {
  pos: uniformLocation,
  getDataFunc:
    (. component, SubStateGetRenderDataType.getRenderDataSubState) =>
    Float32Array.t,
  sendDataFunc: (. webgl1Context, uniformLocation, Float32Array.t) => unit,
};

type sendNoMaterialShaderDataFunc;

type uniformNoMaterialShaderSendData = {
  shaderCacheMap,
  name: string,
  pos: uniformLocation,
  getDataFunc:
    (. SubStateGetRenderDataType.getRenderDataSubState) => array(float),
  sendDataFunc: sendNoMaterialShaderDataFunc,
  /* (
       . webgl1Context,
       shaderCacheMap,
       (string, uniformLocation),
       array(float)
     ) =>
     unit, */
};

type allSendUniformData = {
  renderObjectSendModelDataArr: array(uniformRenderObjectSendModelData),
  renderObjectSendMaterialDataArr: array(uniformRenderObjectSendMaterialData),
  shaderSendNoCachableDataArr: array(uniformShaderSendNoCachableData),
  shaderSendCachableDataArr: array(uniformShaderSendCachableData),
  shaderSendCachableFunctionDataArr:
    array(uniformShaderSendCachableFunctionData),
  instanceSendNoCachableDataArr: array(uniformInstanceSendNoCachableData),
  noMaterialShaderSendCachableDataArr: array(uniformNoMaterialShaderSendData),
};

type glslSenderRecord = {
  attributeSendDataMap:
    WonderCommonlib.MutableSparseMapService.t(array(attributeSendData)),
  instanceAttributeSendDataMap:
    WonderCommonlib.MutableSparseMapService.t(
      array(instanceAttributeSendData),
    ),
  uniformCacheMap,
  uniformRenderObjectSendModelDataMap:
    WonderCommonlib.MutableSparseMapService.t(
      array(uniformRenderObjectSendModelData),
    ),
  uniformRenderObjectSendMaterialDataMap:
    WonderCommonlib.MutableSparseMapService.t(
      array(uniformRenderObjectSendMaterialData),
    ),
  uniformShaderSendNoCachableDataMap:
    WonderCommonlib.MutableSparseMapService.t(
      array(uniformShaderSendNoCachableData),
    ),
  uniformShaderSendCachableDataMap:
    WonderCommonlib.MutableSparseMapService.t(
      array(uniformShaderSendCachableData),
    ),
  uniformShaderSendCachableFunctionDataMap:
    WonderCommonlib.MutableSparseMapService.t(
      array(uniformShaderSendCachableFunctionData),
    ),
  uniformInstanceSendNoCachableDataMap:
    WonderCommonlib.MutableSparseMapService.t(
      array(uniformInstanceSendNoCachableData),
    ),
  uniformNoMaterialShaderSendCachableDataMap:
    WonderCommonlib.MutableSparseMapService.t(
      array(uniformNoMaterialShaderSendData),
    ),
  /* drawPointsFuncMap: WonderCommonlib.MutableSparseMapService.t((webgl1Context => unit)), */
  mutable vertexAttribHistoryArray,
  mutable lastSendMaterialData: option((material, AllShaderType.shaderIndex)),
  mutable lastSendGeometryData: option(GeometryType.geometry),
};