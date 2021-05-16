

import * as SceneAPI$Wonderjs from "../../api/SceneAPI.js";
import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as Caml_builtin_exceptions from "../../../../../node_modules/bs-platform/lib/es6/caml_builtin_exceptions.js";
import * as GenerateCommon$Wonderjs from "./GenerateCommon.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as OperatePointLightService$Wonderjs from "../../service/record/main/light/point/OperatePointLightService.js";
import * as RecordPointLightMainService$Wonderjs from "../../service/state/main/light/point/RecordPointLightMainService.js";
import * as OperateDirectionLightService$Wonderjs from "../../service/record/main/light/direction/OperateDirectionLightService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as RecordDirectionLightMainService$Wonderjs from "../../service/state/main/light/direction/RecordDirectionLightMainService.js";

function getAmbientLightIndex(lightDataArr) {
  return lightDataArr.length - 1 | 0;
}

function build(lightDataMap, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return GenerateCommon$Wonderjs.checkShouldHasNoSlot(lightDataMap);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var directionLightRecord = RecordDirectionLightMainService$Wonderjs.getRecord(state);
  var pointLightRecord = RecordPointLightMainService$Wonderjs.getRecord(state);
  return ArrayService$Wonderjs.push(/* record */[
              /* type_ */"ambient",
              /* color */SceneAPI$Wonderjs.getAmbientLightColor(state),
              /* intensity */undefined,
              /* constantAttenuation */undefined,
              /* linearAttenuation */undefined,
              /* quadraticAttenuation */undefined,
              /* range */undefined
            ], MutableSparseMapService$WonderCommonlib.reduceValid((function (lightDataArr, param) {
                    var light = param[1];
                    var type_ = param[0];
                    switch (type_) {
                      case "directional" : 
                          return ArrayService$Wonderjs.push(/* record */[
                                      /* type_ */type_,
                                      /* color */OperateDirectionLightService$Wonderjs.getColor(light, directionLightRecord),
                                      /* intensity */OperateDirectionLightService$Wonderjs.getIntensity(light, directionLightRecord),
                                      /* constantAttenuation */undefined,
                                      /* linearAttenuation */undefined,
                                      /* quadraticAttenuation */undefined,
                                      /* range */undefined
                                    ], lightDataArr);
                      case "point" : 
                          return ArrayService$Wonderjs.push(/* record */[
                                      /* type_ */type_,
                                      /* color */OperatePointLightService$Wonderjs.getColor(light, pointLightRecord),
                                      /* intensity */OperatePointLightService$Wonderjs.getIntensity(light, pointLightRecord),
                                      /* constantAttenuation */OperatePointLightService$Wonderjs.getConstant(light, pointLightRecord),
                                      /* linearAttenuation */OperatePointLightService$Wonderjs.getLinear(light, pointLightRecord),
                                      /* quadraticAttenuation */OperatePointLightService$Wonderjs.getQuadratic(light, pointLightRecord),
                                      /* range */OperatePointLightService$Wonderjs.getRange(light, pointLightRecord)
                                    ], lightDataArr);
                      default:
                        throw [
                              Caml_builtin_exceptions.match_failure,
                              /* tuple */[
                                "BuildLightDataSystem.re",
                                23,
                                9
                              ]
                            ];
                    }
                  }), /* array */[], lightDataMap));
}

export {
  getAmbientLightIndex ,
  build ,
  
}
/* SceneAPI-Wonderjs Not a pure module */
