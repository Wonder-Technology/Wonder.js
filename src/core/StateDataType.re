open GlType;

open TransformType;

open CameraControllerType;

open GameObjectType;

open GeometryType;

open MeshRendererType;

open MaterialType;

open ShaderType;

open ProgramType;

open ShaderChunkType;

open RenderDataType;

open Js.Typed_array;

type contextConfig = {
  alpha: bool,
  depth: bool,
  stencil: bool,
  antialias: bool,
  premultipliedAlpha: bool,
  preserveDrawingBuffer: bool
};

type bufferConfig = {
  mutable transformDataBufferCount: int,
  mutable geometryPointDataBufferCount: int,
  mutable basicMaterialDataBufferCount: int
};

type viewData = {
  canvas: option(DomType.htmlElement),
  contextConfig: option(contextConfig)
};

type initConfigData = {isTest: option(bool)};

type colorRgba = (float, float, float, float);

type deviceManagerData = {
  gl: option(webgl1Context),
  colorWrite: option((Js.boolean, Js.boolean, Js.boolean, Js.boolean)),
  clearColor: option(colorRgba)
};

type specificBowser = {
  name: string,
  version: string
};

type browser = array(specificBowser);

type backend = {
  name: string,
  fail: option(string)
};

type render_setting = {
  platform: string,
  backend,
  browser,
  init_pipeline: string,
  render_pipeline: string
};

type jobFlags = option(array(string));

type jobItem = {
  name: string,
  flags: jobFlags
};

/* type initPipeline = {
     name: string,
     /* jobs: array pipelineJob */
     jobs: array(jobItem)
   };

   type init_pipelines = array(initPipeline); */
type pipeline = {
  name: string,
  /* jobs: array pipelineJob */
  jobs: array(jobItem)
};

type pipelines = array(pipeline);

type job = {
  name: string,
  /* no material shader which is used */
  shader: option(string)
};

/* type job = jobItem; */
type init_jobs = array(job);

/* type renderPipeline = {
     name: string,
     jobs: array(jobItem)
   };

   type render_pipelines = array(renderPipeline); */
type render_jobs = array(job);

type executableJob = {
  name: string,
  flags: option(array(string)),
  shader: option(string)
};

type hardwareRelatedSetting = {
  platform: string,
  backend,
  browser
};

type shaderGroup = {
  name: string,
  value: array(string)
};

type shaderLibItem = {
  type_: option(string),
  name: string
};

type shader = {
  name: string,
  shader_libs: array(shaderLibItem)
};

type shaders = {
  groups: array(shaderGroup),
  basic_material: array(shader)
};

type glsl = {
  type_: string,
  name: string
};

type attribute = {
  name: option(string),
  buffer: string,
  type_: option(string)
};

type uniform = {
  name: string,
  field: string,
  type_: string,
  from: string
};

type variables = {
  uniforms: option(array(uniform)),
  attributes: option(array(attribute))
};

type shaderLib = {
  name: string,
  glsls: option(array(glsl)),
  variables: option(variables)
};

type shader_libs = array(shaderLib);

type executableJobFlags = (jobFlags, option(string));

type uniformData;

type uniformSendData = {
  getArrayDataFunc: state => array(float),
  sendArrayDataFunc: array(float) => unit
  /* sendFloat32DataFunc: float => unit;
     sendIntDataFunc: int => unit; */
}
and glslSenderData = {
  attributeSendDataMap: Js.Dict.t(array((state => state))),
  uniformSendDataMap: Js.Dict.t(array(uniformSendData)),
  drawPointsFuncMap: Js.Dict.t((webgl1Context => unit)),
  mutable vertexAttribHistoryArray: array(bool)
}
and renderConfig = {
  jobHandleMap: Js.Dict.t(((executableJobFlags, webgl1Context, state) => state)),
  render_setting,
  init_pipelines: pipelines,
  render_pipelines: pipelines,
  init_jobs,
  render_jobs,
  shaders,
  shader_libs
}
and state = {
  bufferConfig: option(bufferConfig),
  renderConfig,
  viewData,
  initConfigData,
  deviceManagerData,
  gameObjectData,
  mutable transformData: option(transformData),
  cameraControllerData,
  mutable materialData: option(materialData),
  mutable geometryData: option(geometryData),
  meshRendererData,
  shaderData,
  programData,
  glslSenderData,
  glslChunkData,
  renderData
};

type stateData = {mutable state: option(state)};