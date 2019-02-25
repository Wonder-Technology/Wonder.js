

import * as ComponentMapService$Wonderjs from "../../../primitive/gameObject/ComponentMapService.js";

function hasBasicCameraViewComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* basicCameraViewMap */26]);
}

function hasPerspectiveCameraProjectionComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* perspectiveCameraProjectionMap */27]);
}

function hasArcballCameraControllerComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* arcballCameraControllerMap */28]);
}

function hasMeshRendererComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* meshRendererMap */29]);
}

function hasTransformComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* transformMap */25]);
}

function hasGeometryComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* geometryMap */24]);
}

function hasBasicMaterialComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* basicMaterialMap */30]);
}

function hasLightMaterialComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* lightMaterialMap */31]);
}

function hasDirectionLightComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* directionLightMap */34]);
}

function hasPointLightComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* pointLightMap */35]);
}

function hasSourceInstanceComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* sourceInstanceMap */32]);
}

function hasObjectInstanceComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* objectInstanceMap */33]);
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
