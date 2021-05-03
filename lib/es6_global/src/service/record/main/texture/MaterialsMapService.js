

import * as Log$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../../state/main/data/StateDataMain.js";
import * as ArrayMapService$Wonderjs from "../../../atom/ArrayMapService.js";
import * as IsDebugMainService$Wonderjs from "../../../state/main/state/IsDebugMainService.js";
import * as MutableSparseMapService$Wonderjs from "../../../atom/MutableSparseMapService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

var getMaterialDataArr = MutableSparseMapService$WonderCommonlib.get;

function unsafeGetMaterialDataArr(texture, materialsMap) {
  return Contract$WonderLog.ensureCheck((function (materialData) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("texture\'s materialData exist", "not"), (function (param) {
                              return Contract$WonderLog.assertNullableExist(materialData);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), MutableSparseMapService$WonderCommonlib.unsafeGet(texture, materialsMap));
}

function addMaterial(param, texture, materialsMap) {
  return ArrayMapService$Wonderjs.addValue(texture, /* tuple */[
              param[0],
              param[1]
            ], materialsMap);
}

function removeMaterial(param, texture, materialsMap) {
  var materialType = param[1];
  var material = param[0];
  var match = MutableSparseMapService$Wonderjs.fastGet(texture, materialsMap);
  if (match[0]) {
    return MutableSparseMapService$WonderCommonlib.set(texture, match[1].filter((function (param) {
                      if (param[1] !== materialType) {
                        return true;
                      } else {
                        return param[0] !== material;
                      }
                    })), materialsMap);
  } else {
    return materialsMap;
  }
}

var clearMaterial = MutableSparseMapService$WonderCommonlib.deleteVal;

export {
  getMaterialDataArr ,
  unsafeGetMaterialDataArr ,
  addMaterial ,
  removeMaterial ,
  clearMaterial ,
  
}
/* Log-WonderLog Not a pure module */
