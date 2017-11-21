open StateDataType;

open RenderConfigParseSystem;

let getState = (stateData: stateData) : state => Js.Option.getExn(stateData.state);

let setState = (stateData: stateData, state: state) => {
  stateData.state = Some(state);
  state
};

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
    viewData: {canvas: None, contextConfig: None},
    initConfig: {isTest: Some(false)},
    deviceManagerData: {gl: None, colorWrite: None, clearColor: None},
    gameObjectData: GameObjectSystem.initData(),
    transformData: None,
    cameraControllerData: CameraControllerSystem.initData(),
    materialData: None,
    geometryData: None,
    meshRendererData: MeshRendererSystem.initData(),
    shaderData: ShaderSystem.initData(),
    programData: ProgramSystem.initData(),
    glslLocationData: GLSLLocationSystem.initData(),
    glslSenderData: GLSLSenderSystem.initData(),
    glslChunkData: ShaderChunkSystem.initData(),
    renderData: RenderDataSystem.initData(),
    schedulerData: ScheduleControllerSystem.initData(),
    timeControllerData: TimeControllerSystem.initData(),
    vboBufferData: VboBufferSystem.initData()
  }
};