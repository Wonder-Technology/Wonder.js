open StateRenderType;

let unsafeGetCameraRecord = (state) => state.cameraRecord |> OptionService.unsafeGet;

let getCameraVMatrixData = [@bs] ((state) => unsafeGetCameraRecord(state).vMatrix);

let getCameraPMatrixData = [@bs] ((state) => unsafeGetCameraRecord(state).pMatrix);

let getCameraPositionData = [@bs] ((state) => unsafeGetCameraRecord(state).position);