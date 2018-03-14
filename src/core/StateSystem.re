open StateDataType;

let createState = () => {
  bufferConfig: None,
  gpuConfig: None,
  canvasConfig: None,
  workerConfig: None,
  memoryConfig: ConfigMemoryService.create(),
  jobData: JobHelper.create(),
  noWorkerJobConfig: None,
  workerJobConfig: None,
  renderConfigData: None,
  gpuDetectRecord: RecordGPUDetectService.create(),
  viewRecord: RecordViewService.create(),
  initConfig: RecordInitConfigService.create(),
  sourceInstanceRecord: RecordSourceInstanceService.create(),
  objectInstanceRecord: RecordObjectInstanceService.create(),
  deviceManagerRecord: RecordDeviceManagerService.create(),
  gameObjectRecord: RecordGameObjectService.create(),
  transformRecord: RecordTransformServicie.create(),
  sceneRecord: RecordSceneService.create(),
  basicCameraViewRecord: RecordBasicCameraViewService.create(),
  perspectiveCameraProjectionRecord: RecordPerspectiveCameraProjectionService.create(),
  basicMaterialRecord: RecordBasicMaterialService.create(),
  lightMaterialRecord: RecordLightMaterialService.create(),
  ambientLightRecord: RecordAmbientLightService.create(),
  directionLightRecord: RecordDirectionLightService.create(),
  pointLightRecord: RecordPointLightService.create(),
  boxGeometryRecord: RecordBoxGeometryService.create(),
  meshRendererRecord: RecordMeshRendererService.create(),
  shaderRecord: RecordShaderService.create(),
  glslRecord: RecordGLSLService.create(),
  programRecord: RecordProgramService.create(),
  glslLocationRecord: RecordGLSLLocationService.create(),
  glslSenderRecord: RecordGLSLSenderService.create(),
  glslChunkData: ShaderChunkSystem.create(),
  renderRecord: RecordRenderService.create(),
  timeControllerData: TimeControllerHelper.create(),
  vboBufferRecord: RecordVboBufferService.create(),
  globalTempRecord: RecordGlobalTempService.create(),
  typeArrayPoolRecord: RecordTypeArrayPoolService.create(),
  workerInstanceData: WorkerInstanceHelper.create(),
  workerDetectData: WorkerDetectHelper.create()
};

let getState = (stateData: stateData) : state =>
  switch stateData.state {
  | None => createState()
  | Some(state) => state
  };

let setState = (stateData: stateData, state: state) => {
  stateData.state = Some(state);
  state
};

let deepCopyForRestore = (state: StateDataType.state) => {
  ...state,
  gameObjectRecord: RecordGameObjectService.deepCopyForRestore(state.gameObjectRecord),
  basicCameraViewRecord:
    RecordBasicCameraViewService.deepCopyForRestore(state.basicCameraViewRecord),
  perspectiveCameraProjectionRecord:
    RecordPerspectiveCameraProjectionService.deepCopyForRestore(
      state.perspectiveCameraProjectionRecord
    ),
  meshRendererRecord: RecordMeshRendererService.deepCopyForRestore(state.meshRendererRecord),
  transformRecord: RecordTransformServicie.deepCopyForRestore(state.transformRecord),
  typeArrayPoolRecord: RecordTypeArrayPoolService.deepCopyForRestore(state.typeArrayPoolRecord),
  boxGeometryRecord: RecordBoxGeometryService.deepCopyForRestore(state.boxGeometryRecord),
  basicMaterialRecord: RecordBasicMaterialService.deepCopyForRestore(state.basicMaterialRecord),
  lightMaterialRecord: RecordLightMaterialService.deepCopyForRestore(state.lightMaterialRecord),
  ambientLightRecord: RecordAmbientLightService.deepCopyForRestore(state.ambientLightRecord),
  directionLightRecord: RecordDirectionLightService.deepCopyForRestore(state.directionLightRecord),
  pointLightRecord: RecordPointLightService.deepCopyForRestore(state.pointLightRecord),
  sourceInstanceRecord: RecordSourceInstanceService.deepCopyForRestore(state.sourceInstanceRecord),
  objectInstanceRecord: RecordObjectInstanceService.deepCopyForRestore(state.objectInstanceRecord),
  vboBufferRecord: RecordVboBufferService.deepCopyForRestore(state.vboBufferRecord),
  deviceManagerRecord: RecordDeviceManagerService.deepCopyForRestore(state.deviceManagerRecord),
  shaderRecord: RecordShaderService.deepCopyForRestore(state.shaderRecord),
  glslRecord: RecordGLSLService.deepCopyForRestore(state.glslRecord)
};

let _getSharedData =
    ({typeArrayPoolRecord, deviceManagerRecord} as currentState: StateDataType.state) => {
  gl: [@bs] DeviceManagerService.unsafeGetGl(deviceManagerRecord),
  float32ArrayPoolMap: TypeArrayPoolService.getFloat32ArrayPoolMap(typeArrayPoolRecord),
  uint16ArrayPoolMap: TypeArrayPoolService.getUint16ArrayPoolMap(typeArrayPoolRecord)
};

let restore =
    (stateData: stateData, currentState: StateDataType.state, targetState: StateDataType.state) => {
  let intersectShaderIndexDataArray =
    IntersectShaderIndexMainService.getIntersectShaderIndexDataArray(currentState, targetState);
  let sharedData = _getSharedData(currentState);
  let (targetState, sharedData) =
    targetState |> RestoreBoxGeometryMainService.restore(currentState, sharedData);
  let (targetState, sharedData) =
    targetState |> RestoreTransformMainService.restore(currentState, sharedData);
  let (targetState, sharedData) =
    targetState |> RestoreSourceInstanceMainService.restore(currentState, sharedData);
  let targetState = targetState |> RestoreDeviceManagerMainService.restore(currentState, sharedData);
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
      }, StateData.stateData.isDebug); */
};