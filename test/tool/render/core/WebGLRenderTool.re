let init = (state) =>
  state |> RenderJobSystem.execRenderInitJobs([@bs] DeviceManagerSystem.unsafeGetGl(state));

let render = (state) =>
  state |> RenderJobSystem.execRenderRenderJobs([@bs] DeviceManagerSystem.unsafeGetGl(state));