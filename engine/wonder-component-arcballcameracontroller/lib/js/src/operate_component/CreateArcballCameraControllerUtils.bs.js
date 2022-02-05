'use strict';

var IndexComponentUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/IndexComponentUtils.bs.js");
var DirtyArcballCameraControllerUtils$WonderComponentArcballcameracontroller = require("../utils/DirtyArcballCameraControllerUtils.bs.js");
var OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller = require("../utils/OperateArcballCameraControllerUtils.bs.js");

function _setDefaultValue(state, cameraController) {
  return OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.setWheelSpeed(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.setRotateSpeed(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.setMoveSpeedY(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.setMoveSpeedX(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.setTarget(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.setThetaMargin(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.setTheta(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.setPhi(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.setMinDistance(OperateArcballCameraControllerUtils$WonderComponentArcballcameracontroller.setDistance(state, cameraController, 10), cameraController, 0.05), cameraController, Math.PI / 2), cameraController, Math.PI / 2), cameraController, 0.05), cameraController, [
                              0,
                              0,
                              0
                            ]), cameraController, 1), cameraController, 1), cameraController, 1), cameraController, 1);
}

function create(state) {
  var index = state.maxIndex;
  var newIndex = IndexComponentUtils$WonderCommonlib.generateIndex(index);
  var state$1 = _setDefaultValue(DirtyArcballCameraControllerUtils$WonderComponentArcballcameracontroller.mark(state, index, true), index);
  return [
          {
            config: state$1.config,
            maxIndex: newIndex,
            gameObjectMap: state$1.gameObjectMap,
            dirtyMap: state$1.dirtyMap,
            distanceMap: state$1.distanceMap,
            minDistanceMap: state$1.minDistanceMap,
            phiMap: state$1.phiMap,
            thetaMap: state$1.thetaMap,
            thetaMarginMap: state$1.thetaMarginMap,
            targetMap: state$1.targetMap,
            moveSpeedXMap: state$1.moveSpeedXMap,
            moveSpeedYMap: state$1.moveSpeedYMap,
            rotateSpeedMap: state$1.rotateSpeedMap,
            wheelSpeedMap: state$1.wheelSpeedMap,
            gameObjectArcballCameraControllerMap: state$1.gameObjectArcballCameraControllerMap
          },
          index
        ];
}

exports._setDefaultValue = _setDefaultValue;
exports.create = create;
/* No side effect */
