let init
    ::isTest=(Js.Nullable.return true)
    ::bufferConfig=(Js.Nullable.return {"transformDataBufferCount": Js.Nullable.return 5})
    () =>
  Main.setMainConfig (MainTool.buildMainConfig ::isTest ::bufferConfig ())
  |> (
    fun state => {
      StateData.stateData.state = Some state;
      state
    }
  );