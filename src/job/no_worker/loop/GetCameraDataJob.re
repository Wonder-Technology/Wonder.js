open StateDataMainType;

let execJob = (_, state) =>
  OperateRenderMainService.setCameraRecord(GetCameraDataJobUtils.getCameraData(state), state);