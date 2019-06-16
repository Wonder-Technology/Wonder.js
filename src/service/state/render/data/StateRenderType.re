open GLSLSenderType;

open ShaderType;

open GeometryType;

open ProgramType;

open RenderMeshRendererType;

open RenderGeometryType;

open RenderBasicMaterialType;

open RenderLightMaterialType;

open RenderBasicSourceTextureType;

open RenderArrayBufferViewSourceTextureType;

open RenderAllTextureType;

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

open RenderSettingType;

open BrowserDetectType;

open JobDataType;

type renderState = {
  sceneRecord,
  vboBufferRecord,
  typeArrayPoolRecord,
  glslSenderRecord,
  programRecord,
  geometryRecord,
  cameraRecord: option(RenderCameraType.renderCameraRecord),
  basicMaterialRecord,
  lightMaterialRecord,
  meshRendererRecord,
  basicSourceTextureRecord,
  arrayBufferViewSourceTextureRecord,
  allTextureRecord,
  directionLightRecord,
  pointLightRecord,
  transformRecord,
  sourceInstanceRecord,
  gpuDetectRecord,
  globalTempRecord,
  deviceManagerRecord,
  settingRecord,
  workerDetectRecord,
  browserDetectRecord,
  jobDataRecord,
  shaderRecord,
};