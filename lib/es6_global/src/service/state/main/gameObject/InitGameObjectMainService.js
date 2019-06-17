

import * as InitBasicMaterialMainService$Wonderjs from "../material/basic/InitBasicMaterialMainService.js";
import * as InitLightMaterialMainService$Wonderjs from "../material/light/InitLightMaterialMainService.js";
import * as InitSourceTextureMainService$Wonderjs from "../texture/InitSourceTextureMainService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../record/main/gameObject/GetComponentGameObjectService.js";
import * as OperateBasicMaterialMainService$Wonderjs from "../material/basic/OperateBasicMaterialMainService.js";
import * as OperateLightMaterialMainService$Wonderjs from "../material/light/OperateLightMaterialMainService.js";
import * as OperateScriptEventFunctionDataMainService$Wonderjs from "../script/OperateScriptEventFunctionDataMainService.js";
import * as InitPerspectiveCameraProjectionMainService$Wonderjs from "../perspective_camera_projection/InitPerspectiveCameraProjectionMainService.js";

function _initMaterialComponent(uid, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var match = GetComponentGameObjectService$Wonderjs.getBasicMaterialComponent(uid, gameObjectRecord);
  var state$1;
  if (match !== undefined) {
    var material = match;
    var state$2 = InitBasicMaterialMainService$Wonderjs.handleInitComponent(material, state);
    state$1 = InitSourceTextureMainService$Wonderjs.initTexture(OperateBasicMaterialMainService$Wonderjs.getMap(material, state$2), state$2);
  } else {
    state$1 = state;
  }
  var match$1 = GetComponentGameObjectService$Wonderjs.getLightMaterialComponent(uid, gameObjectRecord);
  if (match$1 !== undefined) {
    var material$1 = match$1;
    var state$3 = InitLightMaterialMainService$Wonderjs.handleInitComponent(material$1, state$1);
    var state$4 = InitSourceTextureMainService$Wonderjs.initTexture(OperateLightMaterialMainService$Wonderjs.getDiffuseMap(material$1, state$3), state$3);
    return InitSourceTextureMainService$Wonderjs.initTexture(OperateLightMaterialMainService$Wonderjs.getSpecularMap(material$1, state$4), state$4);
  } else {
    return state$1;
  }
}

function initGameObject(uid, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var state$1 = _initMaterialComponent(uid, state);
  var match = GetComponentGameObjectService$Wonderjs.getPerspectiveCameraProjectionComponent(uid, gameObjectRecord);
  var state$2 = match !== undefined ? InitPerspectiveCameraProjectionMainService$Wonderjs.initPerspepctiveCameraProjection(match, state$1) : state$1;
  var __x = OperateScriptEventFunctionDataMainService$Wonderjs.getGameObjectAllInitEventFunctionData(uid, state$2);
  return OperateScriptEventFunctionDataMainService$Wonderjs.execAllEventFunction(__x, state$2);
}

export {
  _initMaterialComponent ,
  initGameObject ,
  
}
/* InitBasicMaterialMainService-Wonderjs Not a pure module */
