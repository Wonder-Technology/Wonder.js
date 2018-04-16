let buildBufferJsObj =
    (
      ~customGeometryPointDataBufferCount=300,
      ~transformDataBufferCount=50,
      ~basicMaterialDataBufferCount=50,
      ~lightMaterialDataBufferCount=50,
      ()
    ) => {
  "customGeometryPointDataBufferCount": customGeometryPointDataBufferCount,
  "transformDataBufferCount": transformDataBufferCount,
  "basicMaterialDataBufferCount": basicMaterialDataBufferCount,
  "lightMaterialDataBufferCount": lightMaterialDataBufferCount
};

let _buildBufferConfigStr = (buffer) =>
  SettingTool.buildBufferConfigStr(
    ~customGeometryPointDataBufferCount=buffer##customGeometryPointDataBufferCount,
    ~transformDataBufferCount=buffer##transformDataBufferCount,
    ~basicMaterialDataBufferCount=buffer##basicMaterialDataBufferCount,
    ~lightMaterialDataBufferCount=buffer##lightMaterialDataBufferCount,
    ()
  );

let initWithoutBuildFakeDom = (~sandbox, ~isDebug="true", ~buffer=buildBufferJsObj(), ()) => {
  Random.init(1);
  SettingTool.createStateAndSetToStateData(~isDebug, ~buffer=_buildBufferConfigStr(buffer), ())
};

let init = (~sandbox, ~isDebug="true", ~buffer=buildBufferJsObj(), ()) => {
  SettingTool.buildFakeDomForNotPassCanvasId(sandbox) |> ignore;
  initWithoutBuildFakeDom(~sandbox, ~isDebug, ~buffer, ())
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
      ~buffer=buildBufferJsObj(),
      ~noWorkerJobRecord=NoWorkerJobConfigTool.buildNoWorkerJobConfig(),
      ~renderConfigRecord=RenderConfigTool.buildRenderConfig(),
      ()
    ) =>
  SettingTool.createStateAndSetToStateData(
    ~isDebug,
    ~canvasId,
    ~buffer=_buildBufferConfigStr(buffer),
    ~context,
    ~useHardwareInstance,
    ()
  )
  |> NoWorkerJobConfigTool.create(noWorkerJobRecord)
  |> NoWorkerJobTool.init((
       NoWorkerJobHandleSystem.createInitJobHandleMap,
       NoWorkerJobHandleSystem.createLoopJobHandleMap
     ))
  |> RenderConfigTool.create(renderConfigRecord);

let initWithJobConfig =
    (
      ~sandbox,
      ~isDebug="true",
      ~buffer=buildBufferJsObj(),
      ~noWorkerJobRecord=NoWorkerJobConfigTool.buildNoWorkerJobConfig(),
      ~renderConfigRecord=RenderConfigTool.buildRenderConfig(),
      ()
    ) => {
  SettingTool.buildFakeDomForNotPassCanvasId(sandbox) |> ignore;
  initWithJobConfigWithoutBuildFakeDom(~sandbox, ~isDebug, ~buffer, ~noWorkerJobRecord, ())
};

let openContractCheck = () =>
  IsDebugMainService.setIsDebug(StateDataMain.stateData, true) |> ignore;

let closeContractCheck = () =>
  IsDebugMainService.setIsDebug(StateDataMain.stateData, false) |> ignore;