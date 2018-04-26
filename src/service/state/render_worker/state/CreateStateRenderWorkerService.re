open StateDataRenderWorkerType;

let createState = () => {
  settingRecord: RecordRenderWorkerSettingService.create(),
  renderConfigRecord: None,
  basicMaterialRecord: None,
  lightMaterialRecord: None,
  ambientLightRecord: None,
  directionLightRecord: None,
  pointLightRecord: None,
  transformRecord: None,
  boxGeometryRecord: RecordBoxGeometryRenderWorkerService.create(),
  customGeometryRecord: None,
  sourceInstanceRecord: RecordRenderWorkerSourceInstanceService.create(),
  gpuDetectRecord: {extensionInstancedArrays: None, precision: None},
  shaderRecord: RecordShaderService.create(),
  glslRecord: RecordGLSLService.create(),
  programRecord: RecordProgramService.create(),
  glslLocationRecord: RecordGLSLLocationService.create(),
  glslSenderRecord: RecordGLSLSenderAllService.create(),
  glslChunkRecord: ShaderChunkSystem.create(),
  deviceManagerRecord: RecordDeviceManagerService.create(),
  renderRecord: RecordRenderWorkerRenderService.create(),
  typeArrayPoolRecord: RecordTypeArrayPoolService.create(),
  globalTempRecord: RecordGlobalTempService.create(),
  vboBufferRecord: RecordVboBufferService.create(),
  workerDetectRecord: None
};