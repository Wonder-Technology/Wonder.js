

import * as Caml_int32 from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as TextureTypeService$Wonderjs from "../../../../../primitive/texture/TextureTypeService.js";
import * as BufferTextureService$Wonderjs from "../../BufferTextureService.js";
import * as BufferSizeTextureService$Wonderjs from "../../BufferSizeTextureService.js";
import * as BufferSourceTextureService$Wonderjs from "../BufferSourceTextureService.js";

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
  return /* Rgba */1;
}

function getDefaultType(param) {
  return TextureTypeService$Wonderjs.getUnsignedByte(/* () */0);
}

function getWrapSsLength(basicSourceTextureCount) {
  return Caml_int32.imul(basicSourceTextureCount, BufferSizeTextureService$Wonderjs.getWrapSsSize(/* () */0));
}

function getWrapSsOffset(basicSourceTextureCount) {
  return BufferSourceTextureService$Wonderjs.getBasicSourceTextureOffset(/* () */0) + 0 | 0;
}

function getWrapSIndex(index) {
  return Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getWrapSsSize(/* () */0));
}

function getWrapTsLength(basicSourceTextureCount) {
  return Caml_int32.imul(basicSourceTextureCount, BufferSizeTextureService$Wonderjs.getWrapTsSize(/* () */0));
}

function getWrapTsOffset(basicSourceTextureCount) {
  return (BufferSourceTextureService$Wonderjs.getBasicSourceTextureOffset(/* () */0) + 0 | 0) + Caml_int32.imul(Caml_int32.imul(basicSourceTextureCount, BufferSizeTextureService$Wonderjs.getWrapSsSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getWrapTIndex(index) {
  return Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getWrapTsSize(/* () */0));
}

function getMagFiltersLength(basicSourceTextureCount) {
  return Caml_int32.imul(basicSourceTextureCount, BufferSizeTextureService$Wonderjs.getMagFiltersSize(/* () */0));
}

function getMagFiltersOffset(basicSourceTextureCount) {
  return getWrapTsOffset(basicSourceTextureCount) + Caml_int32.imul(Caml_int32.imul(basicSourceTextureCount, BufferSizeTextureService$Wonderjs.getWrapTsSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getMagFilterIndex(index) {
  return Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getMagFiltersSize(/* () */0));
}

function getMinFiltersLength(basicSourceTextureCount) {
  return Caml_int32.imul(basicSourceTextureCount, BufferSizeTextureService$Wonderjs.getMinFiltersSize(/* () */0));
}

function getMinFiltersOffset(basicSourceTextureCount) {
  return getMagFiltersOffset(basicSourceTextureCount) + Caml_int32.imul(Caml_int32.imul(basicSourceTextureCount, BufferSizeTextureService$Wonderjs.getMagFiltersSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getMinFilterIndex(index) {
  return Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getMinFiltersSize(/* () */0));
}

function getFormatsLength(basicSourceTextureCount) {
  return Caml_int32.imul(basicSourceTextureCount, BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0));
}

function getFormatsOffset(basicSourceTextureCount) {
  return getMinFiltersOffset(basicSourceTextureCount) + Caml_int32.imul(Caml_int32.imul(basicSourceTextureCount, BufferSizeTextureService$Wonderjs.getMinFiltersSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getFormatIndex(index) {
  return Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0));
}

function getTypesLength(basicSourceTextureCount) {
  return Caml_int32.imul(basicSourceTextureCount, BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0));
}

function getTypesOffset(basicSourceTextureCount) {
  return getFormatsOffset(basicSourceTextureCount) + Caml_int32.imul(Caml_int32.imul(basicSourceTextureCount, BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getTypeIndex(index) {
  return Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0));
}

function getIsNeedUpdatesLength(basicSourceTextureCount) {
  return Caml_int32.imul(basicSourceTextureCount, BufferSizeTextureService$Wonderjs.getIsNeedUpdatesSize(/* () */0));
}

function getIsNeedUpdatesOffset(basicSourceTextureCount) {
  return getTypesOffset(basicSourceTextureCount) + Caml_int32.imul(Caml_int32.imul(basicSourceTextureCount, BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getFlipYsLength(basicSourceTextureCount) {
  return Caml_int32.imul(basicSourceTextureCount, BufferSizeTextureService$Wonderjs.getFlipYsSize(/* () */0));
}

function getFlipYsOffset(basicSourceTextureCount) {
  return getIsNeedUpdatesOffset(basicSourceTextureCount) + Caml_int32.imul(Caml_int32.imul(basicSourceTextureCount, BufferSizeTextureService$Wonderjs.getIsNeedUpdatesSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getFlipYIndex(index) {
  return Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getFlipYsSize(/* () */0));
}

function getTotalByteLength(basicSourceTextureCount) {
  return Caml_int32.imul(basicSourceTextureCount, Caml_int32.imul(Uint8Array.BYTES_PER_ELEMENT, ((((((BufferSizeTextureService$Wonderjs.getWrapSsSize(/* () */0) + BufferSizeTextureService$Wonderjs.getWrapTsSize(/* () */0) | 0) + BufferSizeTextureService$Wonderjs.getMagFiltersSize(/* () */0) | 0) + BufferSizeTextureService$Wonderjs.getMinFiltersSize(/* () */0) | 0) + BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0) | 0) + BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0) | 0) + BufferSizeTextureService$Wonderjs.getIsNeedUpdatesSize(/* () */0) | 0) + BufferSizeTextureService$Wonderjs.getFlipYsSize(/* () */0) | 0));
}

var getDefaultIsNeedUpdate = BufferTextureService$Wonderjs.getDefaultIsNeedUpdate;

var getDefaultFlipY = BufferTextureService$Wonderjs.getDefaultFlipY;

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
  getFormatsLength ,
  getFormatsOffset ,
  getFormatIndex ,
  getTypesLength ,
  getTypesOffset ,
  getTypeIndex ,
  getIsNeedUpdatesLength ,
  getIsNeedUpdatesOffset ,
  getIsNeedUpdateIndex ,
  getFlipYsLength ,
  getFlipYsOffset ,
  getFlipYIndex ,
  getTotalByteLength ,
  
}
/* BufferSourceTextureService-Wonderjs Not a pure module */
