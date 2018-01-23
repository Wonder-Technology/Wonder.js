open StateDataType;

open RenderConfigSystem;

let init = (state: StateDataType.state) =>
  Render_setting.(
    Json.(
      Decode.(state |> JobSystem.execRenderInitJobs([@bs] DeviceManagerSystem.unsafeGetGl(state)))
    )
  );

let render = (state: StateDataType.state) =>
  Render_setting.(
    Json.(
      Decode.(
        state |> JobSystem.execRenderRenderJobs([@bs] DeviceManagerSystem.unsafeGetGl(state))
      )
    )
  );