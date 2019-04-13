let exec = state =>
  OperateScriptEventFunctionDataMainService.execAllEventFunction(
    OperateScriptEventFunctionDataMainService.getAllActiveUpdateEventFunctionData(
      state,
    ),
    state,
  );