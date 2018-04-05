open MainStateDataType;

let getRecord = (state) => state.renderConfigRecord |> OptionService.unsafeGet;