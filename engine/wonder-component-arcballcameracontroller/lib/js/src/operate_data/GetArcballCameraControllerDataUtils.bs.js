'use strict';

var Log$WonderCommonlib = require("wonder-commonlib/lib/js/src/log/Log.bs.js");
var OptionSt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/OptionSt.bs.js");
var Exception$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$WonderComponentTypeArcballcameracontroller = require("wonder-component-type-arcballcameracontroller/lib/js/index.bs.js");
var DirtyArcballCameraControllerUtils$WonderComponentArcballcameracontroller = require("../utils/DirtyArcballCameraControllerUtils.bs.js");
var OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller = require("../utils/OperateArcballCameraControllerUtils.bs.js");

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

exports.getData = getData;
/* No side effect */
