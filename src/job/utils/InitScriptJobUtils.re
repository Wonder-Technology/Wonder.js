let exec = state =>
  OperateScriptEventFunctionDataMainService.execAllEventFunction(
    OperateScriptEventFunctionDataMainService.getAllInitEventFunctionData(
      state,
    ),
    state,
  );