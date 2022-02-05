'use strict';

var ImmutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");

function getDistance(state, cameraController) {
  return ImmutableSparseMap$WonderCommonlib.get(state.distanceMap, cameraController);
}

function setDistance(state, cameraController, distance) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          gameObjectMap: state.gameObjectMap,
          dirtyMap: state.dirtyMap,
          distanceMap: ImmutableSparseMap$WonderCommonlib.set(state.distanceMap, cameraController, distance),
          minDistanceMap: state.minDistanceMap,
          phiMap: state.phiMap,
          thetaMap: state.thetaMap,
          thetaMarginMap: state.thetaMarginMap,
          targetMap: state.targetMap,
          moveSpeedXMap: state.moveSpeedXMap,
          moveSpeedYMap: state.moveSpeedYMap,
          rotateSpeedMap: state.rotateSpeedMap,
          wheelSpeedMap: state.wheelSpeedMap,
          gameObjectArcballCameraControllerMap: state.gameObjectArcballCameraControllerMap
        };
}

function getMinDistance(state, cameraController) {
  return ImmutableSparseMap$WonderCommonlib.get(state.minDistanceMap, cameraController);
}

function setMinDistance(state, cameraController, minDistance) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          gameObjectMap: state.gameObjectMap,
          dirtyMap: state.dirtyMap,
          distanceMap: state.distanceMap,
          minDistanceMap: ImmutableSparseMap$WonderCommonlib.set(state.minDistanceMap, cameraController, minDistance),
          phiMap: state.phiMap,
          thetaMap: state.thetaMap,
          thetaMarginMap: state.thetaMarginMap,
          targetMap: state.targetMap,
          moveSpeedXMap: state.moveSpeedXMap,
          moveSpeedYMap: state.moveSpeedYMap,
          rotateSpeedMap: state.rotateSpeedMap,
          wheelSpeedMap: state.wheelSpeedMap,
          gameObjectArcballCameraControllerMap: state.gameObjectArcballCameraControllerMap
        };
}

function getWheelSpeed(state, cameraController) {
  return ImmutableSparseMap$WonderCommonlib.get(state.wheelSpeedMap, cameraController);
}

function setWheelSpeed(state, cameraController, wheelSpeed) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          gameObjectMap: state.gameObjectMap,
          dirtyMap: state.dirtyMap,
          distanceMap: state.distanceMap,
          minDistanceMap: state.minDistanceMap,
          phiMap: state.phiMap,
          thetaMap: state.thetaMap,
          thetaMarginMap: state.thetaMarginMap,
          targetMap: state.targetMap,
          moveSpeedXMap: state.moveSpeedXMap,
          moveSpeedYMap: state.moveSpeedYMap,
          rotateSpeedMap: state.rotateSpeedMap,
          wheelSpeedMap: ImmutableSparseMap$WonderCommonlib.set(state.wheelSpeedMap, cameraController, wheelSpeed),
          gameObjectArcballCameraControllerMap: state.gameObjectArcballCameraControllerMap
        };
}

function getPhi(state, cameraController) {
  return ImmutableSparseMap$WonderCommonlib.get(state.phiMap, cameraController);
}

function setPhi(state, cameraController, phi) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          gameObjectMap: state.gameObjectMap,
          dirtyMap: state.dirtyMap,
          distanceMap: state.distanceMap,
          minDistanceMap: state.minDistanceMap,
          phiMap: ImmutableSparseMap$WonderCommonlib.set(state.phiMap, cameraController, phi),
          thetaMap: state.thetaMap,
          thetaMarginMap: state.thetaMarginMap,
          targetMap: state.targetMap,
          moveSpeedXMap: state.moveSpeedXMap,
          moveSpeedYMap: state.moveSpeedYMap,
          rotateSpeedMap: state.rotateSpeedMap,
          wheelSpeedMap: state.wheelSpeedMap,
          gameObjectArcballCameraControllerMap: state.gameObjectArcballCameraControllerMap
        };
}

function getTheta(state, cameraController) {
  return ImmutableSparseMap$WonderCommonlib.get(state.thetaMap, cameraController);
}

function setTheta(state, cameraController, theta) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          gameObjectMap: state.gameObjectMap,
          dirtyMap: state.dirtyMap,
          distanceMap: state.distanceMap,
          minDistanceMap: state.minDistanceMap,
          phiMap: state.phiMap,
          thetaMap: ImmutableSparseMap$WonderCommonlib.set(state.thetaMap, cameraController, theta),
          thetaMarginMap: state.thetaMarginMap,
          targetMap: state.targetMap,
          moveSpeedXMap: state.moveSpeedXMap,
          moveSpeedYMap: state.moveSpeedYMap,
          rotateSpeedMap: state.rotateSpeedMap,
          wheelSpeedMap: state.wheelSpeedMap,
          gameObjectArcballCameraControllerMap: state.gameObjectArcballCameraControllerMap
        };
}

function getThetaMargin(state, cameraController) {
  return ImmutableSparseMap$WonderCommonlib.get(state.thetaMarginMap, cameraController);
}

function setThetaMargin(state, cameraController, thetaMargin) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          gameObjectMap: state.gameObjectMap,
          dirtyMap: state.dirtyMap,
          distanceMap: state.distanceMap,
          minDistanceMap: state.minDistanceMap,
          phiMap: state.phiMap,
          thetaMap: state.thetaMap,
          thetaMarginMap: ImmutableSparseMap$WonderCommonlib.set(state.thetaMarginMap, cameraController, thetaMargin),
          targetMap: state.targetMap,
          moveSpeedXMap: state.moveSpeedXMap,
          moveSpeedYMap: state.moveSpeedYMap,
          rotateSpeedMap: state.rotateSpeedMap,
          wheelSpeedMap: state.wheelSpeedMap,
          gameObjectArcballCameraControllerMap: state.gameObjectArcballCameraControllerMap
        };
}

function getTarget(state, cameraController) {
  return ImmutableSparseMap$WonderCommonlib.get(state.targetMap, cameraController);
}

function setTarget(state, cameraController, target) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          gameObjectMap: state.gameObjectMap,
          dirtyMap: state.dirtyMap,
          distanceMap: state.distanceMap,
          minDistanceMap: state.minDistanceMap,
          phiMap: state.phiMap,
          thetaMap: state.thetaMap,
          thetaMarginMap: state.thetaMarginMap,
          targetMap: ImmutableSparseMap$WonderCommonlib.set(state.targetMap, cameraController, target),
          moveSpeedXMap: state.moveSpeedXMap,
          moveSpeedYMap: state.moveSpeedYMap,
          rotateSpeedMap: state.rotateSpeedMap,
          wheelSpeedMap: state.wheelSpeedMap,
          gameObjectArcballCameraControllerMap: state.gameObjectArcballCameraControllerMap
        };
}

function getMoveSpeedX(state, cameraController) {
  return ImmutableSparseMap$WonderCommonlib.get(state.moveSpeedXMap, cameraController);
}

function setMoveSpeedX(state, cameraController, moveSppedX) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          gameObjectMap: state.gameObjectMap,
          dirtyMap: state.dirtyMap,
          distanceMap: state.distanceMap,
          minDistanceMap: state.minDistanceMap,
          phiMap: state.phiMap,
          thetaMap: state.thetaMap,
          thetaMarginMap: state.thetaMarginMap,
          targetMap: state.targetMap,
          moveSpeedXMap: ImmutableSparseMap$WonderCommonlib.set(state.moveSpeedXMap, cameraController, moveSppedX),
          moveSpeedYMap: state.moveSpeedYMap,
          rotateSpeedMap: state.rotateSpeedMap,
          wheelSpeedMap: state.wheelSpeedMap,
          gameObjectArcballCameraControllerMap: state.gameObjectArcballCameraControllerMap
        };
}

function getMoveSpeedY(state, cameraController) {
  return ImmutableSparseMap$WonderCommonlib.get(state.moveSpeedYMap, cameraController);
}

function setMoveSpeedY(state, cameraController, moveSppedY) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          gameObjectMap: state.gameObjectMap,
          dirtyMap: state.dirtyMap,
          distanceMap: state.distanceMap,
          minDistanceMap: state.minDistanceMap,
          phiMap: state.phiMap,
          thetaMap: state.thetaMap,
          thetaMarginMap: state.thetaMarginMap,
          targetMap: state.targetMap,
          moveSpeedXMap: state.moveSpeedXMap,
          moveSpeedYMap: ImmutableSparseMap$WonderCommonlib.set(state.moveSpeedYMap, cameraController, moveSppedY),
          rotateSpeedMap: state.rotateSpeedMap,
          wheelSpeedMap: state.wheelSpeedMap,
          gameObjectArcballCameraControllerMap: state.gameObjectArcballCameraControllerMap
        };
}

function getRotateSpeed(state, cameraController) {
  return ImmutableSparseMap$WonderCommonlib.get(state.rotateSpeedMap, cameraController);
}

function setRotateSpeed(state, cameraController, rotateSpeed) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          gameObjectMap: state.gameObjectMap,
          dirtyMap: state.dirtyMap,
          distanceMap: state.distanceMap,
          minDistanceMap: state.minDistanceMap,
          phiMap: state.phiMap,
          thetaMap: state.thetaMap,
          thetaMarginMap: state.thetaMarginMap,
          targetMap: state.targetMap,
          moveSpeedXMap: state.moveSpeedXMap,
          moveSpeedYMap: state.moveSpeedYMap,
          rotateSpeedMap: ImmutableSparseMap$WonderCommonlib.set(state.rotateSpeedMap, cameraController, rotateSpeed),
          wheelSpeedMap: state.wheelSpeedMap,
          gameObjectArcballCameraControllerMap: state.gameObjectArcballCameraControllerMap
        };
}

exports.getDistance = getDistance;
exports.setDistance = setDistance;
exports.getMinDistance = getMinDistance;
exports.setMinDistance = setMinDistance;
exports.getWheelSpeed = getWheelSpeed;
exports.setWheelSpeed = setWheelSpeed;
exports.getPhi = getPhi;
exports.setPhi = setPhi;
exports.getTheta = getTheta;
exports.setTheta = setTheta;
exports.getThetaMargin = getThetaMargin;
exports.setThetaMargin = setThetaMargin;
exports.getTarget = getTarget;
exports.setTarget = setTarget;
exports.getMoveSpeedX = getMoveSpeedX;
exports.setMoveSpeedX = setMoveSpeedX;
exports.getMoveSpeedY = getMoveSpeedY;
exports.setMoveSpeedY = setMoveSpeedY;
exports.getRotateSpeed = getRotateSpeed;
exports.setRotateSpeed = setRotateSpeed;
/* No side effect */
