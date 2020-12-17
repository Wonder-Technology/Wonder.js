'use strict';

var PassCPRepo$Wonderjs = require("../../../../repo/pipeline/PassCPRepo.bs.js");

var setSampleCount = PassCPRepo$Wonderjs.setSampleCount;

function getCommonBufferDataSize(commonBufferData) {
  return commonBufferData.byteLength;
}

function getResolutionBufferDataSize(resolutionBufferData) {
  return resolutionBufferData.byteLength;
}

exports.setSampleCount = setSampleCount;
exports.getCommonBufferDataSize = getCommonBufferDataSize;
exports.getResolutionBufferDataSize = getResolutionBufferDataSize;
/* PassCPRepo-Wonderjs Not a pure module */
