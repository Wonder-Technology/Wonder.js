open MaterialType;

open GeometryType;

open ComponentType;

open GlType;

open Js.Typed_array;

open GLSLSenderType;

open ProgramType;

open RenderBoxGeometryType;

open RenderCustomGeometryType;

open RenderBasicMaterialType;

open RenderLightMaterialType;

open RenderBasicSourceTextureType;

open RenderArrayBufferViewSourceTextureType;

open RenderSceneType;

open RenderDirectionLightType;

open RenderPointLightType;

open RenderTransformType;

open RenderWorkerDetectType;

open VboBufferType;

open TypeArrayPoolType;

open RenderSourceInstanceType;

open GPUDetectType;

open GlobalTempType;

open DeviceManagerType;

open RenderShaderType;

open RenderSettingType;

open BrowserDetectType;

type attributeSendData = {
  pos: attributeLocation,
  size: int,
  buffer: VboBufferType.bufferEnum,
  sendFunc:
    (
      . webgl1Context,
      (attributeLocation, int),
      GlType.buffer,
      /* StateRenderType.sendAttributeState */
      /* GLSLSenderType.vertexAttribHistoryArray */
      renderState
    ) =>
    renderState,
}
and instanceAttributeSendData = {
  pos: attributeLocation,
  size: int,
  getOffsetFunc: (. int) => int,
}
and uniformRenderObjectSendModelData = {
  pos: uniformLocation,
  getDataFunc: (. component, renderState) => Float32Array.t,
  sendDataFunc: (. webgl1Context, uniformLocation, Float32Array.t) => unit,
}
and uniformRenderObjectSendMaterialData = {
  shaderCacheMap,
  name: string,
  pos: uniformLocation,
  getDataFunc: (. component, renderState) => array(float),
  sendDataFunc:
    (
      . webgl1Context,
      shaderCacheMap,
      (string, uniformLocation),
      array(float)
    ) =>
    unit,
}
and uniformShaderSendNoCachableData = {
  pos: uniformLocation,
  getDataFunc: (. renderState) => Float32Array.t,
  sendDataFunc: (. webgl1Context, uniformLocation, Float32Array.t) => unit,
}
and uniformShaderSendCachableData = {
  shaderCacheMap,
  name: string,
  pos: uniformLocation,
  getDataFunc: (. renderState) => array(float),
  sendDataFunc:
    (
      . webgl1Context,
      shaderCacheMap,
      (string, uniformLocation),
      array(float)
    ) =>
    unit,
}
and uniformShaderSendCachableFunctionData = {
  program,
  shaderCacheMap,
  locationMap: GLSLLocationType.uniformLocationMapOfShader,
  sendCachableFunctionDataFunc:
    (
      . webgl1Context,
      (program, shaderCacheMap, GLSLLocationType.uniformLocationMapOfShader),
      renderState
    ) =>
    unit,
}
and uniformInstanceSendNoCachableData = {
  pos: uniformLocation,
  getDataFunc: (. component, renderState) => Float32Array.t,
  sendDataFunc: (. webgl1Context, uniformLocation, Float32Array.t) => unit,
}
and glslSenderRecord = {
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
  mutable lastSendMaterial: option(material),
  mutable lastSendGeometry: option((geometry, int)),
}
and renderState = {
  sceneRecord,
  vboBufferRecord,
  typeArrayPoolRecord,
  glslSenderRecord,
  programRecord,
  boxGeometryRecord,
  customGeometryRecord,
  cameraRecord: option(RenderCameraType.renderCameraRecord),
  basicMaterialRecord,
  lightMaterialRecord,
  basicSourceTextureRecord,
  arrayBufferViewSourceTextureRecord,
  directionLightRecord,
  pointLightRecord,
  transformRecord,
  sourceInstanceRecord,
  gpuDetectRecord,
  globalTempRecord,
  deviceManagerRecord,
  shaderRecord,
  settingRecord,
  workerDetectRecord,
  browserDetectRecord,
};