

import * as Log$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as OptionSt$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as Exception$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as NumberUtils$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/NumberUtils.bs.js";
import * as Index$WonderComponentTypeArcballcameracontroller from "../../../../../../node_modules/wonder-component-type-arcballcameracontroller/lib/es6_global/index.bs.js";
import * as ConfigUtils$WonderComponentArcballcameracontroller from "../config/ConfigUtils.bs.js";
import * as DirtyArcballCameraControllerUtils$WonderComponentArcballcameracontroller from "../utils/DirtyArcballCameraControllerUtils.bs.js";
import * as OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller from "../utils/OperateArcballCameraControllerUtils.bs.js";

function _constrainTheta(isDebug, theta, thetaMargin) {
  return NumberUtils$WonderCommonlib.clamp(isDebug, theta, thetaMargin, Math.PI - thetaMargin);
}

function setData(state, cameraController, dataName, dataValue) {
  if (dataName === Index$WonderComponentTypeArcballcameracontroller.dataName.distance) {
    return DirtyArcballCameraControllerUtils$WonderComponentArcballcameracontroller.mark(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.setDistance(state, cameraController, NumberUtils$WonderCommonlib.bigThan(dataValue, OptionSt$WonderCommonlib.getExn(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.getMinDistance(state, cameraController)))), cameraController, true);
  }
  if (dataName === Index$WonderComponentTypeArcballcameracontroller.dataName.minDistance) {
    return DirtyArcballCameraControllerUtils$WonderComponentArcballcameracontroller.mark(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.setMinDistance(state, cameraController, dataValue), cameraController, true);
  }
  if (dataName === Index$WonderComponentTypeArcballcameracontroller.dataName.wheelSpeed) {
    return DirtyArcballCameraControllerUtils$WonderComponentArcballcameracontroller.mark(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.setWheelSpeed(state, cameraController, dataValue), cameraController, true);
  }
  if (dataName === Index$WonderComponentTypeArcballcameracontroller.dataName.phi) {
    return DirtyArcballCameraControllerUtils$WonderComponentArcballcameracontroller.mark(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.setPhi(state, cameraController, dataValue), cameraController, true);
  }
  if (dataName === Index$WonderComponentTypeArcballcameracontroller.dataName.theta) {
    return DirtyArcballCameraControllerUtils$WonderComponentArcballcameracontroller.mark(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.setTheta(state, cameraController, _constrainTheta(ConfigUtils$WonderComponentArcballcameracontroller.getIsDebug(state), dataValue, OptionSt$WonderCommonlib.getExn(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.getThetaMargin(state, cameraController)))), cameraController, true);
  }
  if (dataName !== Index$WonderComponentTypeArcballcameracontroller.dataName.thetaMargin) {
    if (dataName === Index$WonderComponentTypeArcballcameracontroller.dataName.target) {
      return DirtyArcballCameraControllerUtils$WonderComponentArcballcameracontroller.mark(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.setTarget(state, cameraController, dataValue), cameraController, true);
    } else if (dataName === Index$WonderComponentTypeArcballcameracontroller.dataName.moveSpeedX) {
      return DirtyArcballCameraControllerUtils$WonderComponentArcballcameracontroller.mark(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.setMoveSpeedX(state, cameraController, dataValue), cameraController, true);
    } else if (dataName === Index$WonderComponentTypeArcballcameracontroller.dataName.moveSpeedY) {
      return DirtyArcballCameraControllerUtils$WonderComponentArcballcameracontroller.mark(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.setMoveSpeedY(state, cameraController, dataValue), cameraController, true);
    } else if (dataName === Index$WonderComponentTypeArcballcameracontroller.dataName.rotateSpeed) {
      return DirtyArcballCameraControllerUtils$WonderComponentArcballcameracontroller.mark(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.setRotateSpeed(state, cameraController, dataValue), cameraController, true);
    } else if (dataName === Index$WonderComponentTypeArcballcameracontroller.dataName.dirty) {
      return DirtyArcballCameraControllerUtils$WonderComponentArcballcameracontroller.mark(state, cameraController, dataValue);
    } else {
      return Exception$WonderCommonlib.throwErr(Log$WonderCommonlib.buildFatalMessage("setData", "unknown dataName:" + dataName, "", "", ""));
    }
  }
  var state$1 = OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.setThetaMargin(state, cameraController, dataValue);
  return DirtyArcballCameraControllerUtils$WonderComponentArcballcameracontroller.mark(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.setTheta(state$1, cameraController, _constrainTheta(ConfigUtils$WonderComponentArcballcameracontroller.getIsDebug(state$1), OptionSt$WonderCommonlib.getExn(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.getTheta(state$1, cameraController)), dataValue)), cameraController, true);
}

export {
  _constrainTheta ,
  setData ,
  
}
/* No side effect */
