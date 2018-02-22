let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      RenderWorkerStateSystem.getState(stateData)
      |> InitGlSystem.initGl(MessageUtils.getData(e))
      |> RenderWorkerStateSystem.setState(stateData)
      |> ignore;
      e
    }
  );