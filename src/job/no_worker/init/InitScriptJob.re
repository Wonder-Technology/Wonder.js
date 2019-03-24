open StateDataMainType;

let execJob = (flags, state) =>
  OperateScriptEventFunctionDataMainService.execAllEventFunction(
    OperateScriptEventFunctionDataMainService.getAllInitEventFunctionData(
      state,
    ),
    state,
  );