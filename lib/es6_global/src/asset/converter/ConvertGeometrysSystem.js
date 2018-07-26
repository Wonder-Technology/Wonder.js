

import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as ConvertCommon$Wonderjs from "./ConvertCommon.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function _convertToGeometry(param) {
  var primitives = param[/* primitives */0];
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("not has texCoord_1", "has"), (function () {
                        var match = ConvertCommon$Wonderjs.getPrimitiveData(primitives);
                        return Contract$WonderLog.assertNotExist(match[/* attributes */0][/* texCoord_1 */3]);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var match = primitives.length > 1;
  if (match) {
    return undefined;
  } else {
    var match$1 = ConvertCommon$Wonderjs.getPrimitiveData(primitives);
    var attributes = match$1[/* attributes */0];
    return /* record */[
            /* position */attributes[/* position */0],
            /* normal */attributes[/* normal */1],
            /* texCoord */attributes[/* texCoord_0 */2],
            /* index */OptionService$Wonderjs.unsafeGet(match$1[/* indices */1])
          ];
  }
}

function convertToGeometrys(param) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (arr, mesh) {
                return ArrayService$Wonderjs.push(_convertToGeometry(mesh), arr);
              }), /* array */[], param[/* meshes */11]);
}

export {
  _convertToGeometry ,
  convertToGeometrys ,
  
}
/* Log-WonderLog Not a pure module */
