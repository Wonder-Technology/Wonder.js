let exec = state => {
  OperateLoadMainService.getCanExecScriptAllEventFunction(state) ?
    {
      OperateScriptEventFunctionDataMainService.execAllEventFunction(
        OperateScriptEventFunctionDataMainService.getAllActiveUpdateEventFunctionData(
          state,
        ),
        state,
      );
    } :
    state;
};
