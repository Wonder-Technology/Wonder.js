

import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as ConvertCommon$Wonderjs from "./ConvertCommon.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

var _buildDefaultName = ConvertCommon$Wonderjs.buildDefaultGeometryName;

function _convertToGeometry(mesh, index) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("not has texCoord_1", "has"), (function (param) {
                        var match = !ArrayService$Wonderjs.isNotValid(mesh);
                        if (match) {
                          var match$1 = ConvertCommon$Wonderjs.getPrimitiveData(mesh[/* primitives */0]);
                          return Contract$WonderLog.assertNotExist(match$1[/* attributes */0][/* texCoord_1 */3]);
                        } else {
                          return Contract$WonderLog.assertPass(/* () */0);
                        }
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var match = ArrayService$Wonderjs.isNotValid(mesh);
  if (match) {
    return undefined;
  } else {
    var name = mesh[/* name */1];
    var match$1 = ConvertCommon$Wonderjs.getPrimitiveData(mesh[/* primitives */0]);
    var attributes = match$1[/* attributes */0];
    return /* record */[
            /* name */name !== undefined ? name : ConvertCommon$Wonderjs.buildDefaultGeometryName(index),
            /* position */attributes[/* position */0],
            /* normal */attributes[/* normal */1],
            /* texCoord */attributes[/* texCoord_0 */2],
            /* index */OptionService$Wonderjs.unsafeGet(match$1[/* indices */1])
          ];
  }
}

function convertToGeometrys(param) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (arr, mesh, index) {
                return ArrayService$Wonderjs.push(_convertToGeometry(mesh, index), arr);
              }), /* array */[], param[/* meshes */11]);
}

export {
  _buildDefaultName ,
  _convertToGeometry ,
  convertToGeometrys ,
  
}
/* Log-WonderLog Not a pure module */
