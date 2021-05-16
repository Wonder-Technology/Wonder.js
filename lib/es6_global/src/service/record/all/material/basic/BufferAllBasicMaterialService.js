

import * as Caml_int32 from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Worker$Wonderjs from "../../../../../external/Worker.js";
import * as ShaderIndicesService$Wonderjs from "../../../../primitive/material/ShaderIndicesService.js";

function getShaderIndicesSize(param) {
  return 1;
}

function getColorsSize(param) {
  return 3;
}

function getIsDepthTestsSize(param) {
  return 1;
}

function getAlphasSize(param) {
  return 1;
}

function getColorsLength(basicMaterialCount) {
  return Caml_int32.imul(basicMaterialCount, 3);
}

function getColorsOffset(basicMaterialCount) {
  return ShaderIndicesService$Wonderjs.getShaderIndicesOffset(basicMaterialCount) + Caml_int32.imul(ShaderIndicesService$Wonderjs.getShaderIndicesLength(basicMaterialCount), Uint32Array.BYTES_PER_ELEMENT) | 0;
}

function getColorIndex(index) {
  return Caml_int32.imul(index, 3);
}

function getIsDepthTestsLength(basicMaterialCount) {
  return (basicMaterialCount << 0);
}

function getIsDepthTestsOffset(basicMaterialCount) {
  return getColorsOffset(basicMaterialCount) + Caml_int32.imul(Caml_int32.imul(basicMaterialCount, 3), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getIsDepthTestIndex(index) {
  return (index << 0);
}

function getAlphasLength(basicMaterialCount) {
  return (basicMaterialCount << 0);
}

function getAlphasOffset(basicMaterialCount) {
  return getIsDepthTestsOffset(basicMaterialCount) + Caml_int32.imul((basicMaterialCount << 0), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getAlphaIndex(index) {
  return (index << 0);
}

function getTotalByteLength(basicMaterialCount) {
  return Caml_int32.imul(basicMaterialCount, ((Caml_int32.imul(Uint32Array.BYTES_PER_ELEMENT, ShaderIndicesService$Wonderjs.getShaderIndicesSize(/* () */0)) + Caml_int32.imul(Float32Array.BYTES_PER_ELEMENT, 3) | 0) + (Uint8Array.BYTES_PER_ELEMENT << 0) | 0) + (Float32Array.BYTES_PER_ELEMENT << 0) | 0);
}

function createBuffer(basicMaterialCount) {
  return Worker$Wonderjs.newSharedArrayBuffer(getTotalByteLength(basicMaterialCount));
}

function getDefaultAlpha(param) {
  return 1;
}

export {
  getShaderIndicesSize ,
  getColorsSize ,
  getIsDepthTestsSize ,
  getAlphasSize ,
  getColorsLength ,
  getColorsOffset ,
  getColorIndex ,
  getIsDepthTestsLength ,
  getIsDepthTestsOffset ,
  getIsDepthTestIndex ,
  getAlphasLength ,
  getAlphasOffset ,
  getAlphaIndex ,
  getTotalByteLength ,
  createBuffer ,
  getDefaultAlpha ,
  
}
/* Worker-Wonderjs Not a pure module */
