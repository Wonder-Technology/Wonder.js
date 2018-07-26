

import * as ComponentMapService$Wonderjs from "../../../primitive/gameObject/ComponentMapService.js";
import * as CurrentComponentDataMapService$Wonderjs from "../../all/gameObject/CurrentComponentDataMapService.js";
import * as CurrentComponentDataMapRenderService$Wonderjs from "../../../state/render/gameObject/CurrentComponentDataMapRenderService.js";

function hasBasicCameraViewComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* basicCameraViewMap */23]);
}

function hasPerspectiveCameraProjectionComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* perspectiveCameraProjectionMap */24]);
}

function hasArcballCameraControllerComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* arcballCameraControllerMap */25]);
}

function hasMeshRendererComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* meshRendererMap */26]);
}

function hasTransformComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* transformMap */22]);
}

function hasBoxGeometryComponent(uid, gameObjectRecord) {
  return CurrentComponentDataMapRenderService$Wonderjs.hasComponent(uid, gameObjectRecord[/* geometryDataMap */21], CurrentComponentDataMapService$Wonderjs.getBoxGeometryType(/* () */0));
}

function hasGeometryComponent(uid, gameObjectRecord) {
  return CurrentComponentDataMapRenderService$Wonderjs.hasComponent(uid, gameObjectRecord[/* geometryDataMap */21], CurrentComponentDataMapService$Wonderjs.getCustomGeometryType(/* () */0));
}

function hasBasicMaterialComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* basicMaterialMap */27]);
}

function hasLightMaterialComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* lightMaterialMap */28]);
}

function hasDirectionLightComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* directionLightMap */31]);
}

function hasPointLightComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* pointLightMap */32]);
}

function hasSourceInstanceComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* sourceInstanceMap */29]);
}

function hasObjectInstanceComponent(uid, gameObjectRecord) {
  return ComponentMapService$Wonderjs.hasComponent(uid, gameObjectRecord[/* objectInstanceMap */30]);
}

export {
  hasBasicCameraViewComponent ,
  hasPerspectiveCameraProjectionComponent ,
  hasArcballCameraControllerComponent ,
  hasMeshRendererComponent ,
  hasTransformComponent ,
  hasBoxGeometryComponent ,
  hasGeometryComponent ,
  hasBasicMaterialComponent ,
  hasLightMaterialComponent ,
  hasDirectionLightComponent ,
  hasPointLightComponent ,
  hasSourceInstanceComponent ,
  hasObjectInstanceComponent ,
  
}
/* ComponentMapService-Wonderjs Not a pure module */
