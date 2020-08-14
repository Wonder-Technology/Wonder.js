

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_option from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as IsActiveScriptMainService$Wonderjs from "./IsActiveScriptMainService.js";
import * as OperateScriptAPIMainService$Wonderjs from "../api/script/OperateScriptAPIMainService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../record/main/gameObject/GetComponentGameObjectService.js";
import * as ImmutableHashMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableHashMapService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";

function _pushEventFunctionData(script, scriptEventFunctionData, mapEventFunctionDataFunc, arr) {
  return ArrayService$Wonderjs.push(/* tuple */[
              script,
              ImmutableHashMapService$WonderCommonlib.getValidValues(scriptEventFunctionData).map(Curry.__1(mapEventFunctionDataFunc)).filter(Js_option.isSome).map(OptionService$Wonderjs.unsafeGet)
            ], arr);
}

function _getAllEventFunctionData(mapEventFunctionDataFunc, state) {
  var scriptRecord = state[/* scriptRecord */25];
  return ImmutableSparseMapService$WonderCommonlib.reduceiValid((function (arr, scriptEventFunctionData, script) {
                var match = IsActiveScriptMainService$Wonderjs.unsafeGetIsActive(script, state);
                if (match) {
                  return _pushEventFunctionData(script, scriptEventFunctionData, mapEventFunctionDataFunc, arr);
                } else {
                  return arr;
                }
              }), ArrayService$WonderCommonlib.createEmpty(/* () */0), scriptRecord[/* scriptEventFunctionDataMap */5]);
}

function getAllActiveUpdateEventFunctionData(state) {
  return _getAllEventFunctionData((function (param) {
                return param[/* update */1];
              }), state);
}

function _mapInitEventFunctionDataFunc(param) {
  return param[/* init */0];
}

function getAllActiveInitEventFunctionData(state) {
  return _getAllEventFunctionData(_mapInitEventFunctionDataFunc, state);
}

function enableScriptEventFunction(state) {
  var scriptRecord = state[/* scriptRecord */25];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* scriptRecord */25] = /* record */[
    /* index */scriptRecord[/* index */0],
    /* isScriptEventFunctionEnable */true,
    /* disposedIndexArray */scriptRecord[/* disposedIndexArray */2],
    /* gameObjectMap */scriptRecord[/* gameObjectMap */3],
    /* isActiveMap */scriptRecord[/* isActiveMap */4],
    /* scriptEventFunctionDataMap */scriptRecord[/* scriptEventFunctionDataMap */5],
    /* scriptAttributeMap */scriptRecord[/* scriptAttributeMap */6]
  ];
  return newrecord;
}

function disableScriptEventFunction(state) {
  var scriptRecord = state[/* scriptRecord */25];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* scriptRecord */25] = /* record */[
    /* index */scriptRecord[/* index */0],
    /* isScriptEventFunctionEnable */false,
    /* disposedIndexArray */scriptRecord[/* disposedIndexArray */2],
    /* gameObjectMap */scriptRecord[/* gameObjectMap */3],
    /* isActiveMap */scriptRecord[/* isActiveMap */4],
    /* scriptEventFunctionDataMap */scriptRecord[/* scriptEventFunctionDataMap */5],
    /* scriptAttributeMap */scriptRecord[/* scriptAttributeMap */6]
  ];
  return newrecord;
}

function isScriptEventFunctionEnable(state) {
  return state[/* scriptRecord */25][/* isScriptEventFunctionEnable */1];
}

function execAllEventFunction(allEventFunctionData, state) {
  var match = isScriptEventFunctionEnable(state);
  if (match) {
    var apiJsObj = OperateScriptAPIMainService$Wonderjs.getScriptAPIJsObj(state);
    return ArrayService$WonderCommonlib.reduceOneParam((function (state, param) {
                  var script = param[0];
                  return ArrayService$WonderCommonlib.reduceOneParam((function (state, func) {
                                return func(script, apiJsObj, state);
                              }), state, param[1]);
                }), state, allEventFunctionData);
  } else {
    return state;
  }
}

function getGameObjectAllInitEventFunctionData(gameObject, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var scriptRecord = state[/* scriptRecord */25];
  var match = GetComponentGameObjectService$Wonderjs.getScriptComponent(gameObject, gameObjectRecord);
  if (match !== undefined) {
    var script = match;
    var match$1 = ImmutableSparseMapService$WonderCommonlib.get(script, scriptRecord[/* scriptEventFunctionDataMap */5]);
    if (match$1 !== undefined) {
      return _pushEventFunctionData(script, Caml_option.valFromOption(match$1), _mapInitEventFunctionDataFunc, ArrayService$WonderCommonlib.createEmpty(/* () */0));
    } else {
      return ArrayService$WonderCommonlib.createEmpty(/* () */0);
    }
  } else {
    return ArrayService$WonderCommonlib.createEmpty(/* () */0);
  }
}

function _mapDisposeEventFunctionDataFunc(param) {
  return param[/* dispose */2];
}

function getActiveScriptAllDisposeEventFunctionData(scriptArray, state) {
  var scriptRecord = state[/* scriptRecord */25];
  var scriptEventFunctionDataMap = scriptRecord[/* scriptEventFunctionDataMap */5];
  return ArrayService$WonderCommonlib.reduceOneParam((function (arr, script) {
                var match = ImmutableSparseMapService$WonderCommonlib.get(script, scriptEventFunctionDataMap);
                if (match !== undefined) {
                  return _pushEventFunctionData(script, Caml_option.valFromOption(match), _mapDisposeEventFunctionDataFunc, arr);
                } else {
                  return arr;
                }
              }), ArrayService$WonderCommonlib.createEmpty(/* () */0), scriptArray.filter((function (script) {
                    return IsActiveScriptMainService$Wonderjs.unsafeGetIsActive(script, state);
                  })));
}

export {
  _pushEventFunctionData ,
  _getAllEventFunctionData ,
  getAllActiveUpdateEventFunctionData ,
  _mapInitEventFunctionDataFunc ,
  getAllActiveInitEventFunctionData ,
  enableScriptEventFunction ,
  disableScriptEventFunction ,
  isScriptEventFunctionEnable ,
  execAllEventFunction ,
  getGameObjectAllInitEventFunctionData ,
  _mapDisposeEventFunctionDataFunc ,
  getActiveScriptAllDisposeEventFunctionData ,
  
}
/* ArrayService-Wonderjs Not a pure module */
