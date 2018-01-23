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
  flags: jobFlags,
  shader: option(string)
};

type hardwareRelatedSetting = {
  platform: string,
  backend,
  browser
};

type shaderMapData = {
  name: string,
  value: array(string)
};

/* type shaderStaticBranch = {
     name: string,
     value: array(string)
   }; */
type shaderLibItem = {
  type_: option(string),
  name: string
};

type material_shader = {shader_libs: array(shaderLibItem)};

type shader = {material_shader};

type shaders = {
  static_branchs: array(shaderMapData),
  groups: array(shaderMapData),
  basic_material: shader
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

type renderConfig = {
  render_setting,
  init_pipelines: pipelines,
  render_pipelines: pipelines,
  init_jobs,
  render_jobs,
  shaders,
  shader_libs
};