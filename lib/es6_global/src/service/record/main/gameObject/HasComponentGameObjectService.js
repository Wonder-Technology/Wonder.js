

import * as ComponentMapService$Wonderjs from "../../../primitive/gameObject/ComponentMapService.js";

function hasScriptComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* scriptMap */42]);
}

function hasBasicCameraViewComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* basicCameraViewMap */31]);
}

function hasPerspectiveCameraProjectionComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* perspectiveCameraProjectionMap */32]);
}

function hasFlyCameraControllerComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* flyCameraControllerMap */34]);
}

function hasArcballCameraControllerComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* arcballCameraControllerMap */33]);
}

function hasMeshRendererComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* meshRendererMap */35]);
}

function hasTransformComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* transformMap */30]);
}

function hasGeometryComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* geometryMap */29]);
}

function hasBasicMaterialComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* basicMaterialMap */36]);
}

function hasLightMaterialComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* lightMaterialMap */37]);
}

function hasDirectionLightComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* directionLightMap */40]);
}

function hasPointLightComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* pointLightMap */41]);
}

function hasSourceInstanceComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* sourceInstanceMap */38]);
}

function hasObjectInstanceComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* objectInstanceMap */39]);
}

export {
  hasScriptComponent ,
  hasBasicCameraViewComponent ,
  hasPerspectiveCameraProjectionComponent ,
  hasFlyCameraControllerComponent ,
  hasArcballCameraControllerComponent ,
  hasMeshRendererComponent ,
  hasTransformComponent ,
  hasGeometryComponent ,
  hasBasicMaterialComponent ,
  hasLightMaterialComponent ,
  hasDirectionLightComponent ,
  hasPointLightComponent ,
  hasSourceInstanceComponent ,
  hasObjectInstanceComponent ,
  
}
/* ComponentMapService-Wonderjs Not a pure module */
