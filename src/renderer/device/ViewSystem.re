open StateUtils;

open StateDataType;

open DomType;

open Gl;

external mainConfigTypeContextConfigDataToStateDataTypeContextConfigData :
  MainConfigType.contextConfig => StateDataType.contextConfig =
  "%identity";

let getCanvas = (state: state) => state.viewData.canvas |> getOptionValueFromState;

let setCanvas = (~canvas: htmlElement, state: state) => {
  ...state,
  viewData: {...state.viewData, canvas: Some(canvas)}
};

let getContextConfig = (state: state) => getOptionValueFromState(state.viewData.contextConfig);

let setContextConfig = (~contextConfig: MainConfigType.contextConfig, state: state) => {
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
let getContext = (canvas: htmlElement, options: MainConfigType.contextConfig) =>
  getWebgl1Context(canvas, _convertContextConfigDataToJsObj(options));