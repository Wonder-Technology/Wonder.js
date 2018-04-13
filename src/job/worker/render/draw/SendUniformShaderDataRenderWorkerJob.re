open StateRenderType;

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      SendUniformShaderDataJobUtils.execJob(
        CreateRenderStateRenderWorkerService.createRenderState(state)
      )
      |> ignore;
      e
    }
  );