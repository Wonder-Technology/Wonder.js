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

type buffer = {geometryPointDataBufferCount: int};

type gpu = {useHardwareInstance: bool};

type worker = {useWorker: bool};

type settingRecord = {
  canvasId: option(string),
  memory: option(memory),
  buffer: option(buffer),
  isDebug: option(bool),
  context: option(context),
  gpu: option(gpu),
  worker: option(worker)
};