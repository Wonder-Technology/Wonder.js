'use strict';

var GPUDetectTool$Wonderjs = require("../../../service/gpu/GPUDetectTool.js");

function preparePrecision(state) {
  return GPUDetectTool$Wonderjs.setPrecision(/* HIGHP */0, state);
}

exports.preparePrecision = preparePrecision;
/* No side effect */
