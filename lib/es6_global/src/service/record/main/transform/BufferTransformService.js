

import * as Caml_int32 from "../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Worker$Wonderjs from "../../../../external/Worker.js";

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
  return Caml_int32.imul(count, 3);
}

function getLocalPositionsOffset(count) {
  return 0 + Caml_int32.imul((count << 4), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getLocalRotationsSize(param) {
  return 4;
}

function getLocalRotationsLength(count) {
  return (count << 2);
}

function getLocalRotationsOffset(count) {
  return getLocalPositionsOffset(count) + Caml_int32.imul(Caml_int32.imul(count, 3), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getLocalScalesSize(param) {
  return 3;
}

function getLocalScalesLength(count) {
  return Caml_int32.imul(count, 3);
}

function getLocalScalesOffset(count) {
  return getLocalRotationsOffset(count) + Caml_int32.imul((count << 2), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getLocalToWorldMatrixIndex(index) {
  return (index << 4);
}

function getLocalPositionIndex(index) {
  return Caml_int32.imul(index, 3);
}

function getLocalRotationIndex(index) {
  return (index << 2);
}

function getLocalScaleIndex(index) {
  return Caml_int32.imul(index, 3);
}

function getTotalByteLength(count) {
  return Caml_int32.imul(Caml_int32.imul(count, Float32Array.BYTES_PER_ELEMENT), 26);
}

function createBuffer(count) {
  return Worker$Wonderjs.newSharedArrayBuffer(getTotalByteLength(count));
}

export {
  getLocalToWorldMatricesSize ,
  getLocalToWorldMatricesLength ,
  getLocalToWorldMatricesOffset ,
  getLocalPositionsSize ,
  getLocalPositionsLength ,
  getLocalPositionsOffset ,
  getLocalRotationsSize ,
  getLocalRotationsLength ,
  getLocalRotationsOffset ,
  getLocalScalesSize ,
  getLocalScalesLength ,
  getLocalScalesOffset ,
  getLocalToWorldMatrixIndex ,
  getLocalPositionIndex ,
  getLocalRotationIndex ,
  getLocalScaleIndex ,
  getTotalByteLength ,
  createBuffer ,
  
}
/* Worker-Wonderjs Not a pure module */
