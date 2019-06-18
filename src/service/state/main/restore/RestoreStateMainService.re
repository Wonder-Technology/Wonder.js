open StateDataMainType;

open StateDataMainService;

let _getSharedData =
    (
      {typeArrayPoolRecord, deviceManagerRecord} as currentState: StateDataMainType.state,
    ) => {
  gl: AllDeviceManagerService.unsafeGetGl(. deviceManagerRecord),
  float32ArrayPoolMap:
    TypeArrayPoolService.getFloat32ArrayPoolMap(typeArrayPoolRecord),
  uint16ArrayPoolMap:
    TypeArrayPoolService.getUint16ArrayPoolMap(typeArrayPoolRecord),
};

let restore =
    (
      stateData: stateData,
      currentState: StateDataMainType.state,
      targetState: StateDataMainType.state,
    ) => {
  let sharedData = _getSharedData(currentState);
  let (targetState, sharedData) =
    targetState
    |> RestoreSourceInstanceMainService.restore(currentState, sharedData);
  let targetState =
    targetState |> RestoreDeviceManagerMainService.restore(currentState);
  let gl =
    AllDeviceManagerService.unsafeGetGl(. targetState.deviceManagerRecord);
  targetState
  |> RestoreTypeArrayPoolMainService.restore(currentState, sharedData)
  |> RestoreGlobalTempMainService.restore(currentState)
  |> RestoreVboBufferMainService.restore(currentState)
  |> RestoreShaderMainService.restore(currentState)
  |> RestoreProgramMainService.restore(currentState)
  |> RestoreGLSLLocationMainService.restore(currentState)
  |> RestoreGLSLSenderMainService.restore(currentState)
  |> RestoreBasicMaterialMainService.restore(gl, currentState)
  |> RestoreLightMaterialMainService.restore(gl, currentState)
  |> RestoreRenderMainService.restore(currentState)
  |> RestoreTransformMainService.restore(currentState)
  |> RestoreMeshRendererMainService.restore(currentState)
  |> RestoreGeometryMainService.restore(currentState)
  |> RestoreDirectionLightMainService.restore(currentState)
  |> RestorePointLightMainService.restore(currentState)
  |> RestoreSourceTextureMainService.restore(currentState)
  |> RestoreBasicSourceTextureMainService.restore(currentState)
  |> RestoreArrayBufferViewSourceTextureMainService.restore(currentState)
  |> RestoreCubemapTextureMainService.restore(currentState)
  |> setState(stateData);
};