open MainStateDataType;

external settingTypeBufferConfigDataToStateDataTypeBufferConfigData :
  SettingType.gpu => MainStateDataType.gpuConfig =
  "%identity";

let setConfig = (gpuConfig: SettingType.gpu, state: state) => {
  ...state,
  gpuConfig: Some(settingTypeBufferConfigDataToStateDataTypeBufferConfigData(gpuConfig))
};

let getConfig = (state: MainStateDataType.state) => Js.Option.getExn(state.gpuConfig);