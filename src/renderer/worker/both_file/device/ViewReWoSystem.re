open DomType;

let setContextConfig = (contextConfig: MainConfigType.contextConfig, state: StateDataType.state) => {
  ...state,
  viewData: {
    ...state.viewData,
    contextConfig:
      Some(
        ViewShare.mainConfigTypeContextConfigDataToStateDataTypeContextConfigData(contextConfig)
      )
  }
};

let setCanvas = (canvas: htmlElement, state: StateDataType.state) => {
  ...state,
  viewData: {...state.viewData, canvas: Some(canvas)}
};

let getFullScreenData = ViewShare.getFullScreenData;

let setToFullScreen = ViewShare.setToFullScreen;