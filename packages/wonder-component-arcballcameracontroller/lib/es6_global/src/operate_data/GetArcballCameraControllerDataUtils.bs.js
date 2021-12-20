

import * as Log$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as OptionSt$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as Exception$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as Index$WonderComponentTypeArcballcameracontroller from "../../../../../../node_modules/wonder-component-type-arcballcameracontroller/lib/es6_global/index.bs.js";
import * as DirtyArcballCameraControllerUtils$WonderComponentArcballcameracontroller from "../utils/DirtyArcballCameraControllerUtils.bs.js";
import * as OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller from "../utils/OperateArcballCameraControllerUtils.bs.js";

function getData(state, cameraController, dataName) {
  if (dataName === Index$WonderComponentTypeArcballcameracontroller.dataName.distance) {
    return OptionSt$WonderCommonlib.toNullable(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.getDistance(state, cameraController));
  } else if (dataName === Index$WonderComponentTypeArcballcameracontroller.dataName.minDistance) {
    return OptionSt$WonderCommonlib.toNullable(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.getMinDistance(state, cameraController));
  } else if (dataName === Index$WonderComponentTypeArcballcameracontroller.dataName.phi) {
    return OptionSt$WonderCommonlib.toNullable(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.getPhi(state, cameraController));
  } else if (dataName === Index$WonderComponentTypeArcballcameracontroller.dataName.theta) {
    return OptionSt$WonderCommonlib.toNullable(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.getTheta(state, cameraController));
  } else if (dataName === Index$WonderComponentTypeArcballcameracontroller.dataName.thetaMargin) {
    return OptionSt$WonderCommonlib.toNullable(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.getThetaMargin(state, cameraController));
  } else if (dataName === Index$WonderComponentTypeArcballcameracontroller.dataName.target) {
    return OptionSt$WonderCommonlib.toNullable(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.getTarget(state, cameraController));
  } else if (dataName === Index$WonderComponentTypeArcballcameracontroller.dataName.moveSpeedX) {
    return OptionSt$WonderCommonlib.toNullable(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.getMoveSpeedX(state, cameraController));
  } else if (dataName === Index$WonderComponentTypeArcballcameracontroller.dataName.moveSpeedY) {
    return OptionSt$WonderCommonlib.toNullable(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.getMoveSpeedY(state, cameraController));
  } else if (dataName === Index$WonderComponentTypeArcballcameracontroller.dataName.wheelSpeed) {
    return OptionSt$WonderCommonlib.toNullable(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.getWheelSpeed(state, cameraController));
  } else if (dataName === Index$WonderComponentTypeArcballcameracontroller.dataName.rotateSpeed) {
    return OptionSt$WonderCommonlib.toNullable(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.getRotateSpeed(state, cameraController));
  } else if (dataName === Index$WonderComponentTypeArcballcameracontroller.dataName.dirty) {
    return OptionSt$WonderCommonlib.toNullable(DirtyArcballCameraControllerUtils$WonderComponentArcballcameracontroller.isDirty(state, cameraController));
  } else {
    return Exception$WonderCommonlib.throwErr(Log$WonderCommonlib.buildFatalMessage("getData", "unknown dataName:" + dataName, "", "", ""));
  }
}

export {
  getData ,
  
}
/* No side effect */
