open StateDataType;

external settingTypeBufferConfigDataToStateDataTypeBufferConfigData :
  SettingType.gpu => StateDataType.gpuConfig =
  "%identity";

let setConfig = (gpuConfig: SettingType.gpu, state: state) => {
  ...state,
  gpuConfig: Some(settingTypeBufferConfigDataToStateDataTypeBufferConfigData(gpuConfig))
};

let getConfig = (state: StateDataType.state) => Js.Option.getExn(state.gpuConfig);