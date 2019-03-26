open StateDataMainType;

let execJob = (flags, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateDataMainService.unsafeGetState(stateData);

    OperateScriptEventFunctionDataMainService.execAllEventFunction(
      OperateScriptEventFunctionDataMainService.getAllUpdateEventFunctionData(
        state,
      ),
      state,
    )
    |> StateDataMainService.setState(stateData);

    None;
  });