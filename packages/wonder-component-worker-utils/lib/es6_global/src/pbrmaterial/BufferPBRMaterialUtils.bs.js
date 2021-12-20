

import * as SharedArrayBufferUtils$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/SharedArrayBufferUtils.bs.js";

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

export {
  getDiffuseColorsSize ,
  getDiffuseColorsLength ,
  getDiffuseColorsOffset ,
  getSpecularsSize ,
  getSpecularsLength ,
  getSpecularsOffset ,
  getSpecularColorsSize ,
  getSpecularColorsLength ,
  getSpecularColorsOffset ,
  getRoughnessesSize ,
  getRoughnessesLength ,
  getRoughnessesOffset ,
  getMetalnessesSize ,
  getMetalnessesLength ,
  getMetalnessesOffset ,
  getTransmissionsSize ,
  getTransmissionsLength ,
  getTransmissionsOffset ,
  getIORsSize ,
  getIORsLength ,
  getIORsOffset ,
  getDiffuseColorIndex ,
  getSpecularIndex ,
  getSpecularColorIndex ,
  getRoughnessIndex ,
  getMetalnessIndex ,
  getTransmissionIndex ,
  getIORIndex ,
  getTotalByteLength ,
  createBuffer ,
  
}
/* No side effect */
