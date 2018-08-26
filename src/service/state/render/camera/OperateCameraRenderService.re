open StateRenderType;

let unsafeGetCameraRecord = state =>
  state.cameraRecord |> OptionService.unsafeGet;

let hasCameraRecord = state => state.cameraRecord |> Js.Option.isSome;

let getCameraVMatrixData = (. state) => unsafeGetCameraRecord(state).vMatrix;

let getCameraPMatrixData = (. state) => unsafeGetCameraRecord(state).pMatrix;

let getCameraPositionData =
  (. state) => unsafeGetCameraRecord(state).position;