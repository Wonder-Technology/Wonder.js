open StateDataMainType;

let execJob = (flags, state) =>
  OperateScriptEventFunctionDataMainService.execAllEventFunction(
    OperateScriptEventFunctionDataMainService.getAllUpdateEventFunctionData(
      state,
    ),
    state,
  );