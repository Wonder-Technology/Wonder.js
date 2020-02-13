

import * as Caml_int32 from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
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

function getTextureIndicesOffset(lightMaterialCount, textureCountPerMaterial) {
  return getShininessOffset(lightMaterialCount) + Caml_int32.imul((lightMaterialCount << 0), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getDiffuseMapUnitsLength(lightMaterialCount) {
  return (lightMaterialCount << 0);
}

function getDiffuseMapUnitsOffset(lightMaterialCount, textureCountPerMaterial) {
  return getTextureIndicesOffset(lightMaterialCount, textureCountPerMaterial) + Caml_int32.imul(BufferMaterialService$Wonderjs.getTextureIndicesLength(lightMaterialCount, textureCountPerMaterial), Uint32Array.BYTES_PER_ELEMENT) | 0;
}

function getDiffuseMapUnitIndex(index) {
  return (index << 0);
}

function getSpecularMapUnitsLength(lightMaterialCount) {
  return (lightMaterialCount << 0);
}

function getSpecularMapUnitsOffset(lightMaterialCount, textureCountPerMaterial) {
  return getDiffuseMapUnitsOffset(lightMaterialCount, textureCountPerMaterial) + Caml_int32.imul((lightMaterialCount << 0), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getSpecularMapUnitIndex(index) {
  return (index << 0);
}

function getTotalByteLength(lightMaterialCount, textureCountPerMaterial) {
  return Caml_int32.imul(lightMaterialCount, ((Caml_int32.imul(Uint32Array.BYTES_PER_ELEMENT, ShaderIndicesService$Wonderjs.getShaderIndicesSize(/* () */0)) + Caml_int32.imul(Float32Array.BYTES_PER_ELEMENT, 7) | 0) + Caml_int32.imul(Uint32Array.BYTES_PER_ELEMENT, BufferMaterialService$Wonderjs.getTextureIndicesSize(textureCountPerMaterial)) | 0) + (Uint8Array.BYTES_PER_ELEMENT << 1) | 0);
}

function createBuffer(lightMaterialCount, textureCountPerMaterial) {
  return Worker$Wonderjs.newSharedArrayBuffer(getTotalByteLength(lightMaterialCount, textureCountPerMaterial));
}

var getTextureIndicesLength = BufferMaterialService$Wonderjs.getTextureIndicesLength;

var getTextureIndicesIndex = BufferMaterialService$Wonderjs.getTextureIndicesIndex;

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
  getTextureIndicesLength ,
  getTextureIndicesOffset ,
  getTextureIndicesIndex ,
  getTextureIndexIndex ,
  getDiffuseMapUnitsLength ,
  getDiffuseMapUnitsOffset ,
  getDiffuseMapUnitIndex ,
  getSpecularMapUnitsLength ,
  getSpecularMapUnitsOffset ,
  getSpecularMapUnitIndex ,
  getTotalByteLength ,
  createBuffer ,
  
}
/* Worker-Wonderjs Not a pure module */
