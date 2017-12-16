open StateDataType;

open RenderConfigParseUtils;

let getState = (stateData: stateData) : state => Js.Option.getExn(stateData.state);

let setState = (stateData: stateData, state: state) => {
  stateData.state = Some(state);
  state
};

let deepCopyState = (state: StateDataType.state) =>
  state
  |> MeshRendererAdmin.deepCopyState
  |> TransformAdmin.deepCopyState
  |> CameraControllerAdmin.deepCopyState
  |> GeometryAdmin.deepCopyState
  |> VboBufferSystem.deepCopyState
  |> GLSLSenderSystem.deepCopyState
  |> MaterialAdmin.deepCopyState;

let restoreFromState = (stateData: stateData, currentState, targetState) =>
  targetState
  |> TransformAdmin.restoreFromState(currentState)
  |> GeometryAdmin.restoreFromState(currentState)
  |> VboBufferSystem.restoreFromState(currentState)
  |> GLSLSenderSystem.restoreFromState(currentState)
  |> setState(stateData);

/* let createState = (( render_setting, init_pipelines, render_pipelines, init_jobs, render_jobs, shaders, shader_libs )) => { */
let createState =
    /* ~renderConfig=(
         Render_setting.render_setting,
         Init_pipelines.init_pipelines,
         Render_pipelines.render_pipelines,
         Init_jobs.init_jobs,
         Render_jobs.render_jobs,
         Shaders.shaders,
         Shader_libs.shader_libs
       ), */
    (
      ~renderConfig=(
                      Render_setting.render_setting,
                      Init_pipelines.init_pipelines,
                      Render_pipelines.render_pipelines,
                      Init_jobs.init_jobs,
                      Render_jobs.render_jobs,
                      Shaders.shaders,
                      Shader_libs.shader_libs
                    ),
      ()
    ) => {
  let (
    render_setting,
    init_pipelines,
    render_pipelines,
    init_jobs,
    render_jobs,
    shaders,
    shader_libs
  ) = renderConfig;
  {
    bufferConfig: None,
    memoryConfig: MemoryConfigSystem.initData(),
    renderConfig: {
      jobHandleMap: JobHandleSystem.createJobHandleMap(),
      render_setting: convertRenderSettingToRecord(render_setting),
      init_pipelines: convertInitPipelinesToRecord(init_pipelines),
      render_pipelines: convertRenderPipelinesToRecord(render_pipelines),
      init_jobs: convertInitJobsToRecord(init_jobs),
      render_jobs: convertRenderJobsToRecord(render_jobs),
      shaders: convertShadersToRecord(shaders),
      shader_libs: convertShaderLibsToRecord(shader_libs)
    },
    gpuDetectData: {extensionInstancedArrays: None, precision: None},
    viewData: {canvas: None, contextConfig: None},
    initConfig: {isTest: false},
    sourceInstanceData: SourceInstanceHelper.initData(),
    objectInstanceData: ObjectInstanceHelper.initData(),
    deviceManagerData: {gl: None, colorWrite: None, clearColor: None},
    gameObjectData: GameObjectHelper.initData(),
    transformData: None,
    cameraControllerData: CameraControllerHelper.initData(),
    materialData: None,
    geometryData: None,
    meshRendererData: MeshRendererHelper.initData(),
    shaderData: ShaderHelper.initData(),
    programData: ProgramHelper.initData(),
    glslLocationData: GLSLLocationHelper.initData(),
    glslSenderData: GLSLSenderHelper.initData(),
    glslChunkData: ShaderChunkSystem.initData(),
    renderData: RenderDataHelper.initData(),
    schedulerData: ScheduleControllerHelper.initData(),
    timeControllerData: TimeControllerHelper.initData(),
    vboBufferData: VboBufferHelper.initData(),
    globalTempData: GlobalTempHelper.initData()
  }
};