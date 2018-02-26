let initWithoutBuildFakeDom =
    (
      ~sandbox,
      /* ~isDebug=Js.Nullable.return(Js.true_), */
      ~isDebug=Js.true_,
      ~bufferConfig={"geometryPointDataBufferCount": Js.Nullable.return(300)},
      ()
    ) => {
  Random.init(1);
  /* SettingParseSystem.convertToRecord(SettingTool.buildSetting(isDebug) |> Js.Json.parseExn)
     |> ConfigDataLoaderSystem._setSetting(StateTool.getStateData(), StateSystem.getState(stateData))
     |> StateTool.setState */
  /* TODO set bufferConfig */
  SettingTool.createState(~isDebug, ())
  /* Main.setMainConfig(MainTool.buildMainConfig(~isDebug, ~bufferConfig, ()))
     |> (
       (state) => {
         StateData.stateData.state = Some(state);
         state
       }
     ) */
};

let init =
    (
      ~sandbox,
      ~isDebug=Js.true_,
      ~bufferConfig={"geometryPointDataBufferCount": Js.Nullable.return(300)},
      ()
    ) => {
  MainTool.buildFakeDomForNotPassCanvasId(sandbox) |> ignore;
  initWithoutBuildFakeDom(~sandbox, ~isDebug, ~bufferConfig, ())
};

let initWithJobConfigWithoutBuildFakeDom =
    (
      ~sandbox,
      ~isDebug=Js.true_,
      ~bufferConfig={"geometryPointDataBufferCount": Js.Nullable.return(5)},
      ~noWorkerJobConfig=NoWorkerJobConfigTool.buildNoWorkerJobConfig(),
      ()
    ) =>
  SettingTool.createState(~isDebug, ());

let initWithJobConfig =
    (
      ~sandbox,
      ~isDebug=Js.true_,
      ~bufferConfig={"geometryPointDataBufferCount": Js.Nullable.return(5)},
      ~noWorkerJobConfig=NoWorkerJobConfigTool.buildNoWorkerJobConfig(),
      ()
    ) => {
  MainTool.buildFakeDomForNotPassCanvasId(sandbox) |> ignore;
  initWithJobConfigWithoutBuildFakeDom(~sandbox, ~isDebug, ~bufferConfig, ~noWorkerJobConfig, ())
};

let openContractCheck = () => InitConfigSystem.setIsDebug(true, StateData.stateData) |> ignore;

let closeContractCheck = () => InitConfigSystem.setIsDebug(false, StateData.stateData) |> ignore;