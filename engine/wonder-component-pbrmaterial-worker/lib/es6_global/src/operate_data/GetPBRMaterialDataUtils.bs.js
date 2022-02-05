

import * as Log$OrillusionCommonlib from "../../../../../../node_modules/orillusion-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$OrillusionCommonlib from "../../../../../../node_modules/orillusion-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as Index$OrillusionComponentTypePbrmaterialWorker from "../../../../../../node_modules/orillusion-component-type-pbrmaterial-worker/lib/es6_global/index.bs.js";
import * as OperateTypeArrayPBRMaterialUtils$OrillusionComponentWorkerUtils from "../../../../../../node_modules/orillusion-component-worker-utils/lib/es6_global/src/pbrmaterial/OperateTypeArrayPBRMaterialUtils.bs.js";

function getData(param, material, dataName) {
  if (dataName === Index$OrillusionComponentTypePbrmaterialWorker.dataName.diffuseColor) {
    return OperateTypeArrayPBRMaterialUtils$OrillusionComponentWorkerUtils.getDiffuseColor(material, param.diffuseColors);
  } else if (dataName === Index$OrillusionComponentTypePbrmaterialWorker.dataName.specular) {
    return OperateTypeArrayPBRMaterialUtils$OrillusionComponentWorkerUtils.getSpecular(material, param.speculars);
  } else {
    return Exception$OrillusionCommonlib.throwErr(Log$OrillusionCommonlib.buildFatalMessage("getData", "unknown dataName:" + dataName, "", "", ""));
  }
}

export {
  getData ,
  
}
/* No side effect */
