

import * as Contract$WonderLog from "./../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../state/main/data/StateDataMain.js";
import * as ArrayMapService$Wonderjs from "../../atom/ArrayMapService.js";
import * as IsDebugMainService$Wonderjs from "../../state/main/state/IsDebugMainService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

var addComponentToGameObjectMap = MutableSparseMapService$WonderCommonlib.set;

function addSharableComponentToGameObjectsMap(component, gameObjectUid, gameObjectsMap) {
  Contract$WonderLog.requireCheck((function (param) {
          return ArrayMapService$Wonderjs.checkDuplicate("sharable component only add to the same gameObject once", component, gameObjectUid, gameObjectsMap);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return ArrayMapService$Wonderjs.addValue(component, gameObjectUid, gameObjectsMap);
}

export {
  addComponentToGameObjectMap ,
  addSharableComponentToGameObjectsMap ,
  
}
/* Contract-WonderLog Not a pure module */
