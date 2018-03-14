open GlType;

open ComponentType;

open TransformType;

open BoxGeometryType;

open BasicCameraViewType;

open PerspectiveCameraProjectionType;

open SceneType;

open SettingType;

open GameObjectType;

open GeometryType;

open BoxGeometryType;

open MeshRendererType;

open MaterialType;

open BasicMaterialType;

open LightMaterialType;

open AmbientLightType;

open DirectionLightType;

open PointLightType;

open ShaderType;

open GLSLType;

open ProgramType;

open GLSLLocationType;

open GLSLSenderType;

open ShaderChunkType;

open RenderType;

open TimeControllerType;

open Js.Typed_array;

open VboBufferType;

open DeviceManagerType;

open GPUDetectType;

open SourceInstanceType;

open ObjectInstanceType;

open GlobalTempType;

open TypeArrayPoolType;

open NoWorkerJobType;

open WorkerJobType;

open RenderConfigType;

open WorkerInstanceType;

open WorkerDetectType;

open ViewType;

type colorRgba = (float, float, float, float);

type attributeSendData = {
  pos: attributeLocation,
  size: int,
  buffer: string,
  sendFunc: [@bs] ((webgl1Context, (attributeLocation, int), GlType.buffer, state) => state)
}
and instanceAttributeSendData = {
  pos: attributeLocation,
  size: int,
  getOffsetFunc: [@bs] (int => int)
}
and uniformRenderObjectSendModelData = {
  pos: uniformLocation,
  getDataFunc: [@bs] ((component, state) => Float32Array.t),
  sendDataFunc: [@bs] ((webgl1Context, uniformLocation, Float32Array.t) => unit)
}
and uniformRenderObjectSendMaterialData = {
  shaderCacheMap,
  name: string,
  pos: uniformLocation,
  getDataFunc: [@bs] ((component, state) => array(float)),
  sendDataFunc:
    [@bs] ((webgl1Context, shaderCacheMap, (string, uniformLocation), array(float)) => unit)
}
and uniformShaderSendNoCachableData = {
  pos: uniformLocation,
  getDataFunc: [@bs] (state => Float32Array.t),
  sendDataFunc: [@bs] ((webgl1Context, uniformLocation, Float32Array.t) => unit)
}
and uniformShaderSendCachableData = {
  shaderCacheMap,
  name: string,
  pos: uniformLocation,
  getDataFunc: [@bs] (state => array(float)),
  sendDataFunc:
    [@bs] ((webgl1Context, shaderCacheMap, (string, uniformLocation), array(float)) => unit)
}
and uniformShaderSendCachableFunctionData = {
  program,
  shaderCacheMap,
  locationMap: uniformLocationMapOfShader,
  sendCachableFunctionDataFunc:
    [@bs] ((webgl1Context, (program, shaderCacheMap, uniformLocationMapOfShader), state) => state)
}
and uniformInstanceSendNoCachableData = {
  pos: uniformLocation,
  getDataFunc: [@bs] ((transform, state) => Float32Array.t),
  sendDataFunc: [@bs] ((webgl1Context, uniformLocation, Float32Array.t) => unit)
}
and glslSenderRecord = {
  attributeSendDataMap: array(array(attributeSendData)),
  instanceAttributeSendDataMap: array(array(instanceAttributeSendData)),
  uniformCacheMap,
  uniformRenderObjectSendModelDataMap: array(array(uniformRenderObjectSendModelData)),
  uniformRenderObjectSendMaterialDataMap: array(array(uniformRenderObjectSendMaterialData)),
  uniformShaderSendNoCachableDataMap: array(array(uniformShaderSendNoCachableData)),
  uniformShaderSendCachableDataMap: array(array(uniformShaderSendCachableData)),
  uniformShaderSendCachableFunctionDataMap: array(array(uniformShaderSendCachableFunctionData)),
  uniformInstanceSendNoCachableDataMap: array(array(uniformInstanceSendNoCachableData)),
  /* drawPointsFuncMap: array((webgl1Context => unit)), */
  mutable vertexAttribHistoryArray: array(bool),
  mutable lastSendMaterial: option(material),
  mutable lastSendGeometry: option(geometry)
}
and jobRecord = {
  noWorkerInitJobList: list((string, state => state)),
  noWorkerLoopJobList: list((string, (float, state) => state))
}
and state = {
  settingRecord,
  jobRecord,
  noWorkerJobRecord: option(noWorkerJobRecord),
  workerJobRecord: option(workerJobRecord),
  renderConfigRecord: option(renderConfigRecord),
  gpuDetectRecord,
  sourceInstanceRecord,
  objectInstanceRecord,
  viewRecord,
  deviceManagerRecord,
  gameObjectRecord,
  transformRecord,
  sceneRecord,
  basicCameraViewRecord,
  perspectiveCameraProjectionRecord,
  basicMaterialRecord,
  lightMaterialRecord,
  ambientLightRecord,
  directionLightRecord,
  pointLightRecord,
  boxGeometryRecord,
  meshRendererRecord,
  shaderRecord,
  glslRecord,
  programRecord,
  glslLocationRecord,
  glslSenderRecord,
  glslChunkRecord,
  renderRecord,
  timeControllerRecord,
  vboBufferRecord,
  globalTempRecord,
  typeArrayPoolRecord,
  workerInstanceRecord,
  workerDetectRecord
};

type sharedDataForRestoreState = {
  gl: webgl1Context,
  float32ArrayPoolMap,
  uint16ArrayPoolMap
};

type stateData = {
  mutable state: option(state),
  mutable isDebug: bool
};