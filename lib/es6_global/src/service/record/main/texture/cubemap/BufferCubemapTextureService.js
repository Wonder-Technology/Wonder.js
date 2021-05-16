

import * as Caml_int32 from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Worker$Wonderjs from "../../../../../external/Worker.js";
import * as TextureTypeService$Wonderjs from "../../../../primitive/texture/TextureTypeService.js";
import * as BufferTextureService$Wonderjs from "../BufferTextureService.js";
import * as BufferSizeTextureService$Wonderjs from "../BufferSizeTextureService.js";

function getDefaultWrapS(param) {
  return /* Clamp_to_edge */0;
}

function getDefaultWrapT(param) {
  return /* Clamp_to_edge */0;
}

function getDefaultMagFilter(param) {
  return /* Linear */1;
}

function getDefaultMinFilter(param) {
  return /* Nearest */0;
}

function getDefaultFormat(param) {
  return /* Rgb */0;
}

function getDefaultType(param) {
  return TextureTypeService$Wonderjs.getUnsignedByte(/* () */0);
}

function getWrapSsLength(cubemapTextureCount) {
  return Caml_int32.imul(cubemapTextureCount, BufferSizeTextureService$Wonderjs.getWrapSsSize(/* () */0));
}

function getWrapSsOffset(cubemapTextureCount) {
  return 0;
}

function getWrapSIndex(index) {
  return Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getWrapSsSize(/* () */0));
}

function getWrapTsLength(cubemapTextureCount) {
  return Caml_int32.imul(cubemapTextureCount, BufferSizeTextureService$Wonderjs.getWrapTsSize(/* () */0));
}

function getWrapTsOffset(cubemapTextureCount) {
  return 0 + Caml_int32.imul(Caml_int32.imul(cubemapTextureCount, BufferSizeTextureService$Wonderjs.getWrapSsSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getWrapTIndex(index) {
  return Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getWrapTsSize(/* () */0));
}

function getMagFiltersLength(cubemapTextureCount) {
  return Caml_int32.imul(cubemapTextureCount, BufferSizeTextureService$Wonderjs.getMagFiltersSize(/* () */0));
}

function getMagFiltersOffset(cubemapTextureCount) {
  return getWrapTsOffset(cubemapTextureCount) + Caml_int32.imul(Caml_int32.imul(cubemapTextureCount, BufferSizeTextureService$Wonderjs.getWrapTsSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getMagFilterIndex(index) {
  return Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getMagFiltersSize(/* () */0));
}

function getMinFiltersLength(cubemapTextureCount) {
  return Caml_int32.imul(cubemapTextureCount, BufferSizeTextureService$Wonderjs.getMinFiltersSize(/* () */0));
}

function getMinFiltersOffset(cubemapTextureCount) {
  return getMagFiltersOffset(cubemapTextureCount) + Caml_int32.imul(Caml_int32.imul(cubemapTextureCount, BufferSizeTextureService$Wonderjs.getMagFiltersSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getMinFilterIndex(index) {
  return Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getMinFiltersSize(/* () */0));
}

function getFormatIndex(index) {
  return Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0));
}

function getFormatsLength(cubemapTextureCount) {
  return Caml_int32.imul(cubemapTextureCount, BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0));
}

function getPXFormatsOffset(cubemapTextureCount) {
  return getMinFiltersOffset(cubemapTextureCount) + Caml_int32.imul(Caml_int32.imul(cubemapTextureCount, BufferSizeTextureService$Wonderjs.getMinFiltersSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getNXFormatsOffset(cubemapTextureCount) {
  return getPXFormatsOffset(cubemapTextureCount) + Caml_int32.imul(Caml_int32.imul(cubemapTextureCount, BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getPYFormatsOffset(cubemapTextureCount) {
  return getNXFormatsOffset(cubemapTextureCount) + Caml_int32.imul(Caml_int32.imul(cubemapTextureCount, BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getNYFormatsOffset(cubemapTextureCount) {
  return getPYFormatsOffset(cubemapTextureCount) + Caml_int32.imul(Caml_int32.imul(cubemapTextureCount, BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getPZFormatsOffset(cubemapTextureCount) {
  return getNYFormatsOffset(cubemapTextureCount) + Caml_int32.imul(Caml_int32.imul(cubemapTextureCount, BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getNZFormatsOffset(cubemapTextureCount) {
  return getPYFormatsOffset(cubemapTextureCount) + Caml_int32.imul(Caml_int32.imul(cubemapTextureCount, BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getPXTypesOffset(cubemapTextureCount) {
  return getNZFormatsOffset(cubemapTextureCount) + Caml_int32.imul(Caml_int32.imul(cubemapTextureCount, BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getTypeIndex(index) {
  return Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0));
}

function getTypesLength(cubemapTextureCount) {
  return Caml_int32.imul(cubemapTextureCount, BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0));
}

function getNXTypesOffset(cubemapTextureCount) {
  return getPXTypesOffset(cubemapTextureCount) + Caml_int32.imul(Caml_int32.imul(cubemapTextureCount, BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getPYTypesOffset(cubemapTextureCount) {
  return getNXTypesOffset(cubemapTextureCount) + Caml_int32.imul(Caml_int32.imul(cubemapTextureCount, BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getNYTypesOffset(cubemapTextureCount) {
  return getPYTypesOffset(cubemapTextureCount) + Caml_int32.imul(Caml_int32.imul(cubemapTextureCount, BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getPZTypesOffset(cubemapTextureCount) {
  return getNYTypesOffset(cubemapTextureCount) + Caml_int32.imul(Caml_int32.imul(cubemapTextureCount, BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getNZTypesOffset(cubemapTextureCount) {
  return getPZTypesOffset(cubemapTextureCount) + Caml_int32.imul(Caml_int32.imul(cubemapTextureCount, BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getIsNeedUpdatesLength(cubemapTextureCount) {
  return Caml_int32.imul(cubemapTextureCount, BufferSizeTextureService$Wonderjs.getIsNeedUpdatesSize(/* () */0));
}

function getIsNeedUpdatesOffset(cubemapTextureCount) {
  return getNZTypesOffset(cubemapTextureCount) + Caml_int32.imul(Caml_int32.imul(cubemapTextureCount, BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getFlipYsLength(cubemapTextureCount) {
  return Caml_int32.imul(cubemapTextureCount, BufferSizeTextureService$Wonderjs.getFlipYsSize(/* () */0));
}

function getFlipYsOffset(cubemapTextureCount) {
  return getIsNeedUpdatesOffset(cubemapTextureCount) + Caml_int32.imul(Caml_int32.imul(cubemapTextureCount, BufferSizeTextureService$Wonderjs.getIsNeedUpdatesSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getFlipYIndex(index) {
  return Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getFlipYsSize(/* () */0));
}

function getTotalByteLength(cubemapTextureCount) {
  return Caml_int32.imul(cubemapTextureCount, Caml_int32.imul(Uint8Array.BYTES_PER_ELEMENT, ((((((BufferSizeTextureService$Wonderjs.getWrapSsSize(/* () */0) + BufferSizeTextureService$Wonderjs.getWrapTsSize(/* () */0) | 0) + BufferSizeTextureService$Wonderjs.getMagFiltersSize(/* () */0) | 0) + BufferSizeTextureService$Wonderjs.getMinFiltersSize(/* () */0) | 0) + Caml_int32.imul(BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0), 6) | 0) + Caml_int32.imul(BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0), 6) | 0) + BufferSizeTextureService$Wonderjs.getIsNeedUpdatesSize(/* () */0) | 0) + BufferSizeTextureService$Wonderjs.getFlipYsSize(/* () */0) | 0));
}

function createBuffer(cubemapTextureCount) {
  return Worker$Wonderjs.newSharedArrayBuffer(getTotalByteLength(cubemapTextureCount));
}

var getDefaultIsNeedUpdate = BufferTextureService$Wonderjs.getDefaultIsNeedUpdate;

var getDefaultFlipY = BufferTextureService$Wonderjs.getNotFlipY;

var getIsNeedUpdateIndex = BufferTextureService$Wonderjs.getIsNeedUpdateIndex;

export {
  getDefaultWrapS ,
  getDefaultWrapT ,
  getDefaultMagFilter ,
  getDefaultMinFilter ,
  getDefaultFormat ,
  getDefaultType ,
  getDefaultIsNeedUpdate ,
  getDefaultFlipY ,
  getWrapSsLength ,
  getWrapSsOffset ,
  getWrapSIndex ,
  getWrapTsLength ,
  getWrapTsOffset ,
  getWrapTIndex ,
  getMagFiltersLength ,
  getMagFiltersOffset ,
  getMagFilterIndex ,
  getMinFiltersLength ,
  getMinFiltersOffset ,
  getMinFilterIndex ,
  getFormatIndex ,
  getFormatsLength ,
  getPXFormatsOffset ,
  getNXFormatsOffset ,
  getPYFormatsOffset ,
  getNYFormatsOffset ,
  getPZFormatsOffset ,
  getNZFormatsOffset ,
  getPXTypesOffset ,
  getTypeIndex ,
  getTypesLength ,
  getNXTypesOffset ,
  getPYTypesOffset ,
  getNYTypesOffset ,
  getPZTypesOffset ,
  getNZTypesOffset ,
  getIsNeedUpdatesLength ,
  getIsNeedUpdatesOffset ,
  getIsNeedUpdateIndex ,
  getFlipYsLength ,
  getFlipYsOffset ,
  getFlipYIndex ,
  getTotalByteLength ,
  createBuffer ,
  
}
/* Worker-Wonderjs Not a pure module */
