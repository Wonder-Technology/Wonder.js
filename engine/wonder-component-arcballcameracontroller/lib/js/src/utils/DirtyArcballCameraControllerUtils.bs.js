'use strict';

var Log$WonderCommonlib = require("wonder-commonlib/lib/js/src/log/Log.bs.js");
var Contract$WonderCommonlib = require("wonder-commonlib/lib/js/src/contract/Contract.bs.js");
var MutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var ImmutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");
var ConfigUtils$WonderComponentArcballcameracontroller = require("../config/ConfigUtils.bs.js");

function mark(state, cameraController, isDirty) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          gameObjectMap: state.gameObjectMap,
          dirtyMap: ImmutableSparseMap$WonderCommonlib.set(state.dirtyMap, cameraController, isDirty),
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
          gameObjectArcballCameraControllerMap: state.gameObjectArcballCameraControllerMap
        };
}

function isDirty(state, cameraController) {
  return MutableSparseMap$WonderCommonlib.unsafeGet(state.dirtyMap, cameraController) === Contract$WonderCommonlib.ensureCheck(true, (function (isDirty) {
                return Contract$WonderCommonlib.test(Log$WonderCommonlib.buildAssertMessage("return bool", "not"), (function (param) {
                              return Contract$WonderCommonlib.assertIsBool(isDirty);
                            }));
              }), ConfigUtils$WonderComponentArcballcameracontroller.getIsDebug(state));
}

exports.mark = mark;
exports.isDirty = isDirty;
/* No side effect */
