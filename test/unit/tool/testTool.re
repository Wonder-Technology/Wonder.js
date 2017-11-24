let init =
    (
      ~isTest=Js.Nullable.return(Js.true_),
      ~bufferConfig=Js.Nullable.return({
                      "transformDataBufferCount": Js.Nullable.return(5),
                      "geometryPointDataBufferCount": Js.Nullable.return(300),
                      "basicMaterialDataBufferCount": Js.Nullable.return(5)
                    }),
      ()
    ) =>
  Main.setMainConfig(MainTool.buildMainConfig(~isTest, ~bufferConfig, ()))
  |> (
    (state) => {
      StateData.stateData.state = Some(state);
      state
    }
  );

let initWithRenderConfig =
    /* ~renderConfig=(
         Render_setting.render_setting,
         Init_pipelines.init_pipelines,
         Render_pipelines.render_pipelines,
         Init_jobs.init_jobs,
         Render_jobs.render_jobs,
         Shaders.shaders,
         Shader_libs.shader_libs
       ), */
    (
      ~isTest=Js.Nullable.return(Js.true_),
      ~bufferConfig=Js.Nullable.return({
                      "transformDataBufferCount": Js.Nullable.return(5),
                      "geometryPointDataBufferCount": Js.Nullable.return(5),
                      "basicMaterialDataBufferCount": Js.Nullable.return(5)
                    }),
      ~renderConfig,
      ()
    ) =>
  StateSystem.createState(~renderConfig, ())
  |> MainSystem.setConfig(MainTool.buildMainConfig(~isTest, ~bufferConfig, ()))
  |> MainSystem.init
  |> (
    (state) => {
      StateData.stateData.state = Some(state);
      state
    }
  );

let openContractCheck = () =>
  InitConfigSystem.setIsTest(~isTest=true, StateData.stateData) |> ignore;

let closeContractCheck = () =>
  InitConfigSystem.setIsTest(~isTest=false, StateData.stateData) |> ignore;