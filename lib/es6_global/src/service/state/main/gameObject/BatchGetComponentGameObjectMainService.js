

import * as ComponentMapService$Wonderjs from "../../../primitive/gameObject/ComponentMapService.js";

function batchGetBasicCameraViewComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* basicCameraViewMap */26]);
}

function batchGetPerspectiveCameraProjectionComponent(uidArray, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* perspectiveCameraProjectionMap */27]);
}

function batchGetArcballCameraControllerComponent(uidArray, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* arcballCameraControllerMap */28]);
}

function batchGetTransformComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* transformMap */25]);
}

function batchGetGeometryComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* geometryMap */24]);
}

function batchGetBasicMaterialComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* basicMaterialMap */30]);
}

function batchGetLightMaterialComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* lightMaterialMap */31]);
}

function batchGetMeshRendererComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* meshRendererMap */29]);
}

function batchGetDirectionLightComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* directionLightMap */34]);
}

function batchGetPointLightComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* pointLightMap */35]);
}

function batchGetSourceInstanceComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* sourceInstanceMap */32]);
}

function batchGetObjectInstanceComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* objectInstanceMap */33]);
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
