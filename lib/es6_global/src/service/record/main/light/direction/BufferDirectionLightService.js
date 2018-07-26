

import * as Caml_int32 from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Worker$Wonderjs from "../../../../../external/Worker.js";

function getBufferMaxCount() {
  return 4;
}

function getColorsSize() {
  return 3;
}

function getIntensitiesSize() {
  return 1;
}

function getColorIndex(index) {
  return Caml_int32.imul(index, 3);
}

function getIntensityIndex(index) {
  return (index << 0);
}

function getColorsOffset() {
  return 0;
}

function getColorsLength() {
  return 12;
}

function getIntensitiesOffset() {
  return Caml_int32.imul(getColorsLength(/* () */0), Float32Array.BYTES_PER_ELEMENT);
}

function getIntensitiesLength() {
  return 4;
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
