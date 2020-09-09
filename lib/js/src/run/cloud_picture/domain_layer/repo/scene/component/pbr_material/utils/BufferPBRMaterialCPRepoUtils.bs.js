'use strict';

var SharedArrayBufferCPRepoUtils$Wonderjs = require("../../utils/SharedArrayBufferCPRepoUtils.bs.js");

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

function getRoughnessesSize(param) {
  return 1;
}

function getRoughnessesLength(count) {
  return (count << 0);
}

function getRoughnessesOffset(count) {
  return getSpecularsOffset(count) + Math.imul((count << 0), Float32Array.BYTES_PER_ELEMENT) | 0;
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

function getDiffuseColorIndex(index) {
  return Math.imul(index, 3);
}

function getSpecularIndex(index) {
  return (index << 0);
}

function getRoughnessIndex(index) {
  return (index << 0);
}

function getMetalnessIndex(index) {
  return (index << 0);
}

function getTotalByteLength(count) {
  return Math.imul(Math.imul(count, Float32Array.BYTES_PER_ELEMENT), 6);
}

function createBuffer(count) {
  return SharedArrayBufferCPRepoUtils$Wonderjs.newSharedArrayBuffer(getTotalByteLength(count));
}

exports.getDiffuseColorsSize = getDiffuseColorsSize;
exports.getDiffuseColorsLength = getDiffuseColorsLength;
exports.getDiffuseColorsOffset = getDiffuseColorsOffset;
exports.getSpecularsSize = getSpecularsSize;
exports.getSpecularsLength = getSpecularsLength;
exports.getSpecularsOffset = getSpecularsOffset;
exports.getRoughnessesSize = getRoughnessesSize;
exports.getRoughnessesLength = getRoughnessesLength;
exports.getRoughnessesOffset = getRoughnessesOffset;
exports.getMetalnessesSize = getMetalnessesSize;
exports.getMetalnessesLength = getMetalnessesLength;
exports.getMetalnessesOffset = getMetalnessesOffset;
exports.getDiffuseColorIndex = getDiffuseColorIndex;
exports.getSpecularIndex = getSpecularIndex;
exports.getRoughnessIndex = getRoughnessIndex;
exports.getMetalnessIndex = getMetalnessIndex;
exports.getTotalByteLength = getTotalByteLength;
exports.createBuffer = createBuffer;
/* No side effect */
