

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as GameObjectScriptMainService$Wonderjs from "./GameObjectScriptMainService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as GetIsActiveGameObjectMainService$Wonderjs from "../gameObject/GetIsActiveGameObjectMainService.js";

function getIsActive(script, state) {
  var scriptRecord = state[/* scriptRecord */27];
  return MutableSparseMapService$WonderCommonlib.get(script, scriptRecord[/* isActiveMap */4]);
}

function unsafeGetIsActive(script, state) {
  var match = getIsActive(script, state);
  if (match !== undefined) {
    return match;
  } else {
    return true;
  }
}

function _setIsActive(script, isActive, state) {
  var scriptRecord = state[/* scriptRecord */27];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* scriptRecord */27] = /* record */[
    /* index */scriptRecord[/* index */0],
    /* isScriptEventFunctionEnable */scriptRecord[/* isScriptEventFunctionEnable */1],
    /* disposedIndexArray */scriptRecord[/* disposedIndexArray */2],
    /* gameObjectMap */scriptRecord[/* gameObjectMap */3],
    /* isActiveMap */MutableSparseMapService$WonderCommonlib.set(script, isActive, scriptRecord[/* isActiveMap */4]),
    /* scriptEventFunctionDataMap */scriptRecord[/* scriptEventFunctionDataMap */5],
    /* scriptAttributeMap */scriptRecord[/* scriptAttributeMap */6]
  ];
  return newrecord;
}

function setIsActive(script, isActive, state) {
  var scriptRecord = state[/* scriptRecord */27];
  var match = GameObjectScriptMainService$Wonderjs.getGameObject(script, scriptRecord);
  if (match !== undefined) {
    var gameObject = match;
    var match$1 = !GetIsActiveGameObjectMainService$Wonderjs.unsafeGetIsActive(gameObject, state) && isActive;
    if (match$1) {
      Log$WonderLog.warn("script:" + (String(script) + (" -> gameObject:" + (String(gameObject) + " isn\'t active, can\'t set script to active"))));
      return state;
    } else {
      return _setIsActive(script, isActive, state);
    }
  } else {
    return _setIsActive(script, isActive, state);
  }
}

export {
  getIsActive ,
  unsafeGetIsActive ,
  _setIsActive ,
  setIsActive ,
  
}
/* Log-WonderLog Not a pure module */
