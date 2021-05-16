

import * as Js_option from "../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_option from "../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as SerializeService$Wonderjs from "../../service/atom/SerializeService.js";
import * as ImmutableHashMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableHashMapService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";

var _convertEventFunctionToStr = SerializeService$Wonderjs.serializeFunction;

function _convertEventFunctionDataMapToStr(eventDataMap) {
  return JSON.stringify(ImmutableHashMapService$WonderCommonlib.mapValid((function (param) {
                    return /* record */[
                            /* init */Js_option.andThen(SerializeService$Wonderjs.serializeFunction, param[/* init */0]),
                            /* update */Js_option.andThen(SerializeService$Wonderjs.serializeFunction, param[/* update */1]),
                            /* dispose */Js_option.andThen(SerializeService$Wonderjs.serializeFunction, param[/* dispose */2])
                          ];
                  }), eventDataMap));
}

function _buildEmptyMapStr(param) {
  return "{}";
}

function unsafeGetEventFunctionDataMapStr(script, state) {
  var scriptRecord = state[/* scriptRecord */27];
  var match = ImmutableSparseMapService$WonderCommonlib.get(script, scriptRecord[/* scriptEventFunctionDataMap */5]);
  if (match !== undefined) {
    return _convertEventFunctionDataMapToStr(Caml_option.valFromOption(match));
  } else {
    return "{}";
  }
}

function _convertAttributeMapToStr(attributeMap) {
  return JSON.stringify(attributeMap);
}

function unsafeGetAttributeMapStr(script, state) {
  var scriptRecord = state[/* scriptRecord */27];
  var match = ImmutableSparseMapService$WonderCommonlib.get(script, scriptRecord[/* scriptAttributeMap */6]);
  if (match !== undefined) {
    return JSON.stringify(Caml_option.valFromOption(match));
  } else {
    return "{}";
  }
}

function convertEventFunctionDataMapJsonToRecord(eventFunctionDataMapJson) {
  return ImmutableHashMapService$WonderCommonlib.map((function (param) {
                var dispose = param[/* dispose */2];
                var update = param[/* update */1];
                var init = param[/* init */0];
                var match = OptionService$Wonderjs.isJsonSerializedValueNone(init);
                var match$1 = OptionService$Wonderjs.isJsonSerializedValueNone(update);
                var match$2 = OptionService$Wonderjs.isJsonSerializedValueNone(dispose);
                return /* record */[
                        /* init */match ? undefined : Caml_option.some(SerializeService$Wonderjs.deserializeFunction(init)),
                        /* update */match$1 ? undefined : Caml_option.some(SerializeService$Wonderjs.deserializeFunction(update)),
                        /* dispose */match$2 ? undefined : Caml_option.some(SerializeService$Wonderjs.deserializeFunction(dispose))
                      ];
              }), eventFunctionDataMapJson);
}

function convertAttributeMapJsonToRecord(attributeMapJson) {
  return attributeMapJson;
}

export {
  _convertEventFunctionToStr ,
  _convertEventFunctionDataMapToStr ,
  _buildEmptyMapStr ,
  unsafeGetEventFunctionDataMapStr ,
  _convertAttributeMapToStr ,
  unsafeGetAttributeMapStr ,
  convertEventFunctionDataMapJsonToRecord ,
  convertAttributeMapJsonToRecord ,
  
}
/* OptionService-Wonderjs Not a pure module */
