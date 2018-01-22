open StateDataType;

open DomType;

open Gl;

let _getOptionValueFromState = (value) => Js.Option.getExn(value);

let getCanvas = (state: state) => state.viewData.canvas |> _getOptionValueFromState;

let setCanvas = (canvas: htmlElement, state: state) => {
  ...state,
  viewData: {...state.viewData, canvas: Some(canvas)}
};

let getFullScreenData = ViewShare.getFullScreenData;

let setToFullScreen = ViewShare.setToFullScreen;

let getContextConfig = (state: state) => _getOptionValueFromState(state.viewData.contextConfig);

let setContextConfig = (contextConfig: MainConfigType.contextConfig, state: state) => {
  ...state,
  viewData: {
    ...state.viewData,
    contextConfig:
      Some(
        ViewShare.mainConfigTypeContextConfigDataToStateDataTypeContextConfigData(contextConfig)
      )
  }
};