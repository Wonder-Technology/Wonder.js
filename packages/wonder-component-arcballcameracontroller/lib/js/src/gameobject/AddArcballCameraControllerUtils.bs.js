'use strict';

var ImmutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");

function add(state, gameObject, cameraController) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          gameObjectMap: ImmutableSparseMap$WonderCommonlib.set(state.gameObjectMap, cameraController, gameObject),
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
          wheelSpeedMap: state.wheelSpeedMap,
          gameObjectArcballCameraControllerMap: ImmutableSparseMap$WonderCommonlib.set(state.gameObjectArcballCameraControllerMap, gameObject, cameraController)
        };
}

exports.add = add;
/* No side effect */
