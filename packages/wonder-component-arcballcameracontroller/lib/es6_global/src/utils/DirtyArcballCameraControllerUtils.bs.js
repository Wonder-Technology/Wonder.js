

import * as Log$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Contract$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/contract/Contract.bs.js";
import * as MutableSparseMap$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as ImmutableSparseMap$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/sparse_map/ImmutableSparseMap.bs.js";
import * as ConfigUtils$WonderComponentArcballcameracontroller from "../config/ConfigUtils.bs.js";

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

export {
  mark ,
  isDirty ,
  
}
/* No side effect */
