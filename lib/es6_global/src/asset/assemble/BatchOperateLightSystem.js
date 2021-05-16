

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as SceneAPI$Wonderjs from "../../api/SceneAPI.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as OperatePointLightService$Wonderjs from "../../service/record/main/light/point/OperatePointLightService.js";
import * as RecordPointLightMainService$Wonderjs from "../../service/state/main/light/point/RecordPointLightMainService.js";
import * as OperateDirectionLightService$Wonderjs from "../../service/record/main/light/direction/OperateDirectionLightService.js";
import * as RecordDirectionLightMainService$Wonderjs from "../../service/state/main/light/direction/RecordDirectionLightMainService.js";

function batchSetDirectionLightData(param, directionLightArr, state) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, param, index) {
                var index$1 = Caml_array.caml_array_get(directionLightArr, index);
                var newrecord = Caml_array.caml_array_dup(state);
                newrecord[/* directionLightRecord */21] = OperateDirectionLightService$Wonderjs.setIntensity(index$1, param[/* intensity */1], OperateDirectionLightService$Wonderjs.setColor(index$1, param[/* color */0], RecordDirectionLightMainService$Wonderjs.getRecord(state)));
                return newrecord;
              }), state, param[/* directionLights */11]);
}

function batchSetPointLightData(param, pointLightArr, state) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, param, index) {
                var index$1 = Caml_array.caml_array_get(pointLightArr, index);
                var newrecord = Caml_array.caml_array_dup(state);
                newrecord[/* pointLightRecord */22] = OperatePointLightService$Wonderjs.setRange(index$1, param[/* range */5], OperatePointLightService$Wonderjs.setQuadratic(index$1, param[/* quadraticAttenuation */4], OperatePointLightService$Wonderjs.setLinear(index$1, param[/* linearAttenuation */3], OperatePointLightService$Wonderjs.setConstant(index$1, param[/* constantAttenuation */2], OperatePointLightService$Wonderjs.setIntensity(index$1, param[/* intensity */1], OperatePointLightService$Wonderjs.setColor(index$1, param[/* color */0], RecordPointLightMainService$Wonderjs.getRecord(state)))))));
                return newrecord;
              }), state, param[/* pointLights */12]);
}

function setAmbientLightData(param, state) {
  var optionalAmbientLight = param[/* scene */1][/* ambientLight */1];
  var match = OptionService$Wonderjs.isJsonSerializedValueNone(optionalAmbientLight);
  if (match) {
    return state;
  } else {
    var match$1 = OptionService$Wonderjs.unsafeGetJsonSerializedValue(optionalAmbientLight);
    return SceneAPI$Wonderjs.setAmbientLightColor(match$1[/* color */0], state);
  }
}

export {
  batchSetDirectionLightData ,
  batchSetPointLightData ,
  setAmbientLightData ,
  
}
/* SceneAPI-Wonderjs Not a pure module */
