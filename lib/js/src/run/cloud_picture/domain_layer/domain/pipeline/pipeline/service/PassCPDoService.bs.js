'use strict';

var PassCPRepo$Wonderjs = require("../../../../repo/pipeline/PassCPRepo.bs.js");

function getCommonDataBufferSize(commonDataBufferData) {
  return commonDataBufferData.byteLength;
}

var setSampleCount = PassCPRepo$Wonderjs.setSampleCount;

exports.getCommonDataBufferSize = getCommonDataBufferSize;
exports.setSampleCount = setSampleCount;
/* PassCPRepo-Wonderjs Not a pure module */
