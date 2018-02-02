open GlType;

open ComponentType;

open TransformType;

open CameraControllerType;

open GameObjectType;

open GeometryType;

open MeshRendererType;

open MaterialType;

open BasicMaterialType;

open LightMaterialType;

open AmbientLightType;

open DirectionLightType;

open ShaderType;

open ProgramType;

open GLSLLocationType;

open GLSLSenderType;

open ShaderChunkType;

open RenderDataType;

open TimeControllerType;

open Js.Typed_array;

open MemoryConfigType;

open VboBufferType;

open DeviceManagerType;

open GPUDetectType;

open SourceInstanceType;

open ObjectInstanceType;

open GlobalTempType;

open TypeArrayPoolType;

open LogicJobConfigType;

open RenderJobConfigType;

type contextConfig = {
  alpha: bool,
  depth: bool,
  stencil: bool,
  antialias: bool,
  premultipliedAlpha: bool,
  preserveDrawingBuffer: bool
};

type bufferConfig = {mutable geometryPointDataBufferCount: int};

type gpuConfig = {mutable useHardwareInstance: bool};

type viewData = {
  canvas: option(DomType.htmlElement),
  contextConfig: option(contextConfig)
};

type initConfig = {isDebug: bool};

type colorRgba = (float, float, float, float);

type attributeSendData = {
  pos: attributeLocation,
  size: int,
  buffer: string,
  sendFunc: [@bs] ((webgl1Context, (attributeLocation, int), buffer, state) => state)
}
and instanceAttributeSendData = {pos: attributeLocation}
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
and glslSenderData = {
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
and jobData = {
  logicInitJobList: list((string, state => state)),
  renderInitJobList: list((string, (webgl1Context, state) => state)),
  logicUpdateJobList: list((string, (float, state) => state)),
  renderRenderJobList: list((string, (webgl1Context, state) => state))
}
and geometryData = {
  mutable index: int,
  verticesMap: geometryVerticesMap,
  normalsMap: geometryNormalsMap,
  indicesMap: geometryIndicesMap,
  mutable computeDataFuncMap: array(((int, state) => geometryComputeData)),
  mutable configDataMap: geometryConfigDataMap,
  mutable gameObjectMap,
  mutable disposedIndexArray: geometryDisposedIndexArray,
  mutable isInitMap: geometryIsInitMap,
  mutable groupCountMap: geometryGroupCountMap
}
and state = {
  bufferConfig: option(bufferConfig),
  gpuConfig: option(gpuConfig),
  memoryConfig,
  jobData,
  logicJobConfig: option(logicJobConfig),
  renderJobConfig: option(renderJobConfig),
  gpuDetectData,
  sourceInstanceData,
  objectInstanceData,
  viewData,
  initConfig,
  deviceManagerData,
  gameObjectData,
  /* TODO transformData, geometryData, meshRendererData not mutable? */
  mutable transformData: option(transformData),
  cameraControllerData,
  basicMaterialData,
  lightMaterialData,
  ambientLightData,
  directionLightData,
  mutable geometryData: option(geometryData),
  mutable meshRendererData,
  shaderData,
  programData,
  glslLocationData,
  glslSenderData,
  glslChunkData,
  renderData,
  timeControllerData,
  vboBufferData,
  globalTempData,
  typeArrayPoolData
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