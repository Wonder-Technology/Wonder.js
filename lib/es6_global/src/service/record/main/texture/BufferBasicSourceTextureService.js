

import * as Caml_int32 from "../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as TextureTypeService$Wonderjs from "../../../primitive/texture/TextureTypeService.js";
import * as BufferSourceTextureService$Wonderjs from "./BufferSourceTextureService.js";
import * as BufferSourceSizeTextureService$Wonderjs from "./BufferSourceSizeTextureService.js";

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
  return Caml_int32.imul(basicSourceTextureCount, BufferSourceSizeTextureService$Wonderjs.getWrapSsSize(/* () */0));
}

function getWrapSsOffset(basicSourceTextureCount) {
  return BufferSourceTextureService$Wonderjs.getBasicSourceTextureOffset(/* () */0) + 0 | 0;
}

function getWrapSIndex(index) {
  return Caml_int32.imul(index, BufferSourceSizeTextureService$Wonderjs.getWrapSsSize(/* () */0));
}

function getWrapTsLength(basicSourceTextureCount) {
  return Caml_int32.imul(basicSourceTextureCount, BufferSourceSizeTextureService$Wonderjs.getWrapTsSize(/* () */0));
}

function getWrapTsOffset(basicSourceTextureCount) {
  return (BufferSourceTextureService$Wonderjs.getBasicSourceTextureOffset(/* () */0) + 0 | 0) + Caml_int32.imul(Caml_int32.imul(basicSourceTextureCount, BufferSourceSizeTextureService$Wonderjs.getWrapSsSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getWrapTIndex(index) {
  return Caml_int32.imul(index, BufferSourceSizeTextureService$Wonderjs.getWrapTsSize(/* () */0));
}

function getMagFiltersLength(basicSourceTextureCount) {
  return Caml_int32.imul(basicSourceTextureCount, BufferSourceSizeTextureService$Wonderjs.getMagFiltersSize(/* () */0));
}

function getMagFiltersOffset(basicSourceTextureCount) {
  return getWrapTsOffset(basicSourceTextureCount) + Caml_int32.imul(Caml_int32.imul(basicSourceTextureCount, BufferSourceSizeTextureService$Wonderjs.getWrapTsSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getMagFilterIndex(index) {
  return Caml_int32.imul(index, BufferSourceSizeTextureService$Wonderjs.getMagFiltersSize(/* () */0));
}

function getMinFiltersLength(basicSourceTextureCount) {
  return Caml_int32.imul(basicSourceTextureCount, BufferSourceSizeTextureService$Wonderjs.getMinFiltersSize(/* () */0));
}

function getMinFiltersOffset(basicSourceTextureCount) {
  return getMagFiltersOffset(basicSourceTextureCount) + Caml_int32.imul(Caml_int32.imul(basicSourceTextureCount, BufferSourceSizeTextureService$Wonderjs.getMagFiltersSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getMinFilterIndex(index) {
  return Caml_int32.imul(index, BufferSourceSizeTextureService$Wonderjs.getMinFiltersSize(/* () */0));
}

function getFormatsLength(basicSourceTextureCount) {
  return Caml_int32.imul(basicSourceTextureCount, BufferSourceSizeTextureService$Wonderjs.getFormatsSize(/* () */0));
}

function getFormatsOffset(basicSourceTextureCount) {
  return getMinFiltersOffset(basicSourceTextureCount) + Caml_int32.imul(Caml_int32.imul(basicSourceTextureCount, BufferSourceSizeTextureService$Wonderjs.getMinFiltersSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getFormatIndex(index) {
  return Caml_int32.imul(index, BufferSourceSizeTextureService$Wonderjs.getFormatsSize(/* () */0));
}

function getTypesLength(basicSourceTextureCount) {
  return Caml_int32.imul(basicSourceTextureCount, BufferSourceSizeTextureService$Wonderjs.getTypesSize(/* () */0));
}

function getTypesOffset(basicSourceTextureCount) {
  return getFormatsOffset(basicSourceTextureCount) + Caml_int32.imul(Caml_int32.imul(basicSourceTextureCount, BufferSourceSizeTextureService$Wonderjs.getFormatsSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getTypeIndex(index) {
  return Caml_int32.imul(index, BufferSourceSizeTextureService$Wonderjs.getTypesSize(/* () */0));
}

function getIsNeedUpdatesLength(basicSourceTextureCount) {
  return Caml_int32.imul(basicSourceTextureCount, BufferSourceSizeTextureService$Wonderjs.getIsNeedUpdatesSize(/* () */0));
}

function getIsNeedUpdatesOffset(basicSourceTextureCount) {
  return getTypesOffset(basicSourceTextureCount) + Caml_int32.imul(Caml_int32.imul(basicSourceTextureCount, BufferSourceSizeTextureService$Wonderjs.getTypesSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getFlipYsLength(basicSourceTextureCount) {
  return Caml_int32.imul(basicSourceTextureCount, BufferSourceSizeTextureService$Wonderjs.getFlipYsSize(/* () */0));
}

function getFlipYsOffset(basicSourceTextureCount) {
  return getIsNeedUpdatesOffset(basicSourceTextureCount) + Caml_int32.imul(Caml_int32.imul(basicSourceTextureCount, BufferSourceSizeTextureService$Wonderjs.getIsNeedUpdatesSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getFlipYIndex(index) {
  return Caml_int32.imul(index, BufferSourceSizeTextureService$Wonderjs.getFlipYsSize(/* () */0));
}

function getTotalByteLength(basicSourceTextureCount) {
  return Caml_int32.imul(basicSourceTextureCount, Caml_int32.imul(Uint8Array.BYTES_PER_ELEMENT, ((((((BufferSourceSizeTextureService$Wonderjs.getWrapSsSize(/* () */0) + BufferSourceSizeTextureService$Wonderjs.getWrapTsSize(/* () */0) | 0) + BufferSourceSizeTextureService$Wonderjs.getMagFiltersSize(/* () */0) | 0) + BufferSourceSizeTextureService$Wonderjs.getMinFiltersSize(/* () */0) | 0) + BufferSourceSizeTextureService$Wonderjs.getFormatsSize(/* () */0) | 0) + BufferSourceSizeTextureService$Wonderjs.getTypesSize(/* () */0) | 0) + BufferSourceSizeTextureService$Wonderjs.getIsNeedUpdatesSize(/* () */0) | 0) + BufferSourceSizeTextureService$Wonderjs.getFlipYsSize(/* () */0) | 0));
}

var getDefaultIsNeedUpdate = BufferSourceTextureService$Wonderjs.getDefaultIsNeedUpdate;

var getDefaultFlipY = BufferSourceTextureService$Wonderjs.getDefaultFlipY;

var getIsNeedUpdateIndex = BufferSourceTextureService$Wonderjs.getIsNeedUpdateIndex;

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
