open MainStateDataType;

open MainStateDataType;

open ComponentMapService;

open BasicCameraViewType;

let batchGetBasicCameraViewComponent = (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.basicCameraViewMap);

let batchGetPerspectiveCameraProjectionComponent =
    (uidArray: array(int), {gameObjectRecord} as state) =>
  batchGetComponent(uidArray, gameObjectRecord.perspectiveCameraProjectionMap);

let batchGetTransformComponent = (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.transformMap);

let batchGetBoxGeometryComponent = (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.boxGeometryMap);

let batchGetCustomGeometryComponent = (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.customGeometryMap);

let batchGetBasicMaterialComponent = (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.basicMaterialMap);

let batchGetLightMaterialComponent = (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.lightMaterialMap);

let batchGetMeshRendererComponent = (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.meshRendererMap);

let batchGetAmbientLightComponent = (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.ambientLightMap);

let batchGetDirectionLightComponent = (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.directionLightMap);

let batchGetPointLightComponent = (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.pointLightMap);

let batchGetSourceInstanceComponent = (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.sourceInstanceMap);

let batchGetObjectInstanceComponent = (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.objectInstanceMap);