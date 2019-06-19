open SubStateGetRenderDataType;

let getSkyboxVMatrix = state =>
  GetCameraDataGetRenderDataSubService.getCameraVMatrixData(. state)
  |> Matrix4Service.copy
  |> Matrix4Service.setTranslation((0., 0., 0.));

let getCubemapUnit = _state => 0;