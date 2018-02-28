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
      ~workerJobConfig=WorkerJobConfigToolWorker.buildWorkerJobConfig(),
      ~renderConfigData=RenderConfigDataTool.buildRenderConfigData(),
      ()
    ) => {
  SettingTool.createStateAndSetToStateData(~isDebug, ~canvasId, ~context, ~useHardwareInstance, ())
  |> WorkerJobConfigToolWorker.initData(workerJobConfig)
  |> RenderConfigDataTool.initData(renderConfigData)
  |> StateTool.setState
  |> ignore;
};