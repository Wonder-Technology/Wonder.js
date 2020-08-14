

import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as GenerateCommon$Wonderjs from "./GenerateCommon.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as OperateFlyCameraControllerService$Wonderjs from "../../service/record/main/camera_controller/fly/OperateFlyCameraControllerService.js";
import * as EventFlyCameraControllerMainService$Wonderjs from "../../service/state/main/camera_controller/fly/EventFlyCameraControllerMainService.js";

function build(flyCameraControllerDataMap, state) {
  var flyCameraControllerRecord = state[/* flyCameraControllerRecord */26];
  Contract$WonderLog.requireCheck((function (param) {
          return GenerateCommon$Wonderjs.checkShouldHasNoSlot(flyCameraControllerDataMap);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return MutableSparseMapService$WonderCommonlib.reduceValid((function (flyCameraControllerDataArr, cameraController) {
                return ArrayService$Wonderjs.push(/* record */[
                            /* moveSpeed */OperateFlyCameraControllerService$Wonderjs.unsafeGetMoveSpeed(cameraController, flyCameraControllerRecord),
                            /* rotateSpeed */OperateFlyCameraControllerService$Wonderjs.unsafeGetRotateSpeed(cameraController, flyCameraControllerRecord),
                            /* wheelSpeed */OperateFlyCameraControllerService$Wonderjs.unsafeGetWheelSpeed(cameraController, flyCameraControllerRecord),
                            /* isBindEvent */EventFlyCameraControllerMainService$Wonderjs.isBindEvent(cameraController, state)
                          ], flyCameraControllerDataArr);
              }), /* array */[], flyCameraControllerDataMap);
}

export {
  build ,
  
}
/* Contract-WonderLog Not a pure module */
