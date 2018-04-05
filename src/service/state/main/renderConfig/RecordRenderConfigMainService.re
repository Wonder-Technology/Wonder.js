open StateDataMainType;

let getRecord = (state) => state.renderConfigRecord |> OptionService.unsafeGet;