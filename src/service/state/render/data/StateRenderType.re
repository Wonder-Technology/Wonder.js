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

open RenderTextureType;

open RenderAmbientLightType;

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

type attributeSendData = {
  pos: attributeLocation,
  size: int,
  buffer: string,
  sendFunc:
    [@bs]
    (
      (
        webgl1Context,
        (attributeLocation, int),
        GlType.buffer,
        /* StateRenderType.sendAttributeState */
        /* GLSLSenderType.vertexAttribHistoryArray */
        renderState
      ) =>
      renderState
    )
}
and instanceAttributeSendData = {
  pos: attributeLocation,
  size: int,
  getOffsetFunc: [@bs] (int => int)
}
and uniformRenderObjectSendModelData = {
  pos: uniformLocation,
  getDataFunc: [@bs] ((component, renderState) => Float32Array.t),
  sendDataFunc: [@bs] ((webgl1Context, uniformLocation, Float32Array.t) => unit)
}
and uniformRenderObjectSendMaterialData = {
  shaderCacheMap,
  name: string,
  pos: uniformLocation,
  getDataFunc: [@bs] ((component, renderState) => array(float)),
  sendDataFunc:
    [@bs] ((webgl1Context, shaderCacheMap, (string, uniformLocation), array(float)) => unit)
}
and uniformShaderSendNoCachableData = {
  pos: uniformLocation,
  getDataFunc: [@bs] (renderState => Float32Array.t),
  sendDataFunc: [@bs] ((webgl1Context, uniformLocation, Float32Array.t) => unit)
}
and uniformShaderSendCachableData = {
  shaderCacheMap,
  name: string,
  pos: uniformLocation,
  getDataFunc: [@bs] (renderState => array(float)),
  sendDataFunc:
    [@bs] ((webgl1Context, shaderCacheMap, (string, uniformLocation), array(float)) => unit)
}
and uniformShaderSendCachableFunctionData = {
  program,
  shaderCacheMap,
  locationMap: GLSLLocationType.uniformLocationMapOfShader,
  sendCachableFunctionDataFunc:
    [@bs]
    (
      (
        webgl1Context,
        (program, shaderCacheMap, GLSLLocationType.uniformLocationMapOfShader),
        renderState
      ) =>
      unit
    )
}
and uniformInstanceSendNoCachableData = {
  pos: uniformLocation,
  getDataFunc: [@bs] ((component, renderState) => Float32Array.t),
  sendDataFunc: [@bs] ((webgl1Context, uniformLocation, Float32Array.t) => unit)
}
and glslSenderRecord = {
  attributeSendDataMap: WonderCommonlib.SparseMapService.t(array(attributeSendData)),
  instanceAttributeSendDataMap:
    WonderCommonlib.SparseMapService.t(array(instanceAttributeSendData)),
  uniformCacheMap,
  uniformRenderObjectSendModelDataMap:
    WonderCommonlib.SparseMapService.t(array(uniformRenderObjectSendModelData)),
  uniformRenderObjectSendMaterialDataMap:
    WonderCommonlib.SparseMapService.t(array(uniformRenderObjectSendMaterialData)),
  uniformShaderSendNoCachableDataMap:
    WonderCommonlib.SparseMapService.t(array(uniformShaderSendNoCachableData)),
  uniformShaderSendCachableDataMap:
    WonderCommonlib.SparseMapService.t(array(uniformShaderSendCachableData)),
  uniformShaderSendCachableFunctionDataMap:
    WonderCommonlib.SparseMapService.t(array(uniformShaderSendCachableFunctionData)),
  uniformInstanceSendNoCachableDataMap:
    WonderCommonlib.SparseMapService.t(array(uniformInstanceSendNoCachableData)),
  /* drawPointsFuncMap: WonderCommonlib.SparseMapService.t((webgl1Context => unit)), */
  mutable vertexAttribHistoryArray,
  mutable lastSendMaterial: option(material),
  mutable lastSendGeometry: option((geometry, int))
}
and renderState = {
  vboBufferRecord,
  typeArrayPoolRecord,
  glslSenderRecord,
  programRecord,
  boxGeometryRecord,
  customGeometryRecord,
  cameraRecord: option(RenderCameraType.renderCameraRecord),
  basicMaterialRecord,
  lightMaterialRecord,
  textureRecord,
  ambientLightRecord,
  directionLightRecord,
  pointLightRecord,
  transformRecord,
  sourceInstanceRecord,
  gpuDetectRecord,
  globalTempRecord,
  deviceManagerRecord,
  shaderRecord,
  settingRecord,
  workerDetectRecord
};