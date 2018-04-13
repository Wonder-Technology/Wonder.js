open StateRenderType;

let execJob = (_, state: StateDataMainType.state) => {
  SendUniformShaderDataJobUtils.execJob(CreateRenderStateMainService.createRenderState(state))
  |> ignore;
  state
};