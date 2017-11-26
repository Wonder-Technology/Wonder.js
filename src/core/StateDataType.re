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

open ShaderChunkType;

open RenderDataType;

open TimeControllerType;

open Js.Typed_array;

open MemoryConfigType;

open VboBufferType;

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

type initConfig = {isTest: option(bool)};

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
  flags: jobFlags,
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

type material_shader = {shader_libs: array(shaderLibItem)};

type shader = {material_shader};

type shaders = {
  groups: array(shaderGroup),
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
  sendFunc: [@bs] ((webgl1Context, attributeLocation, int, buffer, state) => state)
}
and uniformSendData = {
  pos: uniformLocation,
  getArrayDataFunc: [@bs] ((gameObject, state) => Float32Array.t),
  sendArrayDataFunc: [@bs] ((webgl1Context, uniformLocation, Float32Array.t) => unit)
  /* sendFloat32DataFunc: float => unit;
     sendIntDataFunc: int => unit; */
}
and glslSenderData = {
  attributeSendDataMap: array(array(attributeSendData)),
  uniformSendDataMap: array(array(uniformSendData)),
  drawPointsFuncMap: array((webgl1Context => unit)),
  mutable vertexAttribHistoryArray: array(bool),
  /* mutable lastSendArrayBuffer: option(buffer), */
  mutable lastSendElementArrayBuffer: option(buffer)
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
  mutable mappedIndex: int,
  buffer: Js.Typed_array.array_buffer,
  vertices: Js.Typed_array.Float32Array.t,
  /* todo optimize: use Uint32Array based on config or query gpu extension */
  indices: Js.Typed_array.Uint16Array.t,
  mutable verticesInfoArray: geometryInfoArray,
  mutable indicesInfoArray: geometryInfoArray,
  mutable verticesOffset: int,
  mutable indicesOffset: int,
  mutable computeDataFuncMap: array(((int, state) => geometryComputeData)),
  mutable configDataMap: geometryConfigDataMap,
  mutable gameObjectMap,
  mutable disposeCount: int,
  mutable mappedIndexMap: geometryMappedIndexMap,
  mutable disposedIndexMap: geometryDisposeIndexMap,
  mutable aliveIndexArray: geometryAliveIndexArray,
  mutable indicesCountCacheMap: geometryIndicesCountCacheMap,
  mutable verticesCountCacheMap: geometryVerticesCountCacheMap,
  mutable isClonedMap: geometryIsClonedMap
}
and state = {
  bufferConfig: option(bufferConfig),
  memoryConfig,
  renderConfig,
  viewData,
  initConfig,
  deviceManagerData,
  gameObjectData,
  mutable transformData: option(transformData),
  cameraControllerData,
  mutable materialData: option(materialData),
  mutable geometryData: option(geometryData),
  meshRendererData,
  shaderData,
  programData,
  glslLocationData,
  glslSenderData,
  glslChunkData,
  renderData,
  schedulerData,
  timeControllerData,
  vboBufferData
};

type stateData = {
  mutable state: option(state),
  mutable isTest: option(bool)
};