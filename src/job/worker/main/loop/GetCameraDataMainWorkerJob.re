open StateDataMainType;

let execJob = (_, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateDataMainService.unsafeGetState(stateData);
      OperateRenderMainService.setCameraRecord(GetCameraDataJobUtils.getCameraData(state), state);
      StateDataMainService.setState(stateData, state);
      None
    }
  );