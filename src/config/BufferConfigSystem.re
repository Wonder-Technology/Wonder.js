open MainStateDataType;

external mainConfigTypeBufferConfigDataToStateDataTypeBufferConfigData :
  MainConfigType.bufferConfig => MainStateDataType.bufferConfig =
  "%identity";

let setConfig = (~bufferConfig: MainConfigType.bufferConfig, state: state) => {
  ...state,
  bufferConfig: Some(mainConfigTypeBufferConfigDataToStateDataTypeBufferConfigData(bufferConfig))
};

let getConfig = (state: MainStateDataType.state) => Js.Option.getExn(state.bufferConfig);
