'use strict';

var TypeArrayUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/TypeArrayUtils.bs.js");
var BufferDirectionLightUtils$WonderComponentWorkerUtils = require("wonder-component-worker-utils/lib/js/src/directionlight/BufferDirectionLightUtils.bs.js");

function setColor(index, data, typeArr) {
  return TypeArrayUtils$WonderCommonlib.setFloat3(BufferDirectionLightUtils$WonderComponentWorkerUtils.getColorIndex(index), data, typeArr);
}

function setIntensity(index, data, typeArr) {
  return TypeArrayUtils$WonderCommonlib.setFloat1(BufferDirectionLightUtils$WonderComponentWorkerUtils.getIntensityIndex(index), data, typeArr);
}

exports.setColor = setColor;
exports.setIntensity = setIntensity;
/* No side effect */
