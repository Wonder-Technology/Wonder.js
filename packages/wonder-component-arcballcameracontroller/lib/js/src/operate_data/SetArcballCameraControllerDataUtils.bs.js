'use strict';

var Log$WonderCommonlib = require("wonder-commonlib/lib/js/src/log/Log.bs.js");
var OptionSt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/OptionSt.bs.js");
var Exception$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/Exception.bs.js");
var NumberUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/NumberUtils.bs.js");
var Index$WonderComponentTypeArcballcameracontroller = require("wonder-component-type-arcballcameracontroller/lib/js/index.bs.js");
var ConfigUtils$WonderComponentArcballcameracontroller = require("../config/ConfigUtils.bs.js");
var DirtyArcballCameraControllerUtils$WonderComponentArcballcameracontroller = require("../utils/DirtyArcballCameraControllerUtils.bs.js");
var OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller = require("../utils/OperateArcballCameraControllerUtils.bs.js");

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

exports._constrainTheta = _constrainTheta;
exports.setData = setData;
/* No side effect */
