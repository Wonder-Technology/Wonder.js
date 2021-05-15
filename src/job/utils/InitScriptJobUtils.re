let exec = state =>
  OperateLoadMainService.getCanExecScriptAllEventFunction(state) ?
    {
      OperateScriptEventFunctionDataMainService.execAllEventFunction(
        OperateScriptEventFunctionDataMainService.getAllActiveInitEventFunctionData(
          state,
        ),
        state,
      );
    } :
    state;
