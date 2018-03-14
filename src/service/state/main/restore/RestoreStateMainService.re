open MainStateDataType;

open StateDataMainService;

let _getSharedData =
    ({typeArrayPoolRecord, deviceManagerRecord} as currentState: MainStateDataType.state) => {
  gl: [@bs] DeviceManagerService.unsafeGetGl(deviceManagerRecord),
  float32ArrayPoolMap: TypeArrayPoolService.getFloat32ArrayPoolMap(typeArrayPoolRecord),
  uint16ArrayPoolMap: TypeArrayPoolService.getUint16ArrayPoolMap(typeArrayPoolRecord)
};

let restore =
    (stateData: stateData, currentState: MainStateDataType.state, targetState: MainStateDataType.state) => {
  let intersectShaderIndexDataArray =
    IntersectShaderIndexMainService.getIntersectShaderIndexDataArray(currentState, targetState);
  let sharedData = _getSharedData(currentState);
  let (targetState, sharedData) =
    targetState |> RestoreBoxGeometryMainService.restore(currentState, sharedData);
  let (targetState, sharedData) =
    targetState |> RestoreTransformMainService.restore(currentState, sharedData);
  let (targetState, sharedData) =
    targetState |> RestoreSourceInstanceMainService.restore(currentState, sharedData);
  let targetState =
    targetState |> RestoreDeviceManagerMainService.restore(currentState, sharedData);
  let gl = [@bs] DeviceManagerService.unsafeGetGl(targetState.deviceManagerRecord);
  /* let targetState = {
       ...targetState,
       typeArrayPoolRecord: RestoreTypeArrayPoolMainService.restore(currentState, targetState),
       globalTempRecord: RestoreGlobalTempMainService.restore(currentState, targetState)
     }; */
  targetState
  /* |> TypeArrayPoolService.restore(currentState, sharedData) */
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
  /* |> RecordGlobalTempService.restore(currentState) */
  |> setState(stateData)
  /* |> WonderLog.Contract.ensureCheck ((state) => {
      open WonderLog;
      open Contract;
      open Operators;
      test
      (Log.buildAssertMessage(~expect={j|gl exist|j}, ~actual={j|not|j}),
      (
      () => {
     [@bs]DeviceManagerService.unsafeGetGl(state.deviceManagerRecord)
      })
      );
      }, IsDebugMainService.getIsDebug(MainStateData.stateData)); */
};