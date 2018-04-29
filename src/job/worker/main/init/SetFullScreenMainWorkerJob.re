open StateDataMainType;

let execJob = (_, stateData) =>
  MostUtils.callFunc(
    () => {
      let {viewRecord} as state = StateDataMainService.unsafeGetState(stateData);
      state.viewRecord =
        state.viewRecord
        |> ViewService.setCanvas(
             ScreenService.setToFullScreen(
               ScreenService.queryFullScreenData(),
               ViewService.getCanvas(viewRecord) |> Obj.magic
             )
           );
      StateDataMainService.setState(stateData, state);
      None
    }
  );