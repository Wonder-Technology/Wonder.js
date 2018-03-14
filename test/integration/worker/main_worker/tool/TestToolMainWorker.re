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
      ~workerJobRecord=WorkerJobConfigToolWorker.buildWorkerJobConfig(),
      ~renderConfigRecord=RenderConfigDataTool.buildRenderConfigData(),
      ()
    ) => {
  SettingTool.createStateAndSetToStateData(~isDebug, ~canvasId, ~context, ~useHardwareInstance, ())
  |> WorkerJobConfigToolWorker.create(workerJobRecord)
  |> RenderConfigDataTool.create(renderConfigRecord)
  |> StateTool.setState
  |> ignore;
};