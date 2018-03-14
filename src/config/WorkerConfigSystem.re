open WorkerConfigType;

open SettingType;

external settingTypeWorkerDataToWorkerConfigType :
  SettingType.worker => WorkerConfigType.workerConfig =
  "%identity";

let setConfig = (worker, state:MainStateDataType.state) => {
  ...state,
  workerConfig: Some(worker |> settingTypeWorkerDataToWorkerConfigType)
};

let getConfig = (state: MainStateDataType.state) => Js.Option.getExn(state.workerConfig);