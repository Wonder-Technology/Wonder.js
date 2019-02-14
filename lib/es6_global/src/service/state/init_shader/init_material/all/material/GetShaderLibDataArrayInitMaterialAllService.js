

import * as Caml_array from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as ArrayService$Wonderjs from "../../../../../atom/ArrayService.js";
import * as OptionService$Wonderjs from "../../../../../atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../../../../main/data/StateDataMain.js";
import * as JobConfigService$Wonderjs from "../../../../../primitive/JobConfigService.js";
import * as IsDebugMainService$Wonderjs from "../../../../main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GetDataRenderConfigService$Wonderjs from "../../../../../record/all/renderConfig/GetDataRenderConfigService.js";

function _findFirstShaderData(shaderLibName, shaderLibs) {
  return ArrayService$Wonderjs.unsafeFindFirst(shaderLibs, shaderLibName, (function (item) {
                return item[/* name */0] === shaderLibName;
              }));
}

function _getMaterialShaderLibDataArrByGroup(groups, name, shaderLibs, resultDataArr) {
  return resultDataArr.concat(ArrayService$Wonderjs.unsafeFindFirst(groups, name, (function (item) {
                        return item[/* name */0] === name;
                      }))[/* value */1].map((function (name) {
                    return _findFirstShaderData(name, shaderLibs);
                  })));
}

function handleUnknownNameWhenGetMaterialShaderLibDataArrByStaticBranch(name, staticBranchs) {
  var partial_arg = "staticBranchs";
  Log$WonderLog.debugJson((function (param) {
          return Log$WonderLog.buildDebugJsonMessage(partial_arg, staticBranchs, param);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_getMaterialShaderLibDataArrByStaticBranch", "unknown name:" + (String(name) + ""), "", "", ""));
}

function getMaterialShaderLibDataArrByStaticBranchInstance(param, param$1, resultDataArr) {
  var value = param$1[1];
  return ArrayService$Wonderjs.push(_findFirstShaderData(param[0] ? (
                    param[1] ? Caml_array.caml_array_get(value, 1) : Caml_array.caml_array_get(value, 2)
                  ) : Caml_array.caml_array_get(value, 0), param$1[0]), resultDataArr);
}

function getMaterialShaderLibDataArrByDynamicBranch(param, param$1, isPassFunc, resultDataArr) {
  var name = param[1];
  var dynamicBranchData = JobConfigService$Wonderjs.unsafeFindFirst(param$1[0], name, (function (item) {
          return JobConfigService$Wonderjs.filterTargetName(item[/* name */0], name);
        }));
  var match = isPassFunc(param[0], dynamicBranchData[/* condition */1], param$1[2]);
  var dynamicBranchShaderLibNameOption = match ? GetDataRenderConfigService$Wonderjs.getPass(dynamicBranchData) : GetDataRenderConfigService$Wonderjs.getFail(dynamicBranchData);
  var match$1 = OptionService$Wonderjs.isJsonSerializedValueNone(dynamicBranchShaderLibNameOption);
  if (match$1) {
    return resultDataArr;
  } else {
    return ArrayService$Wonderjs.push(_findFirstShaderData(OptionService$Wonderjs.unsafeGetJsonSerializedValue(dynamicBranchShaderLibNameOption), param$1[1]), resultDataArr);
  }
}

function getMaterialShaderLibDataArrByType(param, param$1, param$2, resultDataArr) {
  var shaderLibs = param$1[0];
  var name = param[3];
  var type_ = param[1];
  switch (type_) {
    case "dynamic_branch" : 
        return getMaterialShaderLibDataArrByDynamicBranch(/* tuple */[
                    param[0],
                    name
                  ], /* tuple */[
                    param$1[2],
                    shaderLibs,
                    param$1[3]
                  ], param$2[1], resultDataArr);
    case "group" : 
        return _getMaterialShaderLibDataArrByGroup(param[2], name, shaderLibs, resultDataArr);
    case "static_branch" : 
        return param$2[0](/* tuple */[
                    name,
                    param[4],
                    param[5]
                  ], /* tuple */[
                    param$1[1],
                    shaderLibs
                  ], resultDataArr);
    default:
      var partial_arg = "shaderLibs";
      Log$WonderLog.debugJson((function (param) {
              return Log$WonderLog.buildDebugJsonMessage(partial_arg, shaderLibs, param);
            }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_getMaterialShaderLibDataArrByType", "unknown type_:" + (String(type_) + ""), "", "", ""));
  }
}

function getMaterialShaderLibDataArr(param, param$1, param$2, state) {
  var isPassFunc = param$2[1];
  var getMaterialShaderLibDataArrByStaticBranchFunc = param$2[0];
  var shaderLibs = param$1[2];
  var match = param$1[0];
  var groups = match[/* groups */2];
  var dynamicBranchs = match[/* dynamicBranchs */1];
  var staticBranchs = match[/* staticBranchs */0];
  var isSupportInstance = param[2];
  var isSourceInstance = param[1];
  var materialIndex = param[0];
  return ArrayService$WonderCommonlib.reduceOneParam((function (resultDataArr, param) {
                var name = param[/* name */1];
                var type_ = param[/* type_ */0];
                var match = OptionService$Wonderjs.isJsonSerializedValueNone(type_);
                if (match) {
                  return ArrayService$Wonderjs.push(_findFirstShaderData(name, shaderLibs), resultDataArr);
                } else {
                  return getMaterialShaderLibDataArrByType(/* tuple */[
                              materialIndex,
                              OptionService$Wonderjs.unsafeGetJsonSerializedValue(type_),
                              groups,
                              name,
                              isSourceInstance,
                              isSupportInstance
                            ], /* tuple */[
                              shaderLibs,
                              staticBranchs,
                              dynamicBranchs,
                              state
                            ], /* tuple */[
                              getMaterialShaderLibDataArrByStaticBranchFunc,
                              isPassFunc
                            ], resultDataArr);
                }
              }), ArrayService$WonderCommonlib.createEmpty(/* () */0), param$1[1]);
}

export {
  _findFirstShaderData ,
  _getMaterialShaderLibDataArrByGroup ,
  handleUnknownNameWhenGetMaterialShaderLibDataArrByStaticBranch ,
  getMaterialShaderLibDataArrByStaticBranchInstance ,
  getMaterialShaderLibDataArrByDynamicBranch ,
  getMaterialShaderLibDataArrByType ,
  getMaterialShaderLibDataArr ,
  
}
/* Log-WonderLog Not a pure module */
