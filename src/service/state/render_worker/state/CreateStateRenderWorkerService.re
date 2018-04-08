open StateDataRenderWorkerType;

let createState = () => {
  renderConfigRecord: None,
  basicMaterialRecord: None,
  transformRecord: None,
  gpuDetectRecord: {extensionInstancedArrays: None, precision: None},
  shaderRecord: RecordShaderService.create(),
  glslRecord: RecordGLSLService.create(),
  programRecord: RecordProgramService.create(),
  glslLocationRecord: RecordGLSLLocationService.create(),
  glslSenderRecord: RecordGLSLSenderAllService.create(),
  glslChunkRecord: ShaderChunkSystem.create(),
  deviceManagerRecord: RecordDeviceManagerService.create()
};