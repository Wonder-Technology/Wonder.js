

import * as SharedArrayBufferUtils$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/SharedArrayBufferUtils.bs.js";

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

export {
  getColorsSize ,
  getIntensitiesSize ,
  getColorIndex ,
  getIntensityIndex ,
  getColorsOffset ,
  getColorsLength ,
  getIntensitiesOffset ,
  getIntensitiesLength ,
  getTotalByteLength ,
  createBuffer ,
  
}
/* No side effect */
