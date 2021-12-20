'use strict';

var TypeArrayUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/TypeArrayUtils.bs.js");
var BufferDirectionLightUtils$WonderComponentWorkerUtils = require("./BufferDirectionLightUtils.bs.js");

function getColor(index, typeArr) {
  return TypeArrayUtils$WonderCommonlib.getFloat3Tuple(BufferDirectionLightUtils$WonderComponentWorkerUtils.getColorIndex(index), typeArr);
}

function getIntensity(index, typeArr) {
  return TypeArrayUtils$WonderCommonlib.getFloat1(BufferDirectionLightUtils$WonderComponentWorkerUtils.getIntensityIndex(index), typeArr);
}

exports.getColor = getColor;
exports.getIntensity = getIntensity;
/* No side effect */
