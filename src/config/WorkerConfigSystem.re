open WorkerConfigType;

open SettingType;

external settingTypeWorkerDataToWorkerConfigType :
  SettingType.worker => WorkerConfigType.workerConfig =
  "%identity";

let setConfig = (worker, state:StateDataType.state) => {
  ...state,
  workerConfig: Some(worker |> settingTypeWorkerDataToWorkerConfigType)
};

let getConfig = (state: StateDataType.state) => Js.Option.getExn(state.workerConfig);