type configStateJsObj =
  Js.t {
    .
    canvasId : Js.nullable string,
    isTest : Js.nullable bool,
    contextConfig :
      Js.nullable (
        Js.t {
          .
          alpha : Js.nullable bool,
          antialias : Js.nullable bool,
          depth : Js.nullable bool,
          premultipliedAlpha : Js.nullable bool,
          preserveDrawingBuffer : Js.nullable bool,
          stencil : Js.nullable bool
        }
      )
  };

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