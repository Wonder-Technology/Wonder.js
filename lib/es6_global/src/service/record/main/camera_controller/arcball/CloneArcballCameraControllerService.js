

import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as CreateArcballCameraControllerService$Wonderjs from "./CreateArcballCameraControllerService.js";
import * as OperateArcballCameraControllerService$Wonderjs from "./OperateArcballCameraControllerService.js";

function handleCloneComponent(sourceComponent, countRangeArr, record) {
  var distance = OperateArcballCameraControllerService$Wonderjs.unsafeGetDistance(sourceComponent, record);
  var minDistance = OperateArcballCameraControllerService$Wonderjs.unsafeGetMinDistance(sourceComponent, record);
  var phi = OperateArcballCameraControllerService$Wonderjs.unsafeGetPhi(sourceComponent, record);
  var theta = OperateArcballCameraControllerService$Wonderjs.unsafeGetTheta(sourceComponent, record);
  var thetaMargin = OperateArcballCameraControllerService$Wonderjs.unsafeGetThetaMargin(sourceComponent, record);
  var target = OperateArcballCameraControllerService$Wonderjs.unsafeGetTarget(sourceComponent, record);
  var moveSpeedX = OperateArcballCameraControllerService$Wonderjs.unsafeGetMoveSpeedX(sourceComponent, record);
  var moveSpeedY = OperateArcballCameraControllerService$Wonderjs.unsafeGetMoveSpeedY(sourceComponent, record);
  var rotateSpeed = OperateArcballCameraControllerService$Wonderjs.unsafeGetRotateSpeed(sourceComponent, record);
  var wheelSpeed = OperateArcballCameraControllerService$Wonderjs.unsafeGetWheelSpeed(sourceComponent, record);
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                var match = CreateArcballCameraControllerService$Wonderjs.create(param[0]);
                var index = match[1];
                return /* tuple */[
                        OperateArcballCameraControllerService$Wonderjs.setWheelSpeed(index, wheelSpeed, OperateArcballCameraControllerService$Wonderjs.setRotateSpeed(index, rotateSpeed, OperateArcballCameraControllerService$Wonderjs.setMoveSpeedY(index, moveSpeedY, OperateArcballCameraControllerService$Wonderjs.setMoveSpeedX(index, moveSpeedX, OperateArcballCameraControllerService$Wonderjs.setTarget(index, target, OperateArcballCameraControllerService$Wonderjs.setThetaMargin(index, thetaMargin, OperateArcballCameraControllerService$Wonderjs.setTheta(index, theta, OperateArcballCameraControllerService$Wonderjs.setPhi(index, phi, OperateArcballCameraControllerService$Wonderjs.setMinDistance(index, minDistance, OperateArcballCameraControllerService$Wonderjs.setDistance(index, distance, match[0])))))))))),
                        ArrayService$Wonderjs.push(index, param[1])
                      ];
              }), /* tuple */[
              record,
              /* array */[]
            ], countRangeArr);
}

export {
  handleCloneComponent ,
  
}
/* ArrayService-Wonderjs Not a pure module */
