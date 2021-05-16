

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_option from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as ImmutableSparseMapService$Wonderjs from "../../../atom/ImmutableSparseMapService.js";
import * as ImmutableHashMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableHashMapService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";
import * as OperateScriptAttributeDataMainService$Wonderjs from "./OperateScriptAttributeDataMainService.js";

function _addScriptData(script, param, dataMap, scriptDataMap) {
  var __x = ImmutableHashMapService$WonderCommonlib.set(param[0], param[1], dataMap);
  return ImmutableSparseMapService$WonderCommonlib.set(script, __x, scriptDataMap);
}

function _addScriptEventFunctionData(script, param, eventFunctionDataMap, scriptEventFunctionDataMap) {
  return _addScriptData(script, /* tuple */[
              param[0],
              param[1]
            ], eventFunctionDataMap, scriptEventFunctionDataMap);
}

function _addScriptAttribute(script, param, attributeMap, scriptAttributeMap) {
  return _addScriptData(script, /* tuple */[
              param[0],
              param[1]
            ], attributeMap, scriptAttributeMap);
}

function addEventFunctionDataMap(script, eventFunctionDataMap, state) {
  var scriptRecord = state[/* scriptRecord */27];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* scriptRecord */27] = /* record */[
    /* index */scriptRecord[/* index */0],
    /* isScriptEventFunctionEnable */scriptRecord[/* isScriptEventFunctionEnable */1],
    /* disposedIndexArray */scriptRecord[/* disposedIndexArray */2],
    /* gameObjectMap */scriptRecord[/* gameObjectMap */3],
    /* isActiveMap */scriptRecord[/* isActiveMap */4],
    /* scriptEventFunctionDataMap */ImmutableSparseMapService$WonderCommonlib.set(script, eventFunctionDataMap, scriptRecord[/* scriptEventFunctionDataMap */5]),
    /* scriptAttributeMap */scriptRecord[/* scriptAttributeMap */6]
  ];
  return newrecord;
}

function addScriptEventFunctionData(script, scriptEventFunctionDataName, scriptEventFunctionData, state) {
  var scriptRecord = state[/* scriptRecord */27];
  var scriptEventFunctionDataMap = scriptRecord[/* scriptEventFunctionDataMap */5];
  var newrecord = Caml_array.caml_array_dup(state);
  var match = ImmutableSparseMapService$WonderCommonlib.get(script, scriptEventFunctionDataMap);
  newrecord[/* scriptRecord */27] = /* record */[
    /* index */scriptRecord[/* index */0],
    /* isScriptEventFunctionEnable */scriptRecord[/* isScriptEventFunctionEnable */1],
    /* disposedIndexArray */scriptRecord[/* disposedIndexArray */2],
    /* gameObjectMap */scriptRecord[/* gameObjectMap */3],
    /* isActiveMap */scriptRecord[/* isActiveMap */4],
    /* scriptEventFunctionDataMap */match !== undefined ? _addScriptEventFunctionData(script, /* tuple */[
            scriptEventFunctionDataName,
            scriptEventFunctionData
          ], Caml_option.valFromOption(match), scriptEventFunctionDataMap) : _addScriptEventFunctionData(script, /* tuple */[
            scriptEventFunctionDataName,
            scriptEventFunctionData
          ], ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0), scriptEventFunctionDataMap),
    /* scriptAttributeMap */scriptRecord[/* scriptAttributeMap */6]
  ];
  return newrecord;
}

function addAttributeMap(script, attributeMap, state) {
  var scriptRecord = state[/* scriptRecord */27];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* scriptRecord */27] = /* record */[
    /* index */scriptRecord[/* index */0],
    /* isScriptEventFunctionEnable */scriptRecord[/* isScriptEventFunctionEnable */1],
    /* disposedIndexArray */scriptRecord[/* disposedIndexArray */2],
    /* gameObjectMap */scriptRecord[/* gameObjectMap */3],
    /* isActiveMap */scriptRecord[/* isActiveMap */4],
    /* scriptEventFunctionDataMap */scriptRecord[/* scriptEventFunctionDataMap */5],
    /* scriptAttributeMap */ImmutableSparseMapService$WonderCommonlib.set(script, attributeMap, scriptRecord[/* scriptAttributeMap */6])
  ];
  return newrecord;
}

function addScriptAttribute(script, scriptAttributeName, scriptAttribute, state) {
  var scriptRecord = state[/* scriptRecord */27];
  var scriptAttributeMap = scriptRecord[/* scriptAttributeMap */6];
  var newrecord = Caml_array.caml_array_dup(state);
  var match = ImmutableSparseMapService$WonderCommonlib.get(script, scriptAttributeMap);
  newrecord[/* scriptRecord */27] = /* record */[
    /* index */scriptRecord[/* index */0],
    /* isScriptEventFunctionEnable */scriptRecord[/* isScriptEventFunctionEnable */1],
    /* disposedIndexArray */scriptRecord[/* disposedIndexArray */2],
    /* gameObjectMap */scriptRecord[/* gameObjectMap */3],
    /* isActiveMap */scriptRecord[/* isActiveMap */4],
    /* scriptEventFunctionDataMap */scriptRecord[/* scriptEventFunctionDataMap */5],
    /* scriptAttributeMap */match !== undefined ? _addScriptAttribute(script, /* tuple */[
            scriptAttributeName,
            scriptAttribute
          ], Caml_option.valFromOption(match), scriptAttributeMap) : _addScriptAttribute(script, /* tuple */[
            scriptAttributeName,
            scriptAttribute
          ], ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0), scriptAttributeMap)
  ];
  return newrecord;
}

function _removeScriptData(script, scriptDataName, dataMap, scriptDataMap) {
  var __x = ImmutableHashMapService$WonderCommonlib.deleteVal(scriptDataName, dataMap);
  return ImmutableSparseMapService$WonderCommonlib.set(script, __x, scriptDataMap);
}

var _removeScriptEventFunctionData = _removeScriptData;

var _removeScriptAttribute = _removeScriptData;

function removeScriptEventFunctionData(script, scriptEventFunctionDataName, state) {
  var scriptRecord = state[/* scriptRecord */27];
  var scriptEventFunctionDataMap = scriptRecord[/* scriptEventFunctionDataMap */5];
  var newrecord = Caml_array.caml_array_dup(state);
  var match = ImmutableSparseMapService$WonderCommonlib.get(script, scriptEventFunctionDataMap);
  newrecord[/* scriptRecord */27] = /* record */[
    /* index */scriptRecord[/* index */0],
    /* isScriptEventFunctionEnable */scriptRecord[/* isScriptEventFunctionEnable */1],
    /* disposedIndexArray */scriptRecord[/* disposedIndexArray */2],
    /* gameObjectMap */scriptRecord[/* gameObjectMap */3],
    /* isActiveMap */scriptRecord[/* isActiveMap */4],
    /* scriptEventFunctionDataMap */match !== undefined ? _removeScriptEventFunctionData(script, scriptEventFunctionDataName, Caml_option.valFromOption(match), scriptEventFunctionDataMap) : scriptEventFunctionDataMap,
    /* scriptAttributeMap */scriptRecord[/* scriptAttributeMap */6]
  ];
  return newrecord;
}

function removeScriptAttribute(script, scriptAttributeName, state) {
  var scriptRecord = state[/* scriptRecord */27];
  var scriptAttributeMap = scriptRecord[/* scriptAttributeMap */6];
  var newrecord = Caml_array.caml_array_dup(state);
  var match = ImmutableSparseMapService$WonderCommonlib.get(script, scriptAttributeMap);
  newrecord[/* scriptRecord */27] = /* record */[
    /* index */scriptRecord[/* index */0],
    /* isScriptEventFunctionEnable */scriptRecord[/* isScriptEventFunctionEnable */1],
    /* disposedIndexArray */scriptRecord[/* disposedIndexArray */2],
    /* gameObjectMap */scriptRecord[/* gameObjectMap */3],
    /* isActiveMap */scriptRecord[/* isActiveMap */4],
    /* scriptEventFunctionDataMap */scriptRecord[/* scriptEventFunctionDataMap */5],
    /* scriptAttributeMap */match !== undefined ? _removeScriptAttribute(script, scriptAttributeName, Caml_option.valFromOption(match), scriptAttributeMap) : scriptAttributeMap
  ];
  return newrecord;
}

function replaceScriptEventFunctionData(script, param, targetScriptEventFunctionData, state) {
  return addScriptEventFunctionData(script, param[1], targetScriptEventFunctionData, removeScriptEventFunctionData(script, param[0], state));
}

function replaceScriptAttribute(script, param, targetScriptAttribute, state) {
  return addScriptAttribute(script, param[1], targetScriptAttribute, removeScriptAttribute(script, param[0], state));
}

function getScriptEventFunctionDataEntries(script, state) {
  var scriptRecord = state[/* scriptRecord */27];
  return Js_option.andThen((function (eventFunctionDataMap) {
                return ImmutableHashMapService$WonderCommonlib.getValidEntries(eventFunctionDataMap);
              }), ImmutableSparseMapService$WonderCommonlib.get(script, scriptRecord[/* scriptEventFunctionDataMap */5]));
}

function unsafeGetScriptEventFunctionDataEntries(script, state) {
  return OptionService$Wonderjs.unsafeGet(getScriptEventFunctionDataEntries(script, state));
}

function getScriptAttributeEntries(script, state) {
  var scriptRecord = state[/* scriptRecord */27];
  return Js_option.andThen((function (attributeMap) {
                return ImmutableHashMapService$WonderCommonlib.getValidEntries(attributeMap);
              }), ImmutableSparseMapService$WonderCommonlib.get(script, scriptRecord[/* scriptAttributeMap */6]));
}

function unsafeGetScriptAttributeEntries(script, state) {
  return OptionService$Wonderjs.unsafeGet(getScriptAttributeEntries(script, state));
}

function getScriptAttribute(script, scriptAttributeName, state) {
  var scriptRecord = state[/* scriptRecord */27];
  return Js_option.andThen((function (scriptAttribute) {
                return ImmutableHashMapService$WonderCommonlib.get(scriptAttributeName, scriptAttribute);
              }), ImmutableSparseMapService$WonderCommonlib.get(script, scriptRecord[/* scriptAttributeMap */6]));
}

function unsafeGetScriptAttribute(script, scriptAttributeName, state) {
  return OptionService$Wonderjs.unsafeGet(getScriptAttribute(script, scriptAttributeName, state));
}

function _setScriptAttributeFieldData(script, param, setScriptAttributeFieldDataFunc, state) {
  var scriptAttributeName = param[0];
  var match = getScriptAttribute(script, scriptAttributeName, state);
  if (match !== undefined) {
    return addScriptAttribute(script, scriptAttributeName, Curry._3(setScriptAttributeFieldDataFunc, param[1], param[2], Caml_option.valFromOption(match)), state);
  } else {
    return state;
  }
}

function setScriptAttributeFieldValue(script, param, state) {
  return _setScriptAttributeFieldData(script, /* tuple */[
              param[0],
              param[1],
              param[2]
            ], OperateScriptAttributeDataMainService$Wonderjs.setScriptAttributeFieldValue, state);
}

function setScriptAttributeFieldDefaultValueAndValue(script, param, state) {
  return _setScriptAttributeFieldData(script, /* tuple */[
              param[0],
              param[1],
              param[2]
            ], OperateScriptAttributeDataMainService$Wonderjs.setScriptAttributeFieldDefaultValueAndValue, state);
}

function getScriptAllEventFunctionData(script, state) {
  var scriptRecord = state[/* scriptRecord */27];
  return ImmutableSparseMapService$WonderCommonlib.get(script, scriptRecord[/* scriptEventFunctionDataMap */5]);
}

function unsafeGetScriptAllEventFunctionData(script, state) {
  var scriptRecord = state[/* scriptRecord */27];
  return ImmutableSparseMapService$Wonderjs.unsafeGetAndCheck(script, scriptRecord[/* scriptEventFunctionDataMap */5]);
}

function setScriptAllEventFunctionData(script, allEventFunctionData, state) {
  var scriptRecord = state[/* scriptRecord */27];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* scriptRecord */27] = /* record */[
    /* index */scriptRecord[/* index */0],
    /* isScriptEventFunctionEnable */scriptRecord[/* isScriptEventFunctionEnable */1],
    /* disposedIndexArray */scriptRecord[/* disposedIndexArray */2],
    /* gameObjectMap */scriptRecord[/* gameObjectMap */3],
    /* isActiveMap */scriptRecord[/* isActiveMap */4],
    /* scriptEventFunctionDataMap */ImmutableSparseMapService$WonderCommonlib.set(script, allEventFunctionData, scriptRecord[/* scriptEventFunctionDataMap */5]),
    /* scriptAttributeMap */scriptRecord[/* scriptAttributeMap */6]
  ];
  return newrecord;
}

function getScriptAllAttributes(script, state) {
  var scriptRecord = state[/* scriptRecord */27];
  return ImmutableSparseMapService$WonderCommonlib.get(script, scriptRecord[/* scriptAttributeMap */6]);
}

function unsafeGetScriptAllAttributes(script, state) {
  var scriptRecord = state[/* scriptRecord */27];
  return ImmutableSparseMapService$Wonderjs.unsafeGetAndCheck(script, scriptRecord[/* scriptAttributeMap */6]);
}

function setScriptAllAttributes(script, allAttributes, state) {
  var scriptRecord = state[/* scriptRecord */27];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* scriptRecord */27] = /* record */[
    /* index */scriptRecord[/* index */0],
    /* isScriptEventFunctionEnable */scriptRecord[/* isScriptEventFunctionEnable */1],
    /* disposedIndexArray */scriptRecord[/* disposedIndexArray */2],
    /* gameObjectMap */scriptRecord[/* gameObjectMap */3],
    /* isActiveMap */scriptRecord[/* isActiveMap */4],
    /* scriptEventFunctionDataMap */scriptRecord[/* scriptEventFunctionDataMap */5],
    /* scriptAttributeMap */ImmutableSparseMapService$WonderCommonlib.set(script, allAttributes, scriptRecord[/* scriptAttributeMap */6])
  ];
  return newrecord;
}

function resetScriptAllAttributesFieldValue(allAttributes) {
  return ImmutableHashMapService$WonderCommonlib.map((function (attributes) {
                return ImmutableHashMapService$WonderCommonlib.map((function (scriptAttributeField) {
                              return /* record */[
                                      /* type_ */scriptAttributeField[/* type_ */0],
                                      /* defaultValue */scriptAttributeField[/* defaultValue */1],
                                      /* value */scriptAttributeField[/* defaultValue */1]
                                    ];
                            }), attributes);
              }), allAttributes);
}

var setScriptAttribute = addScriptAttribute;

export {
  _addScriptData ,
  _addScriptEventFunctionData ,
  _addScriptAttribute ,
  addEventFunctionDataMap ,
  addScriptEventFunctionData ,
  addAttributeMap ,
  addScriptAttribute ,
  _removeScriptData ,
  _removeScriptEventFunctionData ,
  _removeScriptAttribute ,
  removeScriptEventFunctionData ,
  removeScriptAttribute ,
  replaceScriptEventFunctionData ,
  replaceScriptAttribute ,
  getScriptEventFunctionDataEntries ,
  unsafeGetScriptEventFunctionDataEntries ,
  getScriptAttributeEntries ,
  unsafeGetScriptAttributeEntries ,
  getScriptAttribute ,
  unsafeGetScriptAttribute ,
  setScriptAttribute ,
  _setScriptAttributeFieldData ,
  setScriptAttributeFieldValue ,
  setScriptAttributeFieldDefaultValueAndValue ,
  getScriptAllEventFunctionData ,
  unsafeGetScriptAllEventFunctionData ,
  setScriptAllEventFunctionData ,
  getScriptAllAttributes ,
  unsafeGetScriptAllAttributes ,
  setScriptAllAttributes ,
  resetScriptAllAttributesFieldValue ,
  
}
/* OptionService-Wonderjs Not a pure module */
