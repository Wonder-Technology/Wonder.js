open StateDataMainType;

let execJob = (_, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateDataMainService.unsafeGetState(stateData);

    OperateScriptEventFunctionDataMainService.execAllEventFunction(
      OperateScriptEventFunctionDataMainService.getAllInitEventFunctionData(
        state,
      ),
      state,
    )
    |> StateDataMainService.setState(stateData);

    None;
  });