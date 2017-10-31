open GlType;

open TransformType;

open CameraControllerType;

open GameObjectType;

open RenderConfigType;

type contextConfig = {
  alpha: bool,
  depth: bool,
  stencil: bool,
  antialias: bool,
  premultipliedAlpha: bool,
  preserveDrawingBuffer: bool
};

type bufferConfig = {mutable transformDataBufferCount: int};

type viewData = {
  canvas: option Dom.htmlElement,
  contextConfig: option contextConfig
};

type initConfigData = {isTest: option bool};

type deviceManagerData = {gl: option webgl1Context};

type specificBowser = {
  name: string,
  version: string
};

type browser = array specificBowser;

type backend = {name: string, fail: option string};

type render_setting = {
  platform: string,
  backend,
  browser,
  init_pipeline: string,
  render_pipeline: string
};

type job = {name: string};
/* type pipelineJob = {name: string}; */

type initPipeline = {
  name: string,
  /* jobs: array pipelineJob */
  jobs: array job
};

type init_pipelines = array initPipeline;

/* type job = {name: string}; */

type init_jobs = array job;

type hardwareRelatedSetting = {
  platform:string,
  backend,
  browser
};

type renderConfig = {
  jobHandleMap: Js.Dict.t (state => state),
  render_setting,
  init_pipelines,
  init_jobs
}
and state = {
  bufferConfig: option bufferConfig,
  renderConfig,
  viewData,
  initConfigData,
  deviceManagerData,
  gameObjectData,
  mutable transformData: option transformData,
  cameraControllerData
};

type stateData = {mutable state: option state};