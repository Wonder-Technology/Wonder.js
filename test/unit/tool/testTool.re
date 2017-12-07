let initWithoutBuildFakeDom =
    (
      ~sandbox,
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

let init =
    (
      ~sandbox,
      ~isTest=Js.Nullable.return(Js.true_),
      ~bufferConfig=Js.Nullable.return({
                      "transformDataBufferCount": Js.Nullable.return(5),
                      "geometryPointDataBufferCount": Js.Nullable.return(300),
                      "basicMaterialDataBufferCount": Js.Nullable.return(5)
                    }),
      ()
    ) => {
  MainTool.buildFakeDomForNotPassCanvasId(sandbox) |> ignore;
  initWithoutBuildFakeDom(~sandbox, ~isTest, ~bufferConfig, ())
};

let initWithRenderConfigWithoutBuildFakeDom =
    (
      ~sandbox,
      ~isTest=Js.Nullable.return(Js.true_),
      ~bufferConfig=Js.Nullable.return({
                      "transformDataBufferCount": Js.Nullable.return(5),
                      "geometryPointDataBufferCount": Js.Nullable.return(5),
                      "basicMaterialDataBufferCount": Js.Nullable.return(5)
                    }),
      ~renderConfig,
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
      ~sandbox,
      ~isTest=Js.Nullable.return(Js.true_),
      ~bufferConfig=Js.Nullable.return({
                      "transformDataBufferCount": Js.Nullable.return(5),
                      "geometryPointDataBufferCount": Js.Nullable.return(5),
                      "basicMaterialDataBufferCount": Js.Nullable.return(5)
                    }),
      ~renderConfig,
      ()
    ) => {
  MainTool.buildFakeDomForNotPassCanvasId(sandbox) |> ignore;
  initWithRenderConfigWithoutBuildFakeDom(~sandbox, ~isTest, ~bufferConfig, ~renderConfig, ())
};

let openContractCheck = () =>
  InitConfigSystem.setIsTest(~isTest=true, StateData.stateData) |> ignore;

let closeContractCheck = () =>
  InitConfigSystem.setIsTest(~isTest=false, StateData.stateData) |> ignore;