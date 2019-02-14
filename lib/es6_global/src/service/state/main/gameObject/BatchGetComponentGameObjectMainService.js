

import * as ComponentMapService$Wonderjs from "../../../primitive/gameObject/ComponentMapService.js";

function batchGetBasicCameraViewComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* basicCameraViewMap */25]);
}

function batchGetPerspectiveCameraProjectionComponent(uidArray, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* perspectiveCameraProjectionMap */26]);
}

function batchGetArcballCameraControllerComponent(uidArray, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* arcballCameraControllerMap */27]);
}

function batchGetTransformComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* transformMap */24]);
}

function batchGetGeometryComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* geometryMap */23]);
}

function batchGetBasicMaterialComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* basicMaterialMap */29]);
}

function batchGetLightMaterialComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* lightMaterialMap */30]);
}

function batchGetMeshRendererComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* meshRendererMap */28]);
}

function batchGetDirectionLightComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* directionLightMap */33]);
}

function batchGetPointLightComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* pointLightMap */34]);
}

function batchGetSourceInstanceComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* sourceInstanceMap */31]);
}

function batchGetObjectInstanceComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* objectInstanceMap */32]);
}

export {
  batchGetBasicCameraViewComponent ,
  batchGetPerspectiveCameraProjectionComponent ,
  batchGetArcballCameraControllerComponent ,
  batchGetTransformComponent ,
  batchGetGeometryComponent ,
  batchGetBasicMaterialComponent ,
  batchGetLightMaterialComponent ,
  batchGetMeshRendererComponent ,
  batchGetDirectionLightComponent ,
  batchGetPointLightComponent ,
  batchGetSourceInstanceComponent ,
  batchGetObjectInstanceComponent ,
  
}
/* ComponentMapService-Wonderjs Not a pure module */
