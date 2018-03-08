open StateDataType;

let createState = () => {
  bufferConfig: None,
  gpuConfig: None,
  canvasConfig: None,
  workerConfig: None,
  memoryConfig: MemoryConfigSystem.create(),
  jobData: JobHelper.create(),
  noWorkerJobConfig: None,
  workerJobConfig: None,
  renderConfigData: None,
  gpuDetectData: {extensionInstancedArrays: None, precision: None},
  viewData: {canvas: None, contextConfig: None},
  initConfig: {isDebug: false},
  sourceInstanceData: SourceInstanceHelper.create(),
  objectInstanceData: ObjectInstanceHelper.create(),
  deviceManagerData: {gl: None, side: None, colorWrite: None, clearColor: None, viewport: None},
  gameObjectRecord: GameObjectRecordService.create(),
  transformData: TransformHelper.create(),
  sceneRecord: SceneRecordService.create(),
  basicCameraViewRecord: BasicCameraViewRecordService.create(),
  perspectiveCameraProjectionRecord: PerspectiveCameraProjectionRecordService.create(),
  basicMaterialData: BasicMaterialHelper.create(),
  lightMaterialData: LightMaterialHelper.create(),
  ambientLightData: AmbientLightHelper.create(),
  directionLightData: DirectionLightHelper.create(),
  pointLightData: PointLightHelper.create(),
  geometryData: GeometryHelper.create(),
  meshRendererData: MeshRendererHelper.create(),
  shaderData: ShaderHelper.create(),
  programData: ProgramHelper.create(),
  glslLocationData: GLSLLocationHelper.create(),
  glslSenderData: GLSLSenderHelper.create(),
  glslChunkData: ShaderChunkSystem.create(),
  renderData: RenderDataHelper.create(),
  timeControllerData: TimeControllerHelper.create(),
  vboBufferData: VboBufferHelper.create(),
  globalTempData: GlobalTempHelper.create(),
  typeArrayPoolData: TypeArrayPoolHelper.create(),
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

let deepCopyStateForRestore = (state: StateDataType.state) =>
  state
  |> MeshRendererAdmin.deepCopyStateForRestore
  |> TransformAdmin.deepCopyStateForRestore
  |> GeometryAdmin.deepCopyStateForRestore
  |> VboBufferSystem.deepCopyStateForRestore
  |> GLSLSenderSystem.deepCopyStateForRestore
  |> BasicMaterialAdmin.deepCopyStateForRestore
  |> LightMaterialAdmin.deepCopyStateForRestore
  |> AmbientLightAdmin.deepCopyStateForRestore
  |> DirectionLightAdmin.deepCopyStateForRestore
  |> PointLightAdmin.deepCopyStateForRestore
  |> ShaderSystem.deepCopyStateForRestore
  |> ProgramSystem.deepCopyStateForRestore
  |> GLSLLocationSystem.deepCopyStateForRestore
  |> DeviceManagerSystem.deepCopyStateForRestore
  |> TypeArrayPoolSystem.deepCopyStateForRestore
  |> SourceInstanceAdmin.deepCopyStateForRestore
  |> ObjectInstanceAdmin.deepCopyStateForRestore
  |> (
    (state) => {
      ...state,
      gameObjectRecord: GameObjectRecordService.deepCopyForRestore(state.gameObjectRecord),
      basicCameraViewRecord:
        BasicCameraViewRecordService.deepCopyForRestore(state.basicCameraViewRecord),
      perspectiveCameraProjectionRecord:
        PerspectiveCameraProjectionRecordService.deepCopyForRestore(
          state.perspectiveCameraProjectionRecord
        )
    }
  );

let _getSharedData = (currentState: StateDataType.state) => {
  gl: [@bs] DeviceManagerSystem.unsafeGetGl(currentState),
  float32ArrayPoolMap: TypeArrayPoolSystem.getFloat32ArrayPoolMap(currentState),
  uint16ArrayPoolMap: TypeArrayPoolSystem.getUint16ArrayPoolMap(currentState)
};

let restore =
    (stateData: stateData, currentState: StateDataType.state, targetState: StateDataType.state) => {
  let intersectShaderIndexDataArray =
    ShaderSystem.getIntersectShaderIndexDataArray(currentState, targetState);
  let sharedData = _getSharedData(currentState);
  let (targetState, sharedData) = targetState |> GeometryAdmin.restore(currentState, sharedData);
  let (targetState, sharedData) = targetState |> TransformAdmin.restore(currentState, sharedData);
  let (targetState, sharedData) =
    targetState |> SourceInstanceAdmin.restore(currentState, sharedData);
  let targetState = targetState |> DeviceManagerSystem.restore(currentState, sharedData);
  let gl = [@bs] DeviceManagerSystem.unsafeGetGl(targetState);
  targetState
  |> TypeArrayPoolSystem.restore(currentState, sharedData)
  |> VboBufferSystem.restore(currentState)
  |> ShaderSystem.restore(currentState)
  |> ProgramSystem.restore(intersectShaderIndexDataArray, currentState)
  |> GLSLLocationSystem.restore(intersectShaderIndexDataArray, currentState)
  |> GLSLSenderSystem.restore(intersectShaderIndexDataArray, currentState)
  |> BasicMaterialAdmin.restore(gl, currentState)
  |> LightMaterialAdmin.restore(gl, currentState)
  |> AmbientLightAdmin.restore(currentState)
  |> DirectionLightAdmin.restore(currentState)
  |> PointLightAdmin.restore(currentState)
  |> RenderDataSystem.restore(currentState)
  |> GlobalTempSystem.restore(currentState)
  |> setState(stateData)
  /* |> WonderLog.Contract.ensureCheck ((state) => {
      open WonderLog;
      open Contract;
      open Operators;
      test
      (Log.buildAssertMessage(~expect={j|gl exist|j}, ~actual={j|not|j}),
      (
      () => {
     [@bs]DeviceManagerSystem.unsafeGetGl(state)
      })
      );
      }, StateData.stateData.isDebug); */
};