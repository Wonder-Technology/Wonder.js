open DomType;

let setContextConfig = (contextConfig: SettingType.context, state: StateDataType.state) => {
  ...state,
  viewData: {
    ...state.viewData,
    contextConfig:
      Some(
        ViewShare.settingTypeContextConfigDataToStateDataTypeContextConfigData(contextConfig)
      )
  }
};

let setCanvas = (canvas: htmlElement, state: StateDataType.state) => {
  ...state,
  viewData: {...state.viewData, canvas: Some(canvas)}
};

let getFullScreenData = ViewShare.getFullScreenData;

let setToFullScreen = ViewShare.setToFullScreen;