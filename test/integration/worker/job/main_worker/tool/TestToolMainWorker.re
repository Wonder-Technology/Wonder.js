let initWithJobConfig =
    (
      ~sandbox,
      ~isDebug="true",
      ~canvasId=None,
      ~useHardwareInstance="true",
      ~context={|
        {
        "alpha": true,
        "depth": true,
        "stencil": false,
        "antialias": true,
        "premultiplied_alpha": true,
        "preserve_drawing_buffer": false
        }
               |},
      ~workerJobRecord=WorkerJobTool.buildWorkerJobConfig(),
      ~renderConfigRecord=RenderConfigTool.buildRenderConfig(),
      ()
    ) => {
  SettingTool.createStateAndSetToStateData(~isDebug, ~canvasId, ~context, ~useHardwareInstance, ())
  |> WorkerJobTool.create(workerJobRecord)
  |> RenderConfigTool.create(renderConfigRecord)
  |> MainStateTool.setState
  |> ignore;
};