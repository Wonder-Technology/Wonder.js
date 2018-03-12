open GameObjectType;

open ComponentMapService;

let hasBasicCameraViewComponent = (uid: int, gameObjectRecord) : bool =>
  hasComponent(uid, gameObjectRecord.basicCameraViewMap);

let hasPerspectiveCameraProjectionComponent = (uid: int, gameObjectRecord) : bool =>
  hasComponent(uid, gameObjectRecord.perspectiveCameraProjectionMap);

let hasTransformComponent = (uid: int, gameObjectRecord) : bool =>
  hasComponent(uid, gameObjectRecord.transformMap);

let hasBoxGeometryComponent = (uid: int, gameObjectRecord) : bool =>
  hasComponent(uid, gameObjectRecord.boxGeometryMap);