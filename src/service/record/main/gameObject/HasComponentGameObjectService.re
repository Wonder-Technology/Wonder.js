open StateDataMainType;

open GameObjectType;

open ComponentMapService;

let hasScriptComponent = (uid: int, gameObjectRecord): bool =>
  hasComponent(uid, gameObjectRecord.scriptMap);

let hasBasicCameraViewComponent = (uid: int, gameObjectRecord): bool =>
  hasComponent(uid, gameObjectRecord.basicCameraViewMap);

let hasPerspectiveCameraProjectionComponent =
    (uid: int, gameObjectRecord): bool =>
  hasComponent(uid, gameObjectRecord.perspectiveCameraProjectionMap);

let hasFlyCameraControllerComponent = (uid: int, gameObjectRecord): bool =>
  hasComponent(uid, gameObjectRecord.flyCameraControllerMap);

let hasArcballCameraControllerComponent = (uid: int, gameObjectRecord): bool =>
  hasComponent(uid, gameObjectRecord.arcballCameraControllerMap);

let hasMeshRendererComponent = (uid: int, gameObjectRecord): bool =>
  hasComponent(uid, gameObjectRecord.meshRendererMap);

let hasTransformComponent = (uid: int, gameObjectRecord): bool =>
  hasComponent(uid, gameObjectRecord.transformMap);

let hasGeometryComponent = (uid: int, gameObjectRecord): bool =>
  hasComponent(uid, gameObjectRecord.geometryMap);

let hasBasicMaterialComponent = (uid: int, gameObjectRecord): bool =>
  hasComponent(uid, gameObjectRecord.basicMaterialMap);

let hasLightMaterialComponent = (uid: int, gameObjectRecord): bool =>
  hasComponent(uid, gameObjectRecord.lightMaterialMap);

let hasDirectionLightComponent = (uid: int, gameObjectRecord): bool =>
  hasComponent(uid, gameObjectRecord.directionLightMap);

let hasPointLightComponent = (uid: int, gameObjectRecord): bool =>
  hasComponent(uid, gameObjectRecord.pointLightMap);

let hasSourceInstanceComponent = (uid: int, gameObjectRecord): bool =>
  hasComponent(uid, gameObjectRecord.sourceInstanceMap);

let hasObjectInstanceComponent = (uid: int, gameObjectRecord): bool =>
  hasComponent(uid, gameObjectRecord.objectInstanceMap);