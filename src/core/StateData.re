open StateDataType;

type state = {
  viewData,
  initConfigData,
  deviceManagerData
};

type stateData = {mutable state: option state};

let stateData: stateData = {state: None};