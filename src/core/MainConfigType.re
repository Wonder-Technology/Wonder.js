type configJsObj = {
  .
  "canvasId": Js.nullable(string),
  "isTest": Js.nullable(Js.boolean),
  "contextConfig":
    Js.nullable(
      {
        .
        "alpha": Js.nullable(Js.boolean),
        "antialias": Js.nullable(Js.boolean),
        "depth": Js.nullable(Js.boolean),
        "premultipliedAlpha": Js.nullable(Js.boolean),
        "preserveDrawingBuffer": Js.nullable(Js.boolean),
        "stencil": Js.nullable(Js.boolean)
      }
    ),
  "bufferConfig": Js.nullable({. "geometryPointDataBufferCount": Js.nullable(int)}),
  "gpuConfig": Js.nullable({. "useHardwareInstance": Js.nullable(Js.boolean)})
};

type contextConfig = {
  alpha: bool,
  depth: bool,
  stencil: bool,
  antialias: bool,
  premultipliedAlpha: bool,
  preserveDrawingBuffer: bool
};

type bufferConfig = {geometryPointDataBufferCount: int};

type gpuConfig = {useHardwareInstance: bool};

type mainConfigData = {
  canvasId: option(string),
  isTest: bool,
  contextConfig,
  bufferConfig,
  gpuConfig
  /* todo add more config */
  /* screenSize: any, */
  /* useDevicePixelRatio: bool, */
  /* workerConfig: WorkerConfigData, */
};