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
      ~logicJobConfig=LogicJobConfigTool.buildLogicJobConfig(),
      ~renderJobConfig=RenderJobConfigTool.buildRenderJobConfig(),
      ()
    ) =>
  Main.setMainConfig(MainTool.buildMainConfig(~isDebug, ~bufferConfig, ()))
  |> (
    (state) =>
      state
      |> LogicJobConfigTool.initData(logicJobConfig)
      |> RenderJobConfigTool.initData(renderJobConfig)
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
      ~logicJobConfig=LogicJobConfigTool.buildLogicJobConfig(),
      ~renderJobConfig=RenderJobConfigTool.buildRenderJobConfig(),
      ()
    ) => {
  MainTool.buildFakeDomForNotPassCanvasId(sandbox) |> ignore;
  initWithJobConfigWithoutBuildFakeDom(
    ~sandbox,
    ~isDebug,
    ~bufferConfig,
    ~logicJobConfig,
    ~renderJobConfig,
    ()
  )
};

let openContractCheck = () =>
  InitConfigSystem.setIsDebug(~isDebug=true, StateData.stateData) |> ignore;

let closeContractCheck = () =>
  InitConfigSystem.setIsDebug(~isDebug=false, StateData.stateData) |> ignore;