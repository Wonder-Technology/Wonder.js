

import * as ComponentMapService$Wonderjs from "../../../primitive/gameObject/ComponentMapService.js";

function batchGetScriptComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* scriptMap */40]);
}

function batchGetBasicCameraViewComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* basicCameraViewMap */30]);
}

function batchGetPerspectiveCameraProjectionComponent(uidArray, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* perspectiveCameraProjectionMap */31]);
}

function batchGetArcballCameraControllerComponent(uidArray, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* arcballCameraControllerMap */32]);
}

function batchGetTransformComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* transformMap */29]);
}

function batchGetGeometryComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* geometryMap */28]);
}

function batchGetBasicMaterialComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* basicMaterialMap */34]);
}

function batchGetLightMaterialComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* lightMaterialMap */35]);
}

function batchGetMeshRendererComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* meshRendererMap */33]);
}

function batchGetDirectionLightComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* directionLightMap */38]);
}

function batchGetPointLightComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* pointLightMap */39]);
}

function batchGetSourceInstanceComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* sourceInstanceMap */36]);
}

function batchGetObjectInstanceComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* objectInstanceMap */37]);
}

export {
  batchGetScriptComponent ,
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
