open StateDataType;

external mainConfigTypeBufferConfigDataToStateDataTypeBufferConfigData :
  MainConfigType.bufferConfig => StateDataType.bufferConfig =
  "%identity";

let setConfig = (~bufferConfig: MainConfigType.bufferConfig, state: state) => {
  ...state,
  bufferConfig: Some(mainConfigTypeBufferConfigDataToStateDataTypeBufferConfigData(bufferConfig))
};

let getConfig = (state: StateDataType.state) => Js.Option.getExn(state.bufferConfig);
