open StateData;

open MainData;

open Dom;

open Gl;

let getCanvas (state: state) => state.viewData.canvas;

let setCanvas (canvas: canvasElement) state::(state: state) => {
  ...state,
  viewData: {...state.viewData, canvas}
};

let getContextConfig (state: state) => state.viewData.contextConfig;

let setContextConfig contextConfig::(contextConfig: contextConfigData) (state: state) => {
  ...state,
  viewData: {...state.viewData, contextConfig}
};

/* todo support webgl2 */
let getContext (canvas: canvasElement) (options: contextConfigData) =>
  getWebgl1Context canvas (contextConfigDataToOptions options);