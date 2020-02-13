

import * as Caml_int32 from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Worker$Wonderjs from "../../../../../external/Worker.js";

function getBufferMaxCount(param) {
  return 4;
}

function getColorsSize(param) {
  return 3;
}

function getIntensitiesSize(param) {
  return 1;
}

function getConstantsSize(param) {
  return 1;
}

function getLinearsSize(param) {
  return 1;
}

function getQuadraticsSize(param) {
  return 1;
}

function getRangesSize(param) {
  return 1;
}

function getColorIndex(index) {
  return Caml_int32.imul(index, 3);
}

function getIntensityIndex(index) {
  return (index << 0);
}

function getConstantIndex(index) {
  return (index << 0);
}

function getLinearIndex(index) {
  return (index << 0);
}

function getQuadraticIndex(index) {
  return (index << 0);
}

function getRangeIndex(index) {
  return (index << 0);
}

function getColorsOffset(count) {
  return 0;
}

function getColorsLength(count) {
  return Caml_int32.imul(count, 3);
}

function getIntensitiesOffset(count) {
  return 0 + Caml_int32.imul(Caml_int32.imul(count, 3), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getIntensitiesLength(count) {
  return (count << 0);
}

function getConstantsOffset(count) {
  return getIntensitiesOffset(count) + Caml_int32.imul((count << 0), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getConstantsLength(count) {
  return (count << 0);
}

function getLinearsOffset(count) {
  return getConstantsOffset(count) + Caml_int32.imul((count << 0), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getLinearsLength(count) {
  return (count << 0);
}

function getQuadraticsOffset(count) {
  return getLinearsOffset(count) + Caml_int32.imul((count << 0), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getQuadraticsLength(count) {
  return (count << 0);
}

function getRangesOffset(count) {
  return getQuadraticsOffset(count) + Caml_int32.imul((count << 0), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getRangesLength(count) {
  return (count << 0);
}

function getTotalByteLength(count) {
  return (Caml_int32.imul(count, Float32Array.BYTES_PER_ELEMENT) << 3);
}

function createBuffer(count) {
  return Worker$Wonderjs.newSharedArrayBuffer(getTotalByteLength(count));
}

export {
  getBufferMaxCount ,
  getColorsSize ,
  getIntensitiesSize ,
  getConstantsSize ,
  getLinearsSize ,
  getQuadraticsSize ,
  getRangesSize ,
  getColorIndex ,
  getIntensityIndex ,
  getConstantIndex ,
  getLinearIndex ,
  getQuadraticIndex ,
  getRangeIndex ,
  getColorsOffset ,
  getColorsLength ,
  getIntensitiesOffset ,
  getIntensitiesLength ,
  getConstantsOffset ,
  getConstantsLength ,
  getLinearsOffset ,
  getLinearsLength ,
  getQuadraticsOffset ,
  getQuadraticsLength ,
  getRangesOffset ,
  getRangesLength ,
  getTotalByteLength ,
  createBuffer ,
  
}
/* Worker-Wonderjs Not a pure module */
