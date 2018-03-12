open GameObjectType;

open ComponentMapService;

let getBasicCameraViewComponent =
  [@bs] ((uid: int, {basicCameraViewMap}) => basicCameraViewMap |> getComponent(uid));

let unsafeGetBasicCameraViewComponent = (uid: int, {basicCameraViewMap}) =>
  basicCameraViewMap |> unsafeGetComponent(uid);

let getPerspectiveCameraProjectionComponent =
  [@bs]
  (
    (uid: int, {perspectiveCameraProjectionMap}) =>
      perspectiveCameraProjectionMap |> getComponent(uid)
  );

let unsafeGetPerspectiveCameraProjectionComponent = (uid: int, {perspectiveCameraProjectionMap}) =>
  perspectiveCameraProjectionMap |> unsafeGetComponent(uid);

let getTransformComponent =
  [@bs] ((uid: int, {transformMap}) => transformMap |> getComponent(uid));

let unsafeGetTransformComponent = (uid: int, {transformMap}) =>
  transformMap |> unsafeGetComponent(uid);

let getBoxGeometryComponent =
  [@bs] ((uid: int, {boxGeometryMap}) => boxGeometryMap |> getComponent(uid));

let unsafeGetBoxGeometryComponent = (uid: int, {boxGeometryMap}) =>
  boxGeometryMap |> unsafeGetComponent(uid);