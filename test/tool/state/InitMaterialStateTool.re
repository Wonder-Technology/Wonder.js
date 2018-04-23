open StateDataMainType;

let isRenderConfigRecordExist = (state) => state.renderConfigRecord |> Js.Option.isSome;

let setRenderConfig = (renderConfig, state) => {...state, renderConfigRecord: Some(renderConfig)};