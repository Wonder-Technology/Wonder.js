open StateDataMainType;

open StateDataMainService;

let _getSharedData =
    ({typeArrayPoolRecord, deviceManagerRecord} as currentState: StateDataMainType.state) => {
  gl: [@bs] DeviceManagerService.unsafeGetGl(deviceManagerRecord),
  float32ArrayPoolMap: TypeArrayPoolService.getFloat32ArrayPoolMap(typeArrayPoolRecord),
  uint16ArrayPoolMap: TypeArrayPoolService.getUint16ArrayPoolMap(typeArrayPoolRecord)
};

let restore =
    (
      stateData: stateData,
      currentState: StateDataMainType.state,
      targetState: StateDataMainType.state
    ) => {
  let intersectShaderIndexDataArray =
    IntersectShaderIndexMainService.getIntersectShaderIndexDataArray(currentState, targetState);
  let sharedData = _getSharedData(currentState);
  let (targetState, sharedData) =
    targetState |> RestoreSourceInstanceMainService.restore(currentState, sharedData);
  let targetState =
    targetState |> RestoreDeviceManagerMainService.restore(currentState, sharedData);
  let gl = [@bs] DeviceManagerService.unsafeGetGl(targetState.deviceManagerRecord);
  targetState
  |> RestoreTypeArrayPoolMainService.restore(currentState, sharedData)
  |> RestoreGlobalTempMainService.restore(currentState)
  |> RestoreVboBufferMainService.restore(currentState)
  |> RestoreShaderMainService.restore(currentState)
  |> RestoreProgramMainService.restore(intersectShaderIndexDataArray, currentState)
  |> RestoreGLSLLocationMainService.restore(intersectShaderIndexDataArray, currentState)
  |> RestoreGLSLSenderMainService.restore(intersectShaderIndexDataArray, currentState)
  |> RestoreBasicMaterialMainService.restore(gl, currentState)
  |> RestoreLightMaterialMainService.restore(gl, currentState)
  |> RestoreRenderMainService.restore(currentState)
  |> setState(stateData)
};