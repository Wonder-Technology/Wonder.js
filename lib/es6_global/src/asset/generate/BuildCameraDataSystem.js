

import * as Log$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as GenerateCommon$Wonderjs from "./GenerateCommon.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as ActiveBasicCameraViewService$Wonderjs from "../../service/record/main/basic_camera_view/ActiveBasicCameraViewService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as FrustumPerspectiveCameraProjectionService$Wonderjs from "../../service/record/main/perspective_camera_projection/FrustumPerspectiveCameraProjectionService.js";

function buildBasicCameraViewData(cameraDataMap, state) {
  var basicCameraViewRecord = state[/* basicCameraViewRecord */13];
  Contract$WonderLog.requireCheck((function (param) {
          return GenerateCommon$Wonderjs.checkShouldHasNoSlot(cameraDataMap);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return Contract$WonderLog.ensureCheck((function (cameraDataArr) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("has at most one active", "not"), (function (param) {
                              return Contract$WonderLog.Operators[/* <= */11](cameraDataArr.filter((function (param) {
                                                return param[/* isActive */0] === true;
                                              })).length, 1);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), MutableSparseMapService$WonderCommonlib.reduceValid((function (cameraDataArr, basicCameraView) {
                    return ArrayService$Wonderjs.push(/* record */[/* isActive */ActiveBasicCameraViewService$Wonderjs.isActive(basicCameraView, basicCameraViewRecord)], cameraDataArr);
                  }), /* array */[], cameraDataMap));
}

function _convertDegreeToRadians(angle) {
  return angle * Math.PI / 180;
}

function buildCameraProjectionData(cameraDataMap, state) {
  var perspectiveCameraProjectionRecord = state[/* perspectiveCameraProjectionRecord */14];
  Contract$WonderLog.requireCheck((function (param) {
          return GenerateCommon$Wonderjs.checkShouldHasNoSlot(cameraDataMap);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return MutableSparseMapService$WonderCommonlib.reduceValid((function (cameraDataArr, perspectiveCameraProjection) {
                return ArrayService$Wonderjs.push(/* record */[
                            /* type_ */"perspective",
                            /* perspective : record */[
                              /* near */FrustumPerspectiveCameraProjectionService$Wonderjs.unsafeGetNear(perspectiveCameraProjection, perspectiveCameraProjectionRecord),
                              /* far */FrustumPerspectiveCameraProjectionService$Wonderjs.getFar(perspectiveCameraProjection, perspectiveCameraProjectionRecord),
                              /* fovy */_convertDegreeToRadians(FrustumPerspectiveCameraProjectionService$Wonderjs.unsafeGetFovy(perspectiveCameraProjection, perspectiveCameraProjectionRecord)),
                              /* aspect */FrustumPerspectiveCameraProjectionService$Wonderjs.getAspect(perspectiveCameraProjection, perspectiveCameraProjectionRecord)
                            ]
                          ], cameraDataArr);
              }), /* array */[], cameraDataMap);
}

export {
  buildBasicCameraViewData ,
  _convertDegreeToRadians ,
  buildCameraProjectionData ,
  
}
/* Log-WonderLog Not a pure module */
