let init =
    (
      ~isTest=Js.Nullable.return(true),
      ~bufferConfig=Js.Nullable.return({
                      "transformDataBufferCount": Js.Nullable.return(5),
                      "geometryPointDataBufferCount": Js.Nullable.return(5),
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