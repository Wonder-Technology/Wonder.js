open StateDataType;

open GameObjectType;

open ComponentMapService;

open BasicCameraViewType;

let batchGetBasicCameraViewComponent = (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.basicCameraViewMap);

let batchGetPerspectiveCameraProjectionComponent =
    (uidArray: array(int), {gameObjectRecord} as state) =>
  batchGetComponent(uidArray, gameObjectRecord.perspectiveCameraProjectionMap);

let batchGetTransformComponent = (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.transformMap);