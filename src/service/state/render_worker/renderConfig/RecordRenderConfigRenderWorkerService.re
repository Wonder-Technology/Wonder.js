open RenderWorkerStateDataType;

let getRecord = (state) => state.renderConfigRecord |> OptionService.unsafeGet;