open StateDataRenderWorkerType;

let getRecord = (state) => state.geometryRecord |> OptionService.unsafeGet;