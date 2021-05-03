

import * as Caml_int32 from "./../../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
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

function getColorIndex(index) {
  return Caml_int32.imul(index, 3);
}

function getIntensityIndex(index) {
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

function getTotalByteLength(count) {
  return (Caml_int32.imul(count, Float32Array.BYTES_PER_ELEMENT) << 2);
}

function createBuffer(count) {
  return Worker$Wonderjs.newSharedArrayBuffer(getTotalByteLength(count));
}

export {
  getBufferMaxCount ,
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
/* Worker-Wonderjs Not a pure module */
