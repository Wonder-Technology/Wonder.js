'use strict';

var Log$WonderCommonlib = require("wonder-commonlib/lib/js/src/log/Log.bs.js");
var Exception$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$WonderComponentTypePbrmaterial = require("wonder-component-type-pbrmaterial/lib/js/index.bs.js");
var OperateTypeArrayPBRMaterialUtils$WonderComponentWorkerUtils = require("wonder-component-worker-utils/lib/js/src/pbrmaterial/OperateTypeArrayPBRMaterialUtils.bs.js");

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

exports.getData = getData;
/* No side effect */
