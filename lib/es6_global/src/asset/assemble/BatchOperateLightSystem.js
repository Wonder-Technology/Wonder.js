

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as SceneAPI$Wonderjs from "../../api/SceneAPI.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as MappedIndexService$Wonderjs from "../../service/primitive/MappedIndexService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as IndexPointLightService$Wonderjs from "../../service/record/main/light/point/IndexPointLightService.js";
import * as OperatePointLightService$Wonderjs from "../../service/record/main/light/point/OperatePointLightService.js";
import * as IndexDirectionLightService$Wonderjs from "../../service/record/main/light/direction/IndexDirectionLightService.js";
import * as OperateDirectionLightService$Wonderjs from "../../service/record/main/light/direction/OperateDirectionLightService.js";

function batchSetDirectionLightData(param, directionLightArr, state) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, param, index) {
                var directionLightRecord = state[/* directionLightRecord */20];
                var mappedIndex = MappedIndexService$Wonderjs.getMappedIndex(Caml_array.caml_array_get(directionLightArr, index), IndexDirectionLightService$Wonderjs.getMappedIndexMap(directionLightRecord));
                var newrecord = Caml_array.caml_array_dup(state);
                newrecord[/* directionLightRecord */20] = OperateDirectionLightService$Wonderjs.setIntensity(mappedIndex, param[/* intensity */1], OperateDirectionLightService$Wonderjs.setColor(mappedIndex, param[/* color */0], directionLightRecord));
                return newrecord;
              }), state, param[/* directionLights */10]);
}

function batchSetPointLightData(param, pointLightArr, state) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, param, index) {
                var pointLightRecord = state[/* pointLightRecord */21];
                var mappedIndex = MappedIndexService$Wonderjs.getMappedIndex(Caml_array.caml_array_get(pointLightArr, index), IndexPointLightService$Wonderjs.getMappedIndexMap(pointLightRecord));
                var newrecord = Caml_array.caml_array_dup(state);
                newrecord[/* pointLightRecord */21] = OperatePointLightService$Wonderjs.setRange(mappedIndex, param[/* range */5], OperatePointLightService$Wonderjs.setQuadratic(mappedIndex, param[/* quadraticAttenuation */4], OperatePointLightService$Wonderjs.setLinear(mappedIndex, param[/* linearAttenuation */3], OperatePointLightService$Wonderjs.setConstant(mappedIndex, param[/* constantAttenuation */2], OperatePointLightService$Wonderjs.setIntensity(mappedIndex, param[/* intensity */1], OperatePointLightService$Wonderjs.setColor(mappedIndex, param[/* color */0], pointLightRecord))))));
                return newrecord;
              }), state, param[/* pointLights */11]);
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
