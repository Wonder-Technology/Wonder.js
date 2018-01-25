let init = (state) =>
  state |> JobSystem.execRenderInitJobs([@bs] DeviceManagerSystem.unsafeGetGl(state));

let render = (state) =>
  state |> JobSystem.execRenderRenderJobs([@bs] DeviceManagerSystem.unsafeGetGl(state));