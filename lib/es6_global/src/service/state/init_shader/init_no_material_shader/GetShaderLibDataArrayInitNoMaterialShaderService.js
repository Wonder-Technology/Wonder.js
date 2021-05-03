

import * as Log$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../../main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function _findFirstShaderData(shaderLibName, shaderLibs) {
  return ArrayService$Wonderjs.unsafeFindFirst(shaderLibs, shaderLibName, (function (item) {
                return item[/* name */0] === shaderLibName;
              }));
}

function _getShaderLibDataArrByGroup(groups, name, shaderLibs, resultDataArr) {
  return resultDataArr.concat(ArrayService$Wonderjs.unsafeFindFirst(groups, name, (function (item) {
                        return item[/* name */0] === name;
                      }))[/* value */1].map((function (name) {
                    return _findFirstShaderData(name, shaderLibs);
                  })));
}

function getShaderLibDataArrByType(param, param$1, resultDataArr) {
  var shaderLibs = param$1[0];
  var type_ = param[0];
  if (type_ === "group") {
    return _getShaderLibDataArrByGroup(param[1], param[2], shaderLibs, resultDataArr);
  } else {
    var partial_arg = "shaderLibs";
    Log$WonderLog.debugJson((function (param) {
            return Log$WonderLog.buildDebugJsonMessage(partial_arg, shaderLibs, param);
          }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_getShaderLibDataArrByType", "unknown type_:" + (String(type_) + ""), "", "", ""));
  }
}

function getShaderLibDataArr(param, state) {
  var shaderLibs = param[2];
  var groups = param[0][/* groups */2];
  return ArrayService$WonderCommonlib.reduceOneParam((function (resultDataArr, param) {
                var name = param[/* name */1];
                var type_ = param[/* type_ */0];
                var match = OptionService$Wonderjs.isJsonSerializedValueNone(type_);
                if (match) {
                  return ArrayService$Wonderjs.push(_findFirstShaderData(name, shaderLibs), resultDataArr);
                } else {
                  return getShaderLibDataArrByType(/* tuple */[
                              OptionService$Wonderjs.unsafeGetJsonSerializedValue(type_),
                              groups,
                              name
                            ], /* tuple */[
                              shaderLibs,
                              state
                            ], resultDataArr);
                }
              }), ArrayService$WonderCommonlib.createEmpty(/* () */0), param[1]);
}

export {
  _findFirstShaderData ,
  _getShaderLibDataArrByGroup ,
  getShaderLibDataArrByType ,
  getShaderLibDataArr ,
  
}
/* Log-WonderLog Not a pure module */
