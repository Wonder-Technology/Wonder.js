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
      ~noWorkerJobConfig=NoWorkerJobConfigTool.buildNoWorkerJobConfig(),
      ~renderConfigData=RenderConfigDataTool.buildRenderConfigData(),
      ()
    ) =>
  SettingTool.createStateAndSetToStateData(~isDebug, ~canvasId, ~context, ~useHardwareInstance, ())
  |> NoWorkerJobConfigTool.create(noWorkerJobConfig)
  |> NoWorkerJobTool.init
  |> RenderConfigDataTool.create(renderConfigData);

let initWithJobConfig =
    (
      ~sandbox,
      ~isDebug="true",
      ~bufferConfig={"geometryPointDataBufferCount": Js.Nullable.return(5)},
      ~noWorkerJobConfig=NoWorkerJobConfigTool.buildNoWorkerJobConfig(),
      ~renderConfigData=RenderConfigDataTool.buildRenderConfigData(),
      ()
    ) => {
  SettingTool.buildFakeDomForNotPassCanvasId(sandbox) |> ignore;
  initWithJobConfigWithoutBuildFakeDom(~sandbox, ~isDebug, ~bufferConfig, ~noWorkerJobConfig, ())
};

let openContractCheck = () => InitConfigMainService.setIsDebug(true, MainStateData.stateData) |> ignore;

let closeContractCheck = () => InitConfigMainService.setIsDebug(false, MainStateData.stateData) |> ignore;