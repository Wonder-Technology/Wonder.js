open WonderWebgl.GlType;

open ComponentType;

open Js.Typed_array;

open MaterialType;

open GLSLSenderPrimitiveType;

type attributeSendData = {
  pos: attributeLocation,
  size: int,
  buffer: VboBufferType.bufferEnum,
  sendFunc:
    (
      . webgl1Context,
      (attributeLocation, int),
      WonderWebgl.GlType.buffer,
      SubStateSendRenderDataType.sendRenderDataSubState
    ) =>
    SubStateSendRenderDataType.sendRenderDataSubState,
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
  locationMap: GLSLLocationType.uniformLocationMapOfShader,
  sendCachableFunctionDataFunc:
    (
      . webgl1Context,
      (program, shaderCacheMap, GLSLLocationType.uniformLocationMapOfShader),
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

type glslSenderRecord = {
  attributeSendDataMap:
    WonderCommonlib.SparseMapService.t(array(attributeSendData)),
  instanceAttributeSendDataMap:
    WonderCommonlib.SparseMapService.t(array(instanceAttributeSendData)),
  uniformCacheMap,
  uniformRenderObjectSendModelDataMap:
    WonderCommonlib.SparseMapService.t(
      array(uniformRenderObjectSendModelData),
    ),
  uniformRenderObjectSendMaterialDataMap:
    WonderCommonlib.SparseMapService.t(
      array(uniformRenderObjectSendMaterialData),
    ),
  uniformShaderSendNoCachableDataMap:
    WonderCommonlib.SparseMapService.t(
      array(uniformShaderSendNoCachableData),
    ),
  uniformShaderSendCachableDataMap:
    WonderCommonlib.SparseMapService.t(array(uniformShaderSendCachableData)),
  uniformShaderSendCachableFunctionDataMap:
    WonderCommonlib.SparseMapService.t(
      array(uniformShaderSendCachableFunctionData),
    ),
  uniformInstanceSendNoCachableDataMap:
    WonderCommonlib.SparseMapService.t(
      array(uniformInstanceSendNoCachableData),
    ),
  /* drawPointsFuncMap: WonderCommonlib.SparseMapService.t((webgl1Context => unit)), */
  mutable vertexAttribHistoryArray,
  mutable lastSendMaterialData: option((material, ShaderType.shaderIndex)),
  /* mutable lastSendGeometryData: option(geometry), */
};