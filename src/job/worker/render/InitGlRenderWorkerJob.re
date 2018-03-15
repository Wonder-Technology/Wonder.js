let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      StateRenderService.getState(stateData)
      |> InitGlService.initGl(MessageUtils.getData(e))
      |> StateRenderService.setState(stateData)
      |> ignore;
      e
    }
  );