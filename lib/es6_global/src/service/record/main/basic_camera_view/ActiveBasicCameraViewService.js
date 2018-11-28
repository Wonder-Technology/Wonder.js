

import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../../../state/main/data/StateDataMain.js";
import * as SparseMapService$Wonderjs from "../../../atom/SparseMapService.js";
import * as IsDebugMainService$Wonderjs from "../../../state/main/state/IsDebugMainService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function isActive(cameraView, param) {
  var match = SparseMapService$WonderCommonlib.get(cameraView, param[/* isActiveMap */1]);
  if (match !== undefined) {
    return match;
  } else {
    return false;
  }
}

function _setAllNotActive(isActiveMap) {
  return SparseMapService$Wonderjs.mapValid((function () {
                return false;
              }), isActiveMap);
}

function active(cameraView, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* isActiveMap */SparseMapService$WonderCommonlib.set(cameraView, true, SparseMapService$Wonderjs.mapValid((function () {
                      return false;
                    }), record[/* isActiveMap */1])),
          /* gameObjectMap */record[/* gameObjectMap */2],
          /* disposedIndexArray */record[/* disposedIndexArray */3]
        ];
}

function unactive(cameraView, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* isActiveMap */SparseMapService$WonderCommonlib.set(cameraView, false, record[/* isActiveMap */1]),
          /* gameObjectMap */record[/* gameObjectMap */2],
          /* disposedIndexArray */record[/* disposedIndexArray */3]
        ];
}

function setActive(cameraView, active, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* isActiveMap */SparseMapService$WonderCommonlib.set(cameraView, active, record[/* isActiveMap */1]),
          /* gameObjectMap */record[/* gameObjectMap */2],
          /* disposedIndexArray */record[/* disposedIndexArray */3]
        ];
}

function _getActiveCameraViews(record) {
  return Contract$WonderLog.ensureCheck((function (r) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("only has one active cameraView at most", "not"), (function () {
                              return Contract$WonderLog.Operators[/* <= */11](SparseMapService$Wonderjs.length(r), 1);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), SparseMapService$Wonderjs.reducei((function (arr, isActive, cameraView) {
                    var match = isActive === true;
                    if (match) {
                      return ArrayService$Wonderjs.push(cameraView, arr);
                    } else {
                      return arr;
                    }
                  }), /* array */[], record[/* isActiveMap */1]));
}

function getActiveCameraView(record) {
  var arr = _getActiveCameraViews(record);
  if (arr.length === 0) {
    return undefined;
  } else {
    return ArrayService$Wonderjs.unsafeGetFirst(arr);
  }
}

export {
  isActive ,
  _setAllNotActive ,
  active ,
  unactive ,
  setActive ,
  _getActiveCameraViews ,
  getActiveCameraView ,
  
}
/* Log-WonderLog Not a pure module */
