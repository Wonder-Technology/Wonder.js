type context = {
  alpha: bool,
  depth: bool,
  stencil: bool,
  antialias: bool,
  premultipliedAlpha: bool,
  preserveDrawingBuffer: bool
};

type memory = {
  maxDisposeCount: int,
  maxTypeArrayPoolSize: int,
  maxBigTypeArrayPoolSize: int
};

type instanceBuffer = {
  sourceInstanceCount: int,
  objectInstanceCountPerSourceInstance: int
};

type buffer = {
  customGeometryPointDataBufferCount: int,
  transformDataBufferCount: int,
  basicMaterialDataBufferCount: int,
  lightMaterialDataBufferCount: int,
  textureCountPerBasicMaterial: int,
  instanceBuffer
};

type worker = {useWorker: bool};

type settingRecord = {
  canvasId: option(string),
  memory: option(memory),
  buffer: option(buffer),
  isDebug: option(bool),
  context: option(context),
  gpu: option(SettingGPUType.gpu),
  worker: option(worker)
};