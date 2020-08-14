

import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../../state/main/data/StateDataMain.js";
import * as ArrayMapService$Wonderjs from "../../../atom/ArrayMapService.js";
import * as IsDebugMainService$Wonderjs from "../../../state/main/state/IsDebugMainService.js";
import * as DefaultTypeArrayValueService$Wonderjs from "../../../primitive/buffer/DefaultTypeArrayValueService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as HandleUniformShaderCachableService$Wonderjs from "../sender/uniform/HandleUniformShaderCachableService.js";
import * as HandleUniformShaderNoCachableService$Wonderjs from "../sender/uniform/HandleUniformShaderNoCachableService.js";
import * as HandleUniformShaderCachableFunctionService$Wonderjs from "../sender/uniform/HandleUniformShaderCachableFunctionService.js";

function genereateShaderIndex(record) {
  var index = record[/* index */0];
  record[/* index */0] = index + 1 | 0;
  return Contract$WonderLog.ensureCheck((function (r) {
                var defaultShaderIndex = DefaultTypeArrayValueService$Wonderjs.getDefaultShaderIndex(/* () */0);
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("not equal default shader index:" + (String(defaultShaderIndex) + " "), "equal"), (function (param) {
                              return Contract$WonderLog.Operators[/* <>= */3](r, defaultShaderIndex);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), index);
}

function _hasMaterialUseShader(shaderIndex, material, materialsMap) {
  var match = MutableSparseMapService$WonderCommonlib.get(shaderIndex, materialsMap);
  if (match !== undefined) {
    return match.length > 0;
  } else {
    return false;
  }
}

function _removeShaderIndexUsedInSendUniformShaderDataJob(shaderIndex, glslSenderRecord) {
  return HandleUniformShaderNoCachableService$Wonderjs.removeData(shaderIndex, HandleUniformShaderCachableService$Wonderjs.removeData(shaderIndex, HandleUniformShaderCachableFunctionService$Wonderjs.removeData(shaderIndex, glslSenderRecord)));
}

function removeShaderIndexFromMaterial(shaderIndex, material, shaderRecord, glslSenderRecord) {
  var materialsMap = shaderRecord[/* materialsMap */3];
  ArrayMapService$Wonderjs.removeValue(shaderIndex, material, materialsMap);
  var match = _hasMaterialUseShader(shaderIndex, material, materialsMap);
  if (match) {
    return /* tuple */[
            shaderRecord,
            glslSenderRecord
          ];
  } else {
    return /* tuple */[
            shaderRecord,
            _removeShaderIndexUsedInSendUniformShaderDataJob(shaderIndex, glslSenderRecord)
          ];
  }
}

function isDefaultShaderIndex(shaderIndex) {
  return shaderIndex === DefaultTypeArrayValueService$Wonderjs.getDefaultShaderIndex(/* () */0);
}

export {
  genereateShaderIndex ,
  _hasMaterialUseShader ,
  _removeShaderIndexUsedInSendUniformShaderDataJob ,
  removeShaderIndexFromMaterial ,
  isDefaultShaderIndex ,
  
}
/* Log-WonderLog Not a pure module */
