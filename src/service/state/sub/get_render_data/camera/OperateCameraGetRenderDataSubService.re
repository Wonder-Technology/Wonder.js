open SubStateGetRenderDataType;

let unsafeGetCameraRecord = state =>
  state.cameraRecord |> OptionService.unsafeGet;

let getCameraVMatrixData = (. state) => unsafeGetCameraRecord(state).vMatrix;

let getCameraPMatrixData = (. state) => unsafeGetCameraRecord(state).pMatrix;

let getCameraPositionData =
  (. state) => unsafeGetCameraRecord(state).position;