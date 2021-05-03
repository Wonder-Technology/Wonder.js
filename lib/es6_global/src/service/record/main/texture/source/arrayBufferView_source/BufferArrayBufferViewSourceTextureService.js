

import * as Caml_int32 from "./../../../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as TextureTypeService$Wonderjs from "../../../../../primitive/texture/TextureTypeService.js";
import * as BufferTextureService$Wonderjs from "../../BufferTextureService.js";
import * as BufferSizeTextureService$Wonderjs from "../../BufferSizeTextureService.js";
import * as BufferSourceTextureService$Wonderjs from "../BufferSourceTextureService.js";
import * as BufferArrayBufferViewSourceSizeTextureService$Wonderjs from "./BufferArrayBufferViewSourceSizeTextureService.js";

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

function getDefaultWidth(param) {
  return 0;
}

function getDefaultHeight(param) {
  return 0;
}

function getWrapSsLength(arrayBufferViewSourceTextureCount) {
  return Caml_int32.imul(arrayBufferViewSourceTextureCount, BufferSizeTextureService$Wonderjs.getWrapSsSize(/* () */0));
}

function getWrapSsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount) {
  return BufferSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureOffset(basicSourceTextureCount) + 0 | 0;
}

function getWrapSIndex(index) {
  return Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getWrapSsSize(/* () */0));
}

function getWrapTsLength(arrayBufferViewSourceTextureCount) {
  return Caml_int32.imul(arrayBufferViewSourceTextureCount, BufferSizeTextureService$Wonderjs.getWrapTsSize(/* () */0));
}

function getWrapTsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount) {
  return (BufferSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureOffset(basicSourceTextureCount) + 0 | 0) + Caml_int32.imul(Caml_int32.imul(arrayBufferViewSourceTextureCount, BufferSizeTextureService$Wonderjs.getWrapSsSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getWrapTIndex(index) {
  return Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getWrapTsSize(/* () */0));
}

function getMagFiltersLength(arrayBufferViewSourceTextureCount) {
  return Caml_int32.imul(arrayBufferViewSourceTextureCount, BufferSizeTextureService$Wonderjs.getMagFiltersSize(/* () */0));
}

function getMagFiltersOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount) {
  return getWrapTsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount) + Caml_int32.imul(Caml_int32.imul(arrayBufferViewSourceTextureCount, BufferSizeTextureService$Wonderjs.getWrapTsSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getMagFilterIndex(index) {
  return Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getMagFiltersSize(/* () */0));
}

function getMinFiltersLength(arrayBufferViewSourceTextureCount) {
  return Caml_int32.imul(arrayBufferViewSourceTextureCount, BufferSizeTextureService$Wonderjs.getMinFiltersSize(/* () */0));
}

function getMinFiltersOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount) {
  return getMagFiltersOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount) + Caml_int32.imul(Caml_int32.imul(arrayBufferViewSourceTextureCount, BufferSizeTextureService$Wonderjs.getMagFiltersSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getMinFilterIndex(index) {
  return Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getMinFiltersSize(/* () */0));
}

function getFormatsLength(arrayBufferViewSourceTextureCount) {
  return Caml_int32.imul(arrayBufferViewSourceTextureCount, BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0));
}

function getFormatsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount) {
  return getMinFiltersOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount) + Caml_int32.imul(Caml_int32.imul(arrayBufferViewSourceTextureCount, BufferSizeTextureService$Wonderjs.getMinFiltersSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getFormatIndex(index) {
  return Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0));
}

function getTypesLength(arrayBufferViewSourceTextureCount) {
  return Caml_int32.imul(arrayBufferViewSourceTextureCount, BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0));
}

function getTypesOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount) {
  return getFormatsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount) + Caml_int32.imul(Caml_int32.imul(arrayBufferViewSourceTextureCount, BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getTypeIndex(index) {
  return Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0));
}

function getIsNeedUpdatesLength(arrayBufferViewSourceTextureCount) {
  return Caml_int32.imul(arrayBufferViewSourceTextureCount, BufferSizeTextureService$Wonderjs.getIsNeedUpdatesSize(/* () */0));
}

function getIsNeedUpdatesOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount) {
  return getTypesOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount) + Caml_int32.imul(Caml_int32.imul(arrayBufferViewSourceTextureCount, BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getFlipYsLength(arrayBufferViewSourceTextureCount) {
  return Caml_int32.imul(arrayBufferViewSourceTextureCount, BufferSizeTextureService$Wonderjs.getFlipYsSize(/* () */0));
}

function getFlipYsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount) {
  return getIsNeedUpdatesOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount) + Caml_int32.imul(Caml_int32.imul(arrayBufferViewSourceTextureCount, BufferSizeTextureService$Wonderjs.getIsNeedUpdatesSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getFlipYIndex(index) {
  return Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getFlipYsSize(/* () */0));
}

function getWidthsLength(arrayBufferViewSourceTextureCount) {
  return Caml_int32.imul(arrayBufferViewSourceTextureCount, BufferArrayBufferViewSourceSizeTextureService$Wonderjs.getWidthsSize(/* () */0));
}

function getWidthsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount) {
  return getFlipYsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount) + Caml_int32.imul(Caml_int32.imul(arrayBufferViewSourceTextureCount, BufferSizeTextureService$Wonderjs.getFlipYsSize(/* () */0)), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getWidthIndex(index) {
  return Caml_int32.imul(index, BufferArrayBufferViewSourceSizeTextureService$Wonderjs.getWidthsSize(/* () */0));
}

function getHeightsLength(arrayBufferViewSourceTextureCount) {
  return Caml_int32.imul(arrayBufferViewSourceTextureCount, BufferArrayBufferViewSourceSizeTextureService$Wonderjs.getHeightsSize(/* () */0));
}

function getHeightsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount) {
  return getWidthsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount) + Caml_int32.imul(Caml_int32.imul(arrayBufferViewSourceTextureCount, BufferArrayBufferViewSourceSizeTextureService$Wonderjs.getWidthsSize(/* () */0)), Uint16Array.BYTES_PER_ELEMENT) | 0;
}

function getHeightIndex(index) {
  return Caml_int32.imul(index, BufferArrayBufferViewSourceSizeTextureService$Wonderjs.getHeightsSize(/* () */0));
}

function getTotalByteLength(arrayBufferViewSourceTextureCount) {
  return Caml_int32.imul(arrayBufferViewSourceTextureCount, Caml_int32.imul(Uint8Array.BYTES_PER_ELEMENT, ((((((BufferSizeTextureService$Wonderjs.getWrapSsSize(/* () */0) + BufferSizeTextureService$Wonderjs.getWrapTsSize(/* () */0) | 0) + BufferSizeTextureService$Wonderjs.getMagFiltersSize(/* () */0) | 0) + BufferSizeTextureService$Wonderjs.getMinFiltersSize(/* () */0) | 0) + BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0) | 0) + BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0) | 0) + BufferSizeTextureService$Wonderjs.getIsNeedUpdatesSize(/* () */0) | 0) + BufferSizeTextureService$Wonderjs.getFlipYsSize(/* () */0) | 0) + Caml_int32.imul(Uint16Array.BYTES_PER_ELEMENT, BufferArrayBufferViewSourceSizeTextureService$Wonderjs.getWidthsSize(/* () */0) + BufferArrayBufferViewSourceSizeTextureService$Wonderjs.getHeightsSize(/* () */0) | 0) | 0);
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
  getDefaultWidth ,
  getDefaultHeight ,
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
  getWidthsLength ,
  getWidthsOffset ,
  getWidthIndex ,
  getHeightsLength ,
  getHeightsOffset ,
  getHeightIndex ,
  getTotalByteLength ,
  
}
/* BufferSourceTextureService-Wonderjs Not a pure module */
