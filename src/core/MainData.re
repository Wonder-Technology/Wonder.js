type contextConfigData = {
  alpha: bool,
  depth: bool,
  stencil: bool,
  antialias: bool,
  premultipliedAlpha: bool,
  preserveDrawingBuffer: bool
};

type mainConfigData = {
  canvasId: option string,
  isTest: bool,
  contextConfig: contextConfigData
  /* todo add more config */
  /* screenSize: any, */
  /* useDevicePixelRatio: bool, */
  /* workerConfig: WorkerConfigData, */
};