let initWithoutBuildFakeDom =
    (
      ~sandbox,
      ~isDebug=Js.Nullable.return(Js.true_),
      ~bufferConfig=Js.Nullable.return({"geometryPointDataBufferCount": Js.Nullable.return(300)}),
      ()
    ) => {
  Random.init(1);
  Main.setMainConfig(MainTool.buildMainConfig(~isDebug, ~bufferConfig, ()))
  |> (
    (state) => {
      StateData.stateData.state = Some(state);
      state
    }
  )
};

let init =
    (
      ~sandbox,
      ~isDebug=Js.Nullable.return(Js.true_),
      ~bufferConfig=Js.Nullable.return({"geometryPointDataBufferCount": Js.Nullable.return(300)}),
      ()
    ) => {
  MainTool.buildFakeDomForNotPassCanvasId(sandbox) |> ignore;
  initWithoutBuildFakeDom(~sandbox, ~isDebug, ~bufferConfig, ())
};

let initWithJobConfigWithoutBuildFakeDom =
    (
      ~sandbox,
      ~isDebug=Js.Nullable.return(Js.true_),
      ~bufferConfig=Js.Nullable.return({"geometryPointDataBufferCount": Js.Nullable.return(5)}),
      ~logicConfig=LogicConfigTool.buildLogicConfig(),
      ~renderConfig=RenderConfigTool.buildRenderConfig(),
      ()
    ) =>
  Main.setMainConfig(MainTool.buildMainConfig(~isDebug, ~bufferConfig, ()))
  |> (
    (state) =>
      state |> LogicConfigTool.initData(logicConfig) |> RenderConfigTool.initData(renderConfig)
  )
  |> (
    (state) => {
      StateData.stateData.state = Some(state);
      state
    }
  );

let initWithJobConfig =
    (
      ~sandbox,
      ~isDebug=Js.Nullable.return(Js.true_),
      ~bufferConfig=Js.Nullable.return({"geometryPointDataBufferCount": Js.Nullable.return(5)}),
      ~logicConfig=LogicConfigTool.buildLogicConfig(),
      ~renderConfig=RenderConfigTool.buildRenderConfig(),
      ()
    ) => {
  MainTool.buildFakeDomForNotPassCanvasId(sandbox) |> ignore;
  initWithJobConfigWithoutBuildFakeDom(~sandbox, ~isDebug, ~bufferConfig, ~renderConfig, ())
};

let openContractCheck = () =>
  InitConfigSystem.setIsDebug(~isDebug=true, StateData.stateData) |> ignore;

let closeContractCheck = () =>
  InitConfigSystem.setIsDebug(~isDebug=false, StateData.stateData) |> ignore;