open StateDataRenderWorkerType;

let getRecord = (state) => state.renderConfigRecord |> OptionService.unsafeGet;