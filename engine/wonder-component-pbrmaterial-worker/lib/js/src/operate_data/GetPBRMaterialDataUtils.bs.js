'use strict';

var Log$OrillusionCommonlib = require("orillusion-commonlib/lib/js/src/log/Log.bs.js");
var Exception$OrillusionCommonlib = require("orillusion-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$OrillusionComponentTypePbrmaterialWorker = require("orillusion-component-type-pbrmaterial-worker/lib/js/index.bs.js");
var OperateTypeArrayPBRMaterialUtils$OrillusionComponentWorkerUtils = require("orillusion-component-worker-utils/lib/js/src/pbrmaterial/OperateTypeArrayPBRMaterialUtils.bs.js");

function getData(param, material, dataName) {
  if (dataName === Index$OrillusionComponentTypePbrmaterialWorker.dataName.diffuseColor) {
    return OperateTypeArrayPBRMaterialUtils$OrillusionComponentWorkerUtils.getDiffuseColor(material, param.diffuseColors);
  } else if (dataName === Index$OrillusionComponentTypePbrmaterialWorker.dataName.specular) {
    return OperateTypeArrayPBRMaterialUtils$OrillusionComponentWorkerUtils.getSpecular(material, param.speculars);
  } else {
    return Exception$OrillusionCommonlib.throwErr(Log$OrillusionCommonlib.buildFatalMessage("getData", "unknown dataName:" + dataName, "", "", ""));
  }
}

exports.getData = getData;
/* No side effect */
