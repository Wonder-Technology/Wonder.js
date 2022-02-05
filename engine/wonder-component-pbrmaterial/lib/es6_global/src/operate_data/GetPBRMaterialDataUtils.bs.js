

import * as Log$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as Index$WonderComponentTypePbrmaterial from "../../../../../../node_modules/wonder-component-type-pbrmaterial/lib/es6_global/index.bs.js";
import * as OperateTypeArrayPBRMaterialUtils$WonderComponentWorkerUtils from "../../../../../../node_modules/wonder-component-worker-utils/lib/es6_global/src/pbrmaterial/OperateTypeArrayPBRMaterialUtils.bs.js";

function getData(param, param$1, param$2) {
  var diffuseColors = param.diffuseColors;
  var speculars = param.speculars;
  if (param$2 === Index$WonderComponentTypePbrmaterial.dataName.diffuseColor) {
    return OperateTypeArrayPBRMaterialUtils$WonderComponentWorkerUtils.getDiffuseColor(param$1, diffuseColors);
  } else if (param$2 === Index$WonderComponentTypePbrmaterial.dataName.specular) {
    return OperateTypeArrayPBRMaterialUtils$WonderComponentWorkerUtils.getSpecular(param$1, speculars);
  } else {
    return Exception$WonderCommonlib.throwErr(Log$WonderCommonlib.buildFatalMessage("getData", "unknown dataName:" + param$2, "", "", ""));
  }
}

export {
  getData ,
  
}
/* No side effect */
