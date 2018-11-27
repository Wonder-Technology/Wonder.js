

import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as GenerateCommon$Wonderjs from "./GenerateCommon.js";
import * as SparseMapService$Wonderjs from "../../service/atom/SparseMapService.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as OperateMeshRendererMainService$Wonderjs from "../../service/state/main/meshRenderer/OperateMeshRendererMainService.js";

function build(meshRendererDataMap, state) {
  Contract$WonderLog.requireCheck((function () {
          return GenerateCommon$Wonderjs.checkShouldHasNoSlot(meshRendererDataMap);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return SparseMapService$Wonderjs.reduceValid((function (meshRendererDataArr, meshRenderer) {
                return ArrayService$Wonderjs.push(/* record */[/* drawMode */OperateMeshRendererMainService$Wonderjs.getDrawMode(meshRenderer, state)], meshRendererDataArr);
              }), /* array */[], meshRendererDataMap);
}

export {
  build ,
  
}
/* Contract-WonderLog Not a pure module */
