

import * as ComponentMapService$Wonderjs from "../../../primitive/gameObject/ComponentMapService.js";

function batchGetScriptComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* scriptMap */42]);
}

function batchGetBasicCameraViewComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* basicCameraViewMap */31]);
}

function batchGetPerspectiveCameraProjectionComponent(uidArray, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* perspectiveCameraProjectionMap */32]);
}

function batchGetArcballCameraControllerComponent(uidArray, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* arcballCameraControllerMap */33]);
}

function batchGetFlyCameraControllerComponent(uidArray, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* flyCameraControllerMap */34]);
}

function batchGetTransformComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* transformMap */30]);
}

function batchGetGeometryComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* geometryMap */29]);
}

function batchGetBasicMaterialComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* basicMaterialMap */36]);
}

function batchGetLightMaterialComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* lightMaterialMap */37]);
}

function batchGetMeshRendererComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* meshRendererMap */35]);
}

function batchGetDirectionLightComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* directionLightMap */40]);
}

function batchGetPointLightComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* pointLightMap */41]);
}

function batchGetSourceInstanceComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* sourceInstanceMap */38]);
}

function batchGetObjectInstanceComponent(uidArray, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  return ComponentMapService$Wonderjs.batchGetComponent(uidArray, gameObjectRecord[/* objectInstanceMap */39]);
}

export {
  batchGetScriptComponent ,
  batchGetBasicCameraViewComponent ,
  batchGetPerspectiveCameraProjectionComponent ,
  batchGetArcballCameraControllerComponent ,
  batchGetFlyCameraControllerComponent ,
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
