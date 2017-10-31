open StateDataType;

external mainConfigTypeBufferConfigDataToStateDataTypeBufferConfigData :
  MainConfigType.bufferConfig => StateDataType.bufferConfig =
  "%identity";

let setBufferConfig = (~bufferConfig: MainConfigType.bufferConfig, state: state) => {
  ...state,
  bufferConfig: Some(mainConfigTypeBufferConfigDataToStateDataTypeBufferConfigData(bufferConfig))
};

let getBufferConfig = (state: StateDataType.state) => Js.Option.getExn(state.bufferConfig);
