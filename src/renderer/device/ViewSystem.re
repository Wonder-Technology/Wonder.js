open StateSystem;

open StateDataType;

open Dom;

open Gl;

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

let setContextConfig contextConfig::(contextConfig: contextConfigData) (state: state) => {
  ...state,
  viewData: {...state.viewData, contextConfig: Some contextConfig}
};

/* todo support webgl2 */
let getContext (canvas: htmlElement) options::(options: contextConfigData) =>
  getWebgl1Context canvas (contextConfigDataToOptions options);