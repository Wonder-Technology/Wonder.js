open MainData;

open ViewData;

open InitConfigData;

type state = {
  viewData,
  initConfigData
};

type stateData = {mutable state: option state};

let stateData: stateData = {state: None};