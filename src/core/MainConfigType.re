type configStateJsObj = {
  .
  "canvasId": Js.nullable(string),
  "isTest": Js.nullable(bool),
  "contextConfig":
    Js.nullable(
      {
        .
        "alpha": Js.nullable(bool),
        "antialias": Js.nullable(bool),
        "depth": Js.nullable(bool),
        "premultipliedAlpha": Js.nullable(bool),
        "preserveDrawingBuffer": Js.nullable(bool),
        "stencil": Js.nullable(bool)
      }
    ),
  "bufferConfig":
    Js.nullable(
      {
        .
        "transformDataBufferCount": Js.nullable(int),
        "basicMaterialDataBufferCount": Js.nullable(int)
      }
    )
};

type contextConfig = {
  alpha: bool,
  depth: bool,
  stencil: bool,
  antialias: bool,
  premultipliedAlpha: bool,
  preserveDrawingBuffer: bool
};

type bufferConfig = {
  transformDataBufferCount: int,
  basicMaterialDataBufferCount: int
};

type mainConfigData = {
  canvasId: option(string),
  isTest: bool,
  contextConfig,
  bufferConfig
  /* todo add more config */
  /* screenSize: any, */
  /* useDevicePixelRatio: bool, */
  /* workerConfig: WorkerConfigData, */
};