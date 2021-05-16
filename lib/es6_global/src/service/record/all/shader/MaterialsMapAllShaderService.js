

import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../../state/main/data/StateDataMain.js";
import * as ArrayMapService$Wonderjs from "../../../atom/ArrayMapService.js";
import * as IsDebugMainService$Wonderjs from "../../../state/main/state/IsDebugMainService.js";

function addMaterialWithoutDuplicate(shaderIndex, material, record) {
  var materialsMap = record[/* materialsMap */3];
  ArrayMapService$Wonderjs.addValueWithoutDuplicate(shaderIndex, material, materialsMap);
  return Contract$WonderLog.ensureCheck((function (param) {
                var materialsMap = param[/* materialsMap */3];
                return ArrayMapService$Wonderjs.checkDuplicate("material should only use the same shaderIndex once", shaderIndex, material, materialsMap);
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), record);
}

export {
  addMaterialWithoutDuplicate ,
  
}
/* Contract-WonderLog Not a pure module */
