open AllGLSLSenderType;

open AllShaderType;

open GeometryType;

open AllProgramType;

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

open AllVboBufferType;

open AllTypeArrayPoolType;

open RenderSourceInstanceType;

open AllGPUDetectType;

open AllGlobalTempType;

open AllDeviceManagerType;

open RenderSettingType;

open AllBrowserDetectType;

open AllJobDataType;

type renderState = {
  sceneRecord,
  vboBufferRecord,
  typeArrayPoolRecord,
  glslSenderRecord,
  programRecord,
  geometryRecord,
  cameraRecord: option(AllRenderCameraType.renderCameraRecord),
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