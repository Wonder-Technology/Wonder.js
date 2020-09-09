'use strict';

var PassCPRepo$Wonderjs = require("../../../../repo/pipeline/PassCPRepo.bs.js");

function increaseSampleAccumulation(param) {
  return PassCPRepo$Wonderjs.setTotalSampleCount(PassCPRepo$Wonderjs.getTotalSampleCount(undefined) + PassCPRepo$Wonderjs.getSampleCount(undefined) | 0);
}

function getResolutionBufferDataSize(resolutionBufferData) {
  return resolutionBufferData.byteLength;
}

exports.increaseSampleAccumulation = increaseSampleAccumulation;
exports.getResolutionBufferDataSize = getResolutionBufferDataSize;
/* PassCPRepo-Wonderjs Not a pure module */
