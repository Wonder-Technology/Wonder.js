open StateDataMainType;

let execJob = (_, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateDataMainService.unsafeGetState(stateData);

    IOIMGUIMainService.bindEvent(state)
    |> StateDataMainService.setState(stateData);

    None;
  });