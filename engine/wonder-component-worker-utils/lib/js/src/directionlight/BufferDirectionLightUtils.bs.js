'use strict';

var SharedArrayBufferUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/SharedArrayBufferUtils.bs.js");

function getColorsSize(param) {
  return 3;
}

function getIntensitiesSize(param) {
  return 1;
}

function getColorIndex(index) {
  return Math.imul(index, 3);
}

function getIntensityIndex(index) {
  return (index << 0);
}

function getColorsOffset(count) {
  return 0;
}

function getColorsLength(count) {
  return Math.imul(count, 3);
}

function getIntensitiesOffset(count) {
  return 0 + Math.imul(Math.imul(count, 3), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getIntensitiesLength(count) {
  return (count << 0);
}

function getTotalByteLength(count) {
  return (Math.imul(count, Float32Array.BYTES_PER_ELEMENT) << 2);
}

function createBuffer(count) {
  return SharedArrayBufferUtils$WonderCommonlib.newSharedArrayBuffer(getTotalByteLength(count));
}

exports.getColorsSize = getColorsSize;
exports.getIntensitiesSize = getIntensitiesSize;
exports.getColorIndex = getColorIndex;
exports.getIntensityIndex = getIntensityIndex;
exports.getColorsOffset = getColorsOffset;
exports.getColorsLength = getColorsLength;
exports.getIntensitiesOffset = getIntensitiesOffset;
exports.getIntensitiesLength = getIntensitiesLength;
exports.getTotalByteLength = getTotalByteLength;
exports.createBuffer = createBuffer;
/* No side effect */
