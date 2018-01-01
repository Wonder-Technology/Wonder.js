open StateDataType;

open DomType;

open Gl;

external mainConfigTypeContextConfigDataToStateDataTypeContextConfigData :
  MainConfigType.contextConfig => StateDataType.contextConfig =
  "%identity";

let _getOptionValueFromState = (value) => Js.Option.getExn(value);

let getCanvas = (state: state) => state.viewData.canvas |> _getOptionValueFromState;

let setCanvas = (canvas: htmlElement, state: state) => {
  ...state,
  viewData: {...state.viewData, canvas: Some(canvas)}
};

let _setAbsolutePosition = (canvas) => {
  canvas##style##position#="absolute";
  canvas
};

let setX = (x, canvas) => {
  canvas##style##left#={j|$(x)px|j};
  canvas
};

let setY = (y, canvas) => {
  canvas##style##top#={j|$(y)px|j};
  canvas
};

let setWidth = (width, canvas) => {
  canvas##width#=width;
  canvas
};

let setHeight = (height, canvas) => {
  canvas##height#=height;
  canvas
};

let setStyleWidth = (width, canvas) => {
  canvas##style##width#=width;
  canvas
};

let setStyleHeight = (height, canvas) => {
  canvas##style##height#=height;
  canvas
};

let getFullScreenData = () => {
  let root = Root.root;
  (0., 0., root##innerWidth, root##innerHeight, "100%", "100%")
};

let _setBodyMargin = (document) =>
  switch (Dom.querySelectorAll(document, "body")) {
  | bodies when Js.Array.length(bodies) === 0 => ()
  | bodies =>
    Dom.setBatchStyle(bodies[0], "margin:0");
    ()
  };

let setToFullScreen = ((x, y, width, height, styleWidth, styleHeight), canvas) => {
  _setBodyMargin(Dom.document);
  canvas
  |> _setAbsolutePosition
  |> setX(x)
  |> setY(y)
  |> setWidth(width)
  |> setHeight(height)
  |> setStyleWidth(styleWidth)
  |> setStyleHeight(styleHeight)
  |> Obj.magic
};

let getContextConfig = (state: state) => _getOptionValueFromState(state.viewData.contextConfig);

let setContextConfig = (contextConfig: MainConfigType.contextConfig, state: state) => {
  ...state,
  viewData: {
    ...state.viewData,
    contextConfig:
      Some(mainConfigTypeContextConfigDataToStateDataTypeContextConfigData(contextConfig))
  }
};

let _convertContextConfigDataToJsObj =
    (
      {alpha, depth, stencil, antialias, premultipliedAlpha, preserveDrawingBuffer}: MainConfigType.contextConfig
    ) => {
  "alpha": Js.Boolean.to_js_boolean(alpha),
  "depth": Js.Boolean.to_js_boolean(depth),
  "stencil": Js.Boolean.to_js_boolean(stencil),
  "antialias": Js.Boolean.to_js_boolean(antialias),
  "premultipliedAlpha": Js.Boolean.to_js_boolean(premultipliedAlpha),
  "preserveDrawingBuffer": Js.Boolean.to_js_boolean(preserveDrawingBuffer)
};

/* todo support webgl2 */
let getContext = (canvas, options: MainConfigType.contextConfig) =>
  getWebgl1Context(canvas, _convertContextConfigDataToJsObj(options));