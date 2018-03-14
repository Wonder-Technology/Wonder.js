let initWithoutBuildFakeDom =
    (
      ~sandbox,
      ~isDebug="true",
      ~bufferConfig={"geometryPointDataBufferCount": Js.Nullable.return(300)},
      ()
    ) => {
  Random.init(1);
  SettingTool.createStateAndSetToStateData(~isDebug, ())
};

let init =
    (
      ~sandbox,
      ~isDebug="true",
      ~bufferConfig={"geometryPointDataBufferCount": Js.Nullable.return(300)},
      ()
    ) => {
  SettingTool.buildFakeDomForNotPassCanvasId(sandbox) |> ignore;
  initWithoutBuildFakeDom(~sandbox, ~isDebug, ~bufferConfig, ())
};

let initWithJobConfigWithoutBuildFakeDom =
    (
      ~sandbox,
      ~isDebug="true",
      ~canvasId=None,
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
      ~useHardwareInstance="true",
      ~bufferConfig={"geometryPointDataBufferCount": Js.Nullable.return(5)},
      ~noWorkerJobRecord=NoWorkerJobConfigTool.buildNoWorkerJobConfig(),
      ~renderConfigRecord=RenderConfigTool.buildRenderConfig(),
      ()
    ) =>
  SettingTool.createStateAndSetToStateData(~isDebug, ~canvasId, ~context, ~useHardwareInstance, ())
  |> NoWorkerJobConfigTool.create(noWorkerJobRecord)
  |> NoWorkerJobTool.init
  |> RenderConfigTool.create(renderConfigRecord);

let initWithJobConfig =
    (
      ~sandbox,
      ~isDebug="true",
      ~bufferConfig={"geometryPointDataBufferCount": Js.Nullable.return(5)},
      ~noWorkerJobRecord=NoWorkerJobConfigTool.buildNoWorkerJobConfig(),
      ~renderConfigRecord=RenderConfigTool.buildRenderConfig(),
      ()
    ) => {
  SettingTool.buildFakeDomForNotPassCanvasId(sandbox) |> ignore;
  initWithJobConfigWithoutBuildFakeDom(~sandbox, ~isDebug, ~bufferConfig, ~noWorkerJobRecord, ())
};

let openContractCheck = () =>
  IsDebugMainService.setIsDebug(MainStateData.stateData, true) |> ignore;

let closeContractCheck = () =>
  IsDebugMainService.setIsDebug(MainStateData.stateData, false) |> ignore;