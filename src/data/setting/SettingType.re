type context = {
  alpha: bool,
  depth: bool,
  stencil: bool,
  antialias: bool,
  premultipliedAlpha: bool,
  preserveDrawingBuffer: bool
};

type gpu = {useHardwareInstance: bool};

type worker = {
  useWorker: bool
};

type setting = {
  canvasId: option(string),
  isDebug: bool,
  context,
  gpu,
  worker
};