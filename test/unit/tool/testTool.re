let _initConfig isTest =>
  switch (Js.toOption isTest) {
  | Some true => CompileConfig.compileConfig.isCompileTest = true
  | _ => ()
  };

let init ::isTest=(Js.Nullable.return true) () => {
  _initConfig isTest |> ignore;
  BufferTool.minBufferSize () |> ignore;
  Main.setMainConfig {
    "canvasId": Js.Nullable.undefined,
    "isTest": isTest,
    "contextConfig": Js.Nullable.undefined
  }
  |> (
    fun state => {
      StateData.stateData.state = Some state;
      state
    }
  )
};