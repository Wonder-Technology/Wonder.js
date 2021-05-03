

import * as Contract$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as GenerateCommon$Wonderjs from "./GenerateCommon.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as OperateArcballCameraControllerService$Wonderjs from "../../service/record/main/camera_controller/arcball/OperateArcballCameraControllerService.js";
import * as EventArcballCameraControllerMainService$Wonderjs from "../../service/state/main/camera_controller/arcball/EventArcballCameraControllerMainService.js";

function build(arcballCameraControllerDataMap, state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */25];
  Contract$WonderLog.requireCheck((function (param) {
          return GenerateCommon$Wonderjs.checkShouldHasNoSlot(arcballCameraControllerDataMap);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return MutableSparseMapService$WonderCommonlib.reduceValid((function (arcballCameraControllerDataArr, cameraController) {
                return ArrayService$Wonderjs.push(/* record */[
                            /* distance */OperateArcballCameraControllerService$Wonderjs.unsafeGetDistance(cameraController, arcballCameraControllerRecord),
                            /* minDistance */OperateArcballCameraControllerService$Wonderjs.unsafeGetMinDistance(cameraController, arcballCameraControllerRecord),
                            /* phi */OperateArcballCameraControllerService$Wonderjs.unsafeGetPhi(cameraController, arcballCameraControllerRecord),
                            /* theta */OperateArcballCameraControllerService$Wonderjs.unsafeGetTheta(cameraController, arcballCameraControllerRecord),
                            /* thetaMargin */OperateArcballCameraControllerService$Wonderjs.unsafeGetThetaMargin(cameraController, arcballCameraControllerRecord),
                            /* target */OperateArcballCameraControllerService$Wonderjs.unsafeGetTarget(cameraController, arcballCameraControllerRecord),
                            /* moveSpeedX */OperateArcballCameraControllerService$Wonderjs.unsafeGetMoveSpeedX(cameraController, arcballCameraControllerRecord),
                            /* moveSpeedY */OperateArcballCameraControllerService$Wonderjs.unsafeGetMoveSpeedY(cameraController, arcballCameraControllerRecord),
                            /* rotateSpeed */OperateArcballCameraControllerService$Wonderjs.unsafeGetRotateSpeed(cameraController, arcballCameraControllerRecord),
                            /* wheelSpeed */OperateArcballCameraControllerService$Wonderjs.unsafeGetWheelSpeed(cameraController, arcballCameraControllerRecord),
                            /* isBindEvent */EventArcballCameraControllerMainService$Wonderjs.isBindEvent(cameraController, state)
                          ], arcballCameraControllerDataArr);
              }), /* array */[], arcballCameraControllerDataMap);
}

export {
  build ,
  
}
/* Contract-WonderLog Not a pure module */
