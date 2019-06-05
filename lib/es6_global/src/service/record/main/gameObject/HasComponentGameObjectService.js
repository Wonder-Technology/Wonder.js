

import * as ComponentMapService$Wonderjs from "../../../primitive/gameObject/ComponentMapService.js";

function hasScriptComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* scriptMap */40]);
}

function hasBasicCameraViewComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* basicCameraViewMap */30]);
}

function hasPerspectiveCameraProjectionComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* perspectiveCameraProjectionMap */31]);
}

function hasArcballCameraControllerComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* arcballCameraControllerMap */32]);
}

function hasMeshRendererComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* meshRendererMap */33]);
}

function hasTransformComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* transformMap */29]);
}

function hasGeometryComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* geometryMap */28]);
}

function hasBasicMaterialComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* basicMaterialMap */34]);
}

function hasLightMaterialComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* lightMaterialMap */35]);
}

function hasDirectionLightComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* directionLightMap */38]);
}

function hasPointLightComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* pointLightMap */39]);
}

function hasSourceInstanceComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* sourceInstanceMap */36]);
}

function hasObjectInstanceComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* objectInstanceMap */37]);
}

export {
  hasScriptComponent ,
  hasBasicCameraViewComponent ,
  hasPerspectiveCameraProjectionComponent ,
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
