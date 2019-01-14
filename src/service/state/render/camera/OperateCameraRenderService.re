open StateRenderType;

let hasCameraRecord = state => state.cameraRecord |> Js.Option.isSome;