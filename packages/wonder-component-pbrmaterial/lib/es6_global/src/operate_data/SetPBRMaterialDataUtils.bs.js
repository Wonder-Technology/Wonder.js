

import * as Log$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as Index$WonderComponentTypePbrmaterial from "../../../../../../node_modules/wonder-component-type-pbrmaterial/lib/es6_global/index.bs.js";
import * as OperateTypeArrayPBRMaterialUtils$WonderComponentPbrmaterial from "../utils/OperateTypeArrayPBRMaterialUtils.bs.js";

function setData(state, param, param$1, param$2) {
  var diffuseColors = state.diffuseColors;
  var speculars = state.speculars;
  if (param$1 === Index$WonderComponentTypePbrmaterial.dataName.diffuseColor) {
    OperateTypeArrayPBRMaterialUtils$WonderComponentPbrmaterial.setDiffuseColor(param, param$2, diffuseColors);
  } else if (param$1 === Index$WonderComponentTypePbrmaterial.dataName.specular) {
    OperateTypeArrayPBRMaterialUtils$WonderComponentPbrmaterial.setSpecular(param, param$2, speculars);
  } else {
    Exception$WonderCommonlib.throwErr(Log$WonderCommonlib.buildFatalMessage("setData", "unknown dataName:" + param$1, "", "", ""));
  }
  return state;
}

export {
  setData ,
  
}
/* No side effect */
