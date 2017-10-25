let _initConfig isTest =>{};

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