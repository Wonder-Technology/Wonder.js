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

  /* todo add more config */
  /* screenSize: any, */
  /* useDevicePixelRatio: bool, */
  contextConfig: contextConfigData
  /* workerConfig: WorkerConfigData, */
};

type state = {mainConfigData: mainConfigData};

type stateData = {mutable state: option state};

let stateData:stateData = {state: None};