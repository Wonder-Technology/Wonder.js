let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let data = MessageService.getRecord(e);
      IsDebugMainService.setIsDebug(StateDataMain.stateData, data##isDebug) |> ignore;
      e
    }
  );