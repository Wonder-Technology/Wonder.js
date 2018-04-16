open StateRenderType;

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      switch (IsRenderUtils.isRender(MessageService.getRecord(e))) {
      | false => e
      | true =>
        SendUniformShaderDataJobUtils.execJob(
          CreateRenderStateRenderWorkerService.createRenderState(state)
        )
        |> ignore;
        e
      }
    }
  );