'use strict';

var Log$WonderCommonlib = require("wonder-commonlib/lib/js/src/log/Log.bs.js");
var Exception$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$WonderComponentTypePbrmaterial = require("wonder-component-type-pbrmaterial/lib/js/index.bs.js");
var OperateTypeArrayPBRMaterialUtils$WonderComponentPbrmaterial = require("../utils/OperateTypeArrayPBRMaterialUtils.bs.js");

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

exports.setData = setData;
/* No side effect */
