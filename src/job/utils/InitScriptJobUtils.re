let exec = state =>
  OperateScriptEventFunctionDataMainService.execAllEventFunction(
    OperateScriptEventFunctionDataMainService.getAllActiveInitEventFunctionData(
      state,
    ),
    state,
  );