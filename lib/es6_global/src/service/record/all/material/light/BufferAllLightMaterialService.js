

import * as Caml_int32 from "./../../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Worker$Wonderjs from "../../../../../external/Worker.js";
import * as ShaderIndicesService$Wonderjs from "../../../../primitive/material/ShaderIndicesService.js";
import * as BufferMaterialService$Wonderjs from "../../../main/material/BufferMaterialService.js";

function getShaderIndicesSize(param) {
  return 1;
}

function getDiffuseColorsSize(param) {
  return 3;
}

function getMapUnitsSize(param) {
  return 1;
}

function getDiffuseColorsLength(lightMaterialCount) {
  return Caml_int32.imul(lightMaterialCount, 3);
}

function getDiffuseColorsOffset(lightMaterialCount) {
  return Caml_int32.imul(ShaderIndicesService$Wonderjs.getShaderIndicesLength(lightMaterialCount), Uint32Array.BYTES_PER_ELEMENT);
}

function getSpecularColorsSize(param) {
  return 3;
}

function getSpecularColorsLength(lightMaterialCount) {
  return Caml_int32.imul(lightMaterialCount, 3);
}

function getSpecularColorsOffset(lightMaterialCount) {
  return Caml_int32.imul(ShaderIndicesService$Wonderjs.getShaderIndicesLength(lightMaterialCount), Uint32Array.BYTES_PER_ELEMENT) + Caml_int32.imul(Caml_int32.imul(lightMaterialCount, 3), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getShininessSize(param) {
  return 1;
}

function getShininessLength(lightMaterialCount) {
  return (lightMaterialCount << 0);
}

function getShininessOffset(lightMaterialCount) {
  return getSpecularColorsOffset(lightMaterialCount) + Caml_int32.imul(Caml_int32.imul(lightMaterialCount, 3), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getDiffuseColorIndex(index) {
  return Caml_int32.imul(index, 3);
}

function getSpecularColorIndex(index) {
  return Caml_int32.imul(index, 3);
}

function getShininessIndex(index) {
  return (index << 0);
}

function getDiffuseTextureIndicesOffset(lightMaterialCount) {
  return getShininessOffset(lightMaterialCount) + Caml_int32.imul((lightMaterialCount << 0), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getSpecularTextureIndicesOffset(lightMaterialCount) {
  return getDiffuseTextureIndicesOffset(lightMaterialCount) + Caml_int32.imul(BufferMaterialService$Wonderjs.getTextureIndicesLength(lightMaterialCount), Uint32Array.BYTES_PER_ELEMENT) | 0;
}

function getTotalByteLength(lightMaterialCount) {
  return Caml_int32.imul(lightMaterialCount, (Caml_int32.imul(Uint32Array.BYTES_PER_ELEMENT, ShaderIndicesService$Wonderjs.getShaderIndicesSize(/* () */0)) + Caml_int32.imul(Float32Array.BYTES_PER_ELEMENT, 7) | 0) + (Caml_int32.imul(Uint32Array.BYTES_PER_ELEMENT, BufferMaterialService$Wonderjs.getTextureIndicesSize(/* () */0)) << 1) | 0);
}

function createBuffer(lightMaterialCount) {
  return Worker$Wonderjs.newSharedArrayBuffer(getTotalByteLength(lightMaterialCount));
}

var getDiffuseTextureIndicesLength = BufferMaterialService$Wonderjs.getTextureIndicesLength;

var getDiffuseTextureIndicesIndex = BufferMaterialService$Wonderjs.getTextureIndicesIndex;

var getSpecularTextureIndicesLength = BufferMaterialService$Wonderjs.getTextureIndicesLength;

var getSpecularTextureIndicesIndex = BufferMaterialService$Wonderjs.getTextureIndicesIndex;

var getTextureIndexIndex = BufferMaterialService$Wonderjs.getTextureIndexIndex;

export {
  getShaderIndicesSize ,
  getDiffuseColorsSize ,
  getMapUnitsSize ,
  getDiffuseColorsLength ,
  getDiffuseColorsOffset ,
  getSpecularColorsSize ,
  getSpecularColorsLength ,
  getSpecularColorsOffset ,
  getShininessSize ,
  getShininessLength ,
  getShininessOffset ,
  getDiffuseColorIndex ,
  getSpecularColorIndex ,
  getShininessIndex ,
  getDiffuseTextureIndicesLength ,
  getDiffuseTextureIndicesOffset ,
  getDiffuseTextureIndicesIndex ,
  getSpecularTextureIndicesLength ,
  getSpecularTextureIndicesOffset ,
  getSpecularTextureIndicesIndex ,
  getTextureIndexIndex ,
  getTotalByteLength ,
  createBuffer ,
  
}
/* Worker-Wonderjs Not a pure module */
