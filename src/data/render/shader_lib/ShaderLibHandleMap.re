open StateDataType;

let _getShaderLibHandles = () => [("sendAmbientLight", PregetGLSLDataJob.getJob)];

let createShaderLibHandleMap = () =>
  WonderCommonlib.HashMapSystem.fromList(_getShaderLibHandles());