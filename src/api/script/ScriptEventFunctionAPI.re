open StateDataMainType;

let _createScriptEventFunction = funcInJsObj =>
  Js.Nullable.toOption(funcInJsObj);

let createScriptEventFunctionData =
    (jsObj: eventFunctionDataJsObj): eventFunctionData => {
  init: _createScriptEventFunction(jsObj##init),
  update: _createScriptEventFunction(jsObj##update),
  dispose: _createScriptEventFunction(jsObj##dispose),
};

let enableScriptEventFunction = state =>
  OperateScriptEventFunctionDataMainService.enableScriptEventFunction(state);

let disableScriptEventFunction = state =>
  OperateScriptEventFunctionDataMainService.disableScriptEventFunction(state);

let isScriptEventFunctionEnable = state =>
  OperateScriptEventFunctionDataMainService.isScriptEventFunctionEnable(
    state,
  );