

import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../../../state/main/data/StateDataMain.js";
import * as ArrayMapService$Wonderjs from "../../../atom/ArrayMapService.js";
import * as IsDebugMainService$Wonderjs from "../../../state/main/state/IsDebugMainService.js";
import * as HashMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as DefaultTypeArrayValueService$Wonderjs from "../../../primitive/buffer/DefaultTypeArrayValueService.js";

function getShaderIndex(key, param) {
  var shaderIndexMap = param[/* shaderIndexMap */1];
  return HashMapService$WonderCommonlib.get(key, shaderIndexMap);
}

function setShaderIndex(key, shaderIndex, param) {
  var shaderIndexMap = param[/* shaderIndexMap */1];
  return HashMapService$WonderCommonlib.set(key, shaderIndex, shaderIndexMap);
}

function genereateShaderIndex(record) {
  var index = record[/* index */0];
  record[/* index */0] = index + 1 | 0;
  return Contract$WonderLog.ensureCheck((function (r) {
                var defaultShaderIndex = DefaultTypeArrayValueService$Wonderjs.getDefaultShaderIndex(/* () */0);
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("not equal default shader index:" + (String(defaultShaderIndex) + " "), "equal"), (function () {
                              return Contract$WonderLog.Operators[/* <>= */3](r, defaultShaderIndex);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), index);
}

function useShaderIndex(shaderIndex, record) {
  var usedShaderIndexArray = record[/* usedShaderIndexArray */3];
  ArrayService$Wonderjs.push(shaderIndex, usedShaderIndexArray);
  return record;
}

function _hasMaterialUseShader(shaderIndex, _, materialsMap) {
  var match = SparseMapService$WonderCommonlib.get(shaderIndex, materialsMap);
  if (match !== undefined) {
    return match.length > 0;
  } else {
    return false;
  }
}

function unuseShaderIndex(shaderIndex, material, record) {
  var materialsMap = record[/* materialsMap */2];
  var usedShaderIndexArray = record[/* usedShaderIndexArray */3];
  ArrayMapService$Wonderjs.removeValue(shaderIndex, material, materialsMap);
  var match = _hasMaterialUseShader(shaderIndex, material, materialsMap);
  if (match) {
    return record;
  } else {
    var index = usedShaderIndexArray.indexOf(shaderIndex);
    var match$1 = index === -1;
    if (match$1) {
      return record;
    } else {
      usedShaderIndexArray.splice(index, 1);
      return record;
    }
  }
}

function clearShaderIndexMap(shaderRecord) {
  shaderRecord[/* shaderIndexMap */1] = HashMapService$WonderCommonlib.createEmpty(/* () */0);
  return shaderRecord;
}

export {
  getShaderIndex ,
  setShaderIndex ,
  genereateShaderIndex ,
  useShaderIndex ,
  _hasMaterialUseShader ,
  unuseShaderIndex ,
  clearShaderIndexMap ,
  
}
/* Log-WonderLog Not a pure module */
