'use strict';

var SharedArrayBufferUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/SharedArrayBufferUtils.bs.js");

function getLocalToWorldMatricesSize(param) {
  return 16;
}

function getLocalToWorldMatricesLength(count) {
  return (count << 4);
}

function getLocalToWorldMatricesOffset(count) {
  return 0;
}

function getLocalPositionsSize(param) {
  return 3;
}

function getLocalPositionsLength(count) {
  return Math.imul(count, 3);
}

function getLocalPositionsOffset(count) {
  return 0 + Math.imul((count << 4), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getLocalRotationsSize(param) {
  return 4;
}

function getLocalRotationsLength(count) {
  return (count << 2);
}

function getLocalRotationsOffset(count) {
  return getLocalPositionsOffset(count) + Math.imul(Math.imul(count, 3), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getLocalScalesSize(param) {
  return 3;
}

function getLocalScalesLength(count) {
  return Math.imul(count, 3);
}

function getLocalScalesOffset(count) {
  return getLocalRotationsOffset(count) + Math.imul((count << 2), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getLocalToWorldMatrixIndex(index) {
  return (index << 4);
}

function getLocalPositionIndex(index) {
  return Math.imul(index, 3);
}

function getLocalRotationIndex(index) {
  return (index << 2);
}

function getLocalScaleIndex(index) {
  return Math.imul(index, 3);
}

function getTotalByteLength(count) {
  return Math.imul(Math.imul(count, Float32Array.BYTES_PER_ELEMENT), 26);
}

function createBuffer(count) {
  return SharedArrayBufferUtils$WonderCommonlib.newSharedArrayBuffer(getTotalByteLength(count));
}

exports.getLocalToWorldMatricesSize = getLocalToWorldMatricesSize;
exports.getLocalToWorldMatricesLength = getLocalToWorldMatricesLength;
exports.getLocalToWorldMatricesOffset = getLocalToWorldMatricesOffset;
exports.getLocalPositionsSize = getLocalPositionsSize;
exports.getLocalPositionsLength = getLocalPositionsLength;
exports.getLocalPositionsOffset = getLocalPositionsOffset;
exports.getLocalRotationsSize = getLocalRotationsSize;
exports.getLocalRotationsLength = getLocalRotationsLength;
exports.getLocalRotationsOffset = getLocalRotationsOffset;
exports.getLocalScalesSize = getLocalScalesSize;
exports.getLocalScalesLength = getLocalScalesLength;
exports.getLocalScalesOffset = getLocalScalesOffset;
exports.getLocalToWorldMatrixIndex = getLocalToWorldMatrixIndex;
exports.getLocalPositionIndex = getLocalPositionIndex;
exports.getLocalRotationIndex = getLocalRotationIndex;
exports.getLocalScaleIndex = getLocalScaleIndex;
exports.getTotalByteLength = getTotalByteLength;
exports.createBuffer = createBuffer;
/* No side effect */
