

import * as Caml_array from "../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as CameraSceneMainService$Wonderjs from "../service/state/main/scene/CameraSceneMainService.js";
import * as RecordSceneMainService$Wonderjs from "../service/state/main/scene/RecordSceneMainService.js";
import * as GameObjectSceneMainService$Wonderjs from "../service/state/main/scene/GameObjectSceneMainService.js";
import * as AmbientLightSceneMainService$Wonderjs from "../service/state/main/scene/AmbientLightSceneMainService.js";

function getCurrentCameraGameObject(state) {
  return CameraSceneMainService$Wonderjs.getCurrentCameraGameObject(state[/* basicCameraViewRecord */13], RecordSceneMainService$Wonderjs.getRecord(state));
}

function setCurrentCameraGameObject(uid, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* sceneRecord */12] = CameraSceneMainService$Wonderjs.setCurrentCameraGameObject(uid, RecordSceneMainService$Wonderjs.getRecord(state));
  return newrecord;
}

var getAmbientLightColor = AmbientLightSceneMainService$Wonderjs.getAmbientLightColor;

var setAmbientLightColor = AmbientLightSceneMainService$Wonderjs.setAmbientLightColor;

var getSceneGameObject = GameObjectSceneMainService$Wonderjs.getSceneGameObject;

var addSceneChild = GameObjectSceneMainService$Wonderjs.addChild;

var addSceneChildren = GameObjectSceneMainService$Wonderjs.addChildren;

export {
  getCurrentCameraGameObject ,
  setCurrentCameraGameObject ,
  getAmbientLightColor ,
  setAmbientLightColor ,
  getSceneGameObject ,
  addSceneChild ,
  addSceneChildren ,
  
}
/* CameraSceneMainService-Wonderjs Not a pure module */
