

import * as Caml_int32 from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Worker$Wonderjs from "../../../../../external/Worker.js";
import * as ShaderIndicesService$Wonderjs from "../../../../primitive/material/ShaderIndicesService.js";
import * as BufferMaterialService$Wonderjs from "../../../main/material/BufferMaterialService.js";

function getShaderIndicesSize(param) {
  return 1;
}

function getColorsSize(param) {
  return 3;
}

function getMapUnitsSize(param) {
  return 1;
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

function getTextureIndicesOffset(basicMaterialCount, textureCountPerMaterial) {
  return getColorsOffset(basicMaterialCount) + Caml_int32.imul(Caml_int32.imul(basicMaterialCount, 3), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getMapUnitsLength(basicMaterialCount) {
  return (basicMaterialCount << 0);
}

function getMapUnitsOffset(basicMaterialCount, textureCountPerMaterial) {
  return getTextureIndicesOffset(basicMaterialCount, textureCountPerMaterial) + Caml_int32.imul(BufferMaterialService$Wonderjs.getTextureIndicesLength(basicMaterialCount, textureCountPerMaterial), Uint32Array.BYTES_PER_ELEMENT) | 0;
}

function getMapUnitIndex(index) {
  return (index << 0);
}

function getIsDepthTestsLength(basicMaterialCount) {
  return (basicMaterialCount << 0);
}

function getIsDepthTestsOffset(basicMaterialCount, textureCountPerMaterial) {
  return getMapUnitsOffset(basicMaterialCount, textureCountPerMaterial) + Caml_int32.imul((basicMaterialCount << 0), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getIsDepthTestIndex(index) {
  return (index << 0);
}

function getAlphasLength(basicMaterialCount) {
  return (basicMaterialCount << 0);
}

function getAlphasOffset(basicMaterialCount, textureCountPerMaterial) {
  return getIsDepthTestsOffset(basicMaterialCount, textureCountPerMaterial) + Caml_int32.imul((basicMaterialCount << 0), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getAlphaIndex(index) {
  return (index << 0);
}

function getTotalByteLength(basicMaterialCount, textureCountPerMaterial) {
  return Caml_int32.imul(basicMaterialCount, (((Caml_int32.imul(Uint32Array.BYTES_PER_ELEMENT, ShaderIndicesService$Wonderjs.getShaderIndicesSize(/* () */0)) + Caml_int32.imul(Float32Array.BYTES_PER_ELEMENT, 3) | 0) + Caml_int32.imul(Uint32Array.BYTES_PER_ELEMENT, BufferMaterialService$Wonderjs.getTextureIndicesSize(textureCountPerMaterial)) | 0) + (Uint8Array.BYTES_PER_ELEMENT << 1) | 0) + (Float32Array.BYTES_PER_ELEMENT << 0) | 0);
}

function createBuffer(basicMaterialCount, textureCountPerMaterial) {
  return Worker$Wonderjs.newSharedArrayBuffer(getTotalByteLength(basicMaterialCount, textureCountPerMaterial));
}

function getDefaultAlpha(param) {
  return 1;
}

var getTextureIndicesLength = BufferMaterialService$Wonderjs.getTextureIndicesLength;

var getTextureIndicesIndex = BufferMaterialService$Wonderjs.getTextureIndicesIndex;

var getTextureIndexIndex = BufferMaterialService$Wonderjs.getTextureIndexIndex;

export {
  getShaderIndicesSize ,
  getColorsSize ,
  getMapUnitsSize ,
  getIsDepthTestsSize ,
  getAlphasSize ,
  getColorsLength ,
  getColorsOffset ,
  getColorIndex ,
  getTextureIndicesLength ,
  getTextureIndicesOffset ,
  getTextureIndicesIndex ,
  getTextureIndexIndex ,
  getMapUnitsLength ,
  getMapUnitsOffset ,
  getMapUnitIndex ,
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
