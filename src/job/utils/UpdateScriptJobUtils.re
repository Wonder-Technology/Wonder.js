let exec = state =>
  OperateScriptEventFunctionDataMainService.execAllEventFunction(
    OperateScriptEventFunctionDataMainService.getAllUpdateEventFunctionData(
      state,
    ),
    state,
  );