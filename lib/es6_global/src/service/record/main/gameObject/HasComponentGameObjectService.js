

import * as ComponentMapService$Wonderjs from "../../../primitive/gameObject/ComponentMapService.js";

function hasBasicCameraViewComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* basicCameraViewMap */25]);
}

function hasPerspectiveCameraProjectionComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* perspectiveCameraProjectionMap */26]);
}

function hasArcballCameraControllerComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* arcballCameraControllerMap */27]);
}

function hasMeshRendererComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* meshRendererMap */28]);
}

function hasTransformComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* transformMap */24]);
}

function hasGeometryComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* geometryMap */23]);
}

function hasBasicMaterialComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* basicMaterialMap */29]);
}

function hasLightMaterialComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* lightMaterialMap */30]);
}

function hasDirectionLightComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* directionLightMap */33]);
}

function hasPointLightComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* pointLightMap */34]);
}

function hasSourceInstanceComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* sourceInstanceMap */31]);
}

function hasObjectInstanceComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* objectInstanceMap */32]);
}

export {
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
