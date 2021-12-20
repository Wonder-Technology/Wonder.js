'use strict';

var SharedArrayBufferUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/SharedArrayBufferUtils.bs.js");

function getDiffuseColorsSize(param) {
  return 3;
}

function getDiffuseColorsLength(count) {
  return Math.imul(count, 3);
}

function getDiffuseColorsOffset(count) {
  return 0;
}

function getSpecularsSize(param) {
  return 1;
}

function getSpecularsLength(count) {
  return (count << 0);
}

function getSpecularsOffset(count) {
  return 0 + Math.imul(Math.imul(count, 3), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getSpecularColorsSize(param) {
  return 3;
}

function getSpecularColorsLength(count) {
  return Math.imul(count, 3);
}

function getSpecularColorsOffset(count) {
  return getSpecularsOffset(count) + Math.imul((count << 0), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getRoughnessesSize(param) {
  return 1;
}

function getRoughnessesLength(count) {
  return (count << 0);
}

function getRoughnessesOffset(count) {
  return getSpecularColorsOffset(count) + Math.imul(Math.imul(count, 3), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getMetalnessesSize(param) {
  return 1;
}

function getMetalnessesLength(count) {
  return (count << 0);
}

function getMetalnessesOffset(count) {
  return getRoughnessesOffset(count) + Math.imul((count << 0), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getTransmissionsSize(param) {
  return 1;
}

function getTransmissionsLength(count) {
  return (count << 0);
}

function getTransmissionsOffset(count) {
  return getMetalnessesOffset(count) + Math.imul((count << 0), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getIORsSize(param) {
  return 1;
}

function getIORsLength(count) {
  return (count << 0);
}

function getIORsOffset(count) {
  return getTransmissionsOffset(count) + Math.imul((count << 0), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getDiffuseColorIndex(index) {
  return Math.imul(index, 3);
}

function getSpecularIndex(index) {
  return index;
}

function getSpecularColorIndex(index) {
  return Math.imul(index, 3);
}

function getRoughnessIndex(index) {
  return (index << 0);
}

function getMetalnessIndex(index) {
  return (index << 0);
}

function getTransmissionIndex(index) {
  return (index << 0);
}

function getIORIndex(index) {
  return (index << 0);
}

function getTotalByteLength(count) {
  return Math.imul(Math.imul(count, Float32Array.BYTES_PER_ELEMENT), 11);
}

function createBuffer(count) {
  return SharedArrayBufferUtils$WonderCommonlib.newSharedArrayBuffer(getTotalByteLength(count));
}

exports.getDiffuseColorsSize = getDiffuseColorsSize;
exports.getDiffuseColorsLength = getDiffuseColorsLength;
exports.getDiffuseColorsOffset = getDiffuseColorsOffset;
exports.getSpecularsSize = getSpecularsSize;
exports.getSpecularsLength = getSpecularsLength;
exports.getSpecularsOffset = getSpecularsOffset;
exports.getSpecularColorsSize = getSpecularColorsSize;
exports.getSpecularColorsLength = getSpecularColorsLength;
exports.getSpecularColorsOffset = getSpecularColorsOffset;
exports.getRoughnessesSize = getRoughnessesSize;
exports.getRoughnessesLength = getRoughnessesLength;
exports.getRoughnessesOffset = getRoughnessesOffset;
exports.getMetalnessesSize = getMetalnessesSize;
exports.getMetalnessesLength = getMetalnessesLength;
exports.getMetalnessesOffset = getMetalnessesOffset;
exports.getTransmissionsSize = getTransmissionsSize;
exports.getTransmissionsLength = getTransmissionsLength;
exports.getTransmissionsOffset = getTransmissionsOffset;
exports.getIORsSize = getIORsSize;
exports.getIORsLength = getIORsLength;
exports.getIORsOffset = getIORsOffset;
exports.getDiffuseColorIndex = getDiffuseColorIndex;
exports.getSpecularIndex = getSpecularIndex;
exports.getSpecularColorIndex = getSpecularColorIndex;
exports.getRoughnessIndex = getRoughnessIndex;
exports.getMetalnessIndex = getMetalnessIndex;
exports.getTransmissionIndex = getTransmissionIndex;
exports.getIORIndex = getIORIndex;
exports.getTotalByteLength = getTotalByteLength;
exports.createBuffer = createBuffer;
/* No side effect */
