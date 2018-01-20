open StateDataType;

let getState = (stateData: stateData) : state => Js.Option.getExn(stateData.state);

let setState = (stateData: stateData, state: state) => {
  stateData.state = Some(state);
  state
};

let deepCopyStateForRestore = (state: StateDataType.state) =>
  state
  |> MeshRendererAdmin.deepCopyStateForRestore
  |> TransformAdmin.deepCopyStateForRestore
  |> CameraControllerAdmin.deepCopyStateForRestore
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
  |> GameObjectAdmin.deepCopyStateForRestore;

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

let createState = () => {
  bufferConfig: None,
  gpuConfig: None,
  memoryConfig: MemoryConfigSystem.initData(),
  jobData: JobHelper.initData(),
  logicJobConfig: None,
  renderJobConfig: None,
  gpuDetectData: {extensionInstancedArrays: None, precision: None},
  viewData: {canvas: None, contextConfig: None},
  initConfig: {isDebug: false},
  sourceInstanceData: SourceInstanceHelper.initData(),
  objectInstanceData: ObjectInstanceHelper.initData(),
  deviceManagerData: {gl: None, side: None, colorWrite: None, clearColor: None, viewport: None},
  gameObjectData: GameObjectHelper.initData(),
  transformData: TransformHelper.initData(),
  cameraControllerData: CameraControllerHelper.initData(),
  basicMaterialData: BasicMaterialHelper.initData(),
  lightMaterialData: LightMaterialHelper.initData(),
  ambientLightData: AmbientLightHelper.initData(),
  directionLightData: DirectionLightHelper.initData(),
  pointLightData: PointLightHelper.initData(),
  geometryData: GeometryHelper.initData(),
  meshRendererData: MeshRendererHelper.initData(),
  shaderData: ShaderHelper.initData(),
  programData: ProgramHelper.initData(),
  glslLocationData: GLSLLocationHelper.initData(),
  glslSenderData: GLSLSenderHelper.initData(),
  glslChunkData: ShaderChunkSystem.initData(),
  renderData: RenderDataHelper.initData(),
  timeControllerData: TimeControllerHelper.initData(),
  vboBufferData: VboBufferHelper.initData(),
  globalTempData: GlobalTempHelper.initData(),
  typeArrayPoolData: TypeArrayPoolHelper.initData(),
  workerInstanceData: WorkerInstanceHelper.initData(),
  workerDetectData: WorkerDetectHelper.initData()
};