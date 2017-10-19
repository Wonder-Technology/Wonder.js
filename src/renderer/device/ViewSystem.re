open StateSystem;

open StateDataType;

open Dom;

open Gl;

external mainConfigTypeContextConfigDataToStateDataTypeContextConfigData :
  MainConfigType.contextConfigData => StateDataType.contextConfigData =
  "%identity";

/*
 let _getViewDataFromState (state: state) :viewData =>
   switch state.viewData {
   | None => handleStateValueNotExist "viewData"
   | Some data => data
   }; */
/* let getOptionValueFromState (data:option 'a):'a =>
   /* Js.Option.getExn data; */
     switch data {
     | None => Js_exn.raiseError "Bs_option.getExn"

     | Some d => d
     }; */
/* let getCanvas (state: state) => (_getViewDataFromState state).canvas; */
let getCanvas (state: state) => state.viewData.canvas |> getOptionValueFromState;

let setCanvas canvas::(canvas: htmlElement) (state: state) => {
  ...state,
  viewData: {...state.viewData, canvas: Some canvas}
};

let getContextConfig (state: state) => getOptionValueFromState state.viewData.contextConfig;

let setContextConfig
    contextConfig::(contextConfig: MainConfigType.contextConfigData)
    (state: state) => {
  ...state,
  viewData: {
    ...state.viewData,
    contextConfig:
      Some (mainConfigTypeContextConfigDataToStateDataTypeContextConfigData contextConfig)
  }
};

let _convertContextConfigDataToJsObj
    (
      {alpha, depth, stencil, antialias, premultipliedAlpha, preserveDrawingBuffer}: MainConfigType.contextConfigData
    ) => {
  "alpha": Js.Boolean.to_js_boolean alpha,
  "depth": Js.Boolean.to_js_boolean depth,
  "stencil": Js.Boolean.to_js_boolean stencil,
  "antialias": Js.Boolean.to_js_boolean antialias,
  "premultipliedAlpha": Js.Boolean.to_js_boolean premultipliedAlpha,
  "preserveDrawingBuffer": Js.Boolean.to_js_boolean preserveDrawingBuffer
};

/* todo support webgl2 */
let getContext (canvas: htmlElement) (options: MainConfigType.contextConfigData) =>
  getWebgl1Context canvas (_convertContextConfigDataToJsObj options);