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
/* 
let batchGetBasicCameraViewComponent = (uidArray: array(int), {basicCameraViewMap}) =>
  batchGetComponent(uidArray, basicCameraViewMap);

let batchGetPerspectiveCameraProjectionComponent =
    (uidArray: array(int), {perspectiveCameraProjectionMap}) =>
  batchGetComponent(uidArray, perspectiveCameraProjectionMap);

let batchGetTransformComponent = (uidArray: array(int), {transformMap}) =>
  batchGetComponent(uidArray, transformMap); */