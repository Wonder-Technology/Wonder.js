open GlType;

open ComponentType;

open TransformType;

open CameraControllerType;

open GameObjectType;

open GeometryType;

open MeshRendererType;

open MaterialType;

open ShaderType;

open ProgramType;

open GLSLLocationType;

open GLSLSenderType;

open ShaderChunkType;

open RenderDataType;

open TimeControllerType;

open Js.Typed_array;

open MemoryConfigType;

open VboBufferType;

open GPUDetectType;

open SourceInstanceType;

open ObjectInstanceType;

open GlobalTempType;

open TypeArrayPoolType;

type contextConfig = {
  alpha: bool,
  depth: bool,
  stencil: bool,
  antialias: bool,
  premultipliedAlpha: bool,
  preserveDrawingBuffer: bool
};

type bufferConfig = {mutable geometryPointDataBufferCount: int};

type gpuConfig = {mutable useHardwareInstance: bool};

type viewData = {
  canvas: option(DomType.htmlElement),
  contextConfig: option(contextConfig)
};

type initConfig = {isDebug: bool};

type colorRgba = (float, float, float, float);

type deviceManagerData = {
  gl: option(webgl1Context),
  colorWrite: option((Js.boolean, Js.boolean, Js.boolean, Js.boolean)),
  clearColor: option(colorRgba),
  viewport: option((float, float, float, float))
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

type uniformData;

type schedulerFuncRecord = {
  update: (float, state) => state,
  isFinish: state => bool,
  start: state => state
}
and schedulerData = {
  mutable count: int,
  funcRecordArray: array(schedulerFuncRecord),
  isFinishMap: array(bool)
}
and attributeSendData = {
  pos: attributeLocation,
  size: int,
  buffer: string,
  sendFunc: [@bs] ((webgl1Context, (attributeLocation, int), buffer, state) => state)
}
and instanceAttributeSendData = {pos: attributeLocation}
and uniformSendNoCachableData = {
  pos: uniformLocation,
  getNoCachableDataFunc: [@bs] ((component, state) => Float32Array.t),
  sendNoCachableDataFunc: [@bs] ((webgl1Context, uniformLocation, Float32Array.t) => unit)
}
and uniformSendCachableData = {
  shaderCacheMap,
  name: string,
  pos: uniformLocation,
  getCachableDataFunc: [@bs] ((component, state) => array(float)),
  sendCachableDataFunc:
    [@bs] ((webgl1Context, shaderCacheMap, (string, uniformLocation), array(float)) => unit)
}
and shaderUniformSendNoCachableData = {
  pos: uniformLocation,
  getNoCachableDataFunc: [@bs] (state => Float32Array.t),
  sendNoCachableDataFunc: [@bs] ((webgl1Context, uniformLocation, Float32Array.t) => unit)
}
and instanceUniformSendNoCachableData = {
  pos: uniformLocation,
  getNoCachableDataFunc: [@bs] ((transform, state) => Float32Array.t),
  sendNoCachableDataFunc: [@bs] ((webgl1Context, uniformLocation, Float32Array.t) => unit)
}
and glslSenderData = {
  attributeSendDataMap: array(array(attributeSendData)),
  instanceAttributeSendDataMap: array(array(instanceAttributeSendData)),
  uniformCacheMap,
  uniformSendNoCachableDataMap: array(array(uniformSendNoCachableData)),
  uniformSendCachableDataMap: array(array(uniformSendCachableData)),
  shaderUniformSendNoCachableDataMap: array(array(shaderUniformSendNoCachableData)),
  instanceUniformSendNoCachableDataMap: array(array(instanceUniformSendNoCachableData)),
  /* drawPointsFuncMap: array((webgl1Context => unit)), */
  mutable vertexAttribHistoryArray: array(bool),
  mutable lastSendArrayBuffer: option(buffer),
  mutable lastSendElementArrayBuffer: option(buffer),
  mutable lastSendMaterial: option(material)
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
and geometryData = {
  mutable index: int,
  verticesMap: geometryVerticesMap,
  indicesMap: geometryIndicesMap,
  mutable computeDataFuncMap: array(((int, state) => geometryComputeData)),
  mutable configDataMap: geometryConfigDataMap,
  mutable gameObjectMap,
  mutable disposedIndexArray: geometryDisposedIndexArray,
  mutable isInitMap: geometryIsInitMap,
  mutable groupCountMap: geometryGroupCountMap
}
and state = {
  bufferConfig: option(bufferConfig),
  gpuConfig: option(gpuConfig),
  memoryConfig,
  renderConfig,
  gpuDetectData,
  sourceInstanceData,
  objectInstanceData,
  viewData,
  initConfig,
  deviceManagerData,
  gameObjectData,
  mutable transformData: option(transformData),
  cameraControllerData,
  mutable materialData: option(materialData),
  mutable geometryData: option(geometryData),
  mutable meshRendererData,
  shaderData,
  programData,
  glslLocationData,
  glslSenderData,
  glslChunkData,
  renderData,
  schedulerData,
  timeControllerData,
  vboBufferData,
  globalTempData,
  typeArrayPoolData
};

type sharedDataForRestoreState = {
  gl: webgl1Context,
  float32ArrayPoolMap,
  uint16ArrayPoolMap
};

type stateData = {
  mutable state: option(state),
  mutable isDebug: bool
};