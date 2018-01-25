/* TODO remove */
/* open StateDataType;

open RenderJobConfigSystem;

let init = (state: StateDataType.state) =>
  Json.(
    Decode.(state |> JobSystem.execRenderInitJobs([@bs] DeviceManagerSystem.unsafeGetGl(state)))
  );

let render = (state: StateDataType.state) =>
  Json.(
    Decode.(state |> JobSystem.execRenderRenderJobs([@bs] DeviceManagerSystem.unsafeGetGl(state)))
  ); */