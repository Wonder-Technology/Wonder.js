open StateDataType;

external mainConfigTypeBufferConfigDataToStateDataTypeBufferConfigData :
  MainConfigType.gpuConfig => StateDataType.gpuConfig =
  "%identity";

let setConfig = (gpuConfig: MainConfigType.gpuConfig, state: state) => {
  ...state,
  gpuConfig: Some(mainConfigTypeBufferConfigDataToStateDataTypeBufferConfigData(gpuConfig))
};

let getConfig = (state: StateDataType.state) => Js.Option.getExn(state.gpuConfig);