/* [@bs.deriving jsConverter] */
type contextConfig = {
  alpha: bool,
  depth: bool,
  stencil: bool,
  antialias: bool,
  premultipliedAlpha: bool,
  preserveDrawingBuffer: bool
};

type contextConfigJsObj = {
  .
  "alpha": Js.boolean,
  "depth": Js.boolean,
  "stencil": Js.boolean,
  "antialias": Js.boolean,
  "premultipliedAlpha": Js.boolean,
  "preserveDrawingBuffer": Js.boolean
};
/* [@bs.deriving jsConverter]
type contextConfig = {
  .
  "alpha": Js.boolean,
  "depth": Js.boolean,
  "stencil": Js.boolean,
  "antialias": Js.boolean,
  "premultipliedAlpha": Js.boolean,
  "preserveDrawingBuffer": Js.boolean
};
 */
/* type messageInitGLData = {
       "operateType": RenderWorkerType.renderWorkerOperation,
       "canvas": 'canvas,
       "contextConfig": contextConfig,
       "viewportData": array(float)
   }; */