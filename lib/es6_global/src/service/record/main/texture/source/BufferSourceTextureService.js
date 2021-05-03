

import * as Caml_int32 from "./../../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Worker$Wonderjs from "../../../../../external/Worker.js";
import * as BufferSizeTextureService$Wonderjs from "../BufferSizeTextureService.js";
import * as BufferArrayBufferViewSourceSizeTextureService$Wonderjs from "./arrayBufferView_source/BufferArrayBufferViewSourceSizeTextureService.js";

function _getBasicSourceTotalByteLength(basicSourceTextureCount) {
  return Caml_int32.imul(basicSourceTextureCount, Caml_int32.imul(Uint8Array.BYTES_PER_ELEMENT, ((((((BufferSizeTextureService$Wonderjs.getWrapSsSize(/* () */0) + BufferSizeTextureService$Wonderjs.getWrapTsSize(/* () */0) | 0) + BufferSizeTextureService$Wonderjs.getMagFiltersSize(/* () */0) | 0) + BufferSizeTextureService$Wonderjs.getMinFiltersSize(/* () */0) | 0) + BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0) | 0) + BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0) | 0) + BufferSizeTextureService$Wonderjs.getIsNeedUpdatesSize(/* () */0) | 0) + BufferSizeTextureService$Wonderjs.getFlipYsSize(/* () */0) | 0));
}

function _getArrayBufferViewSourceTotalByteLength(arrayBufferViewSourceTextureCount) {
  return Caml_int32.imul(arrayBufferViewSourceTextureCount, Caml_int32.imul(Uint8Array.BYTES_PER_ELEMENT, ((((((BufferSizeTextureService$Wonderjs.getWrapSsSize(/* () */0) + BufferSizeTextureService$Wonderjs.getWrapTsSize(/* () */0) | 0) + BufferSizeTextureService$Wonderjs.getMagFiltersSize(/* () */0) | 0) + BufferSizeTextureService$Wonderjs.getMinFiltersSize(/* () */0) | 0) + BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0) | 0) + BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0) | 0) + BufferSizeTextureService$Wonderjs.getIsNeedUpdatesSize(/* () */0) | 0) + BufferSizeTextureService$Wonderjs.getFlipYsSize(/* () */0) | 0) + Caml_int32.imul(Uint16Array.BYTES_PER_ELEMENT, BufferArrayBufferViewSourceSizeTextureService$Wonderjs.getWidthsSize(/* () */0) + BufferArrayBufferViewSourceSizeTextureService$Wonderjs.getHeightsSize(/* () */0) | 0) | 0);
}

function getBasicSourceTextureOffset(param) {
  return 0;
}

var getArrayBufferViewSourceTextureOffset = _getBasicSourceTotalByteLength;

function getTotalByteLength(basicSourceTextureCount, arrayBufferViewSourceTextureCount) {
  return _getBasicSourceTotalByteLength(basicSourceTextureCount) + _getArrayBufferViewSourceTotalByteLength(arrayBufferViewSourceTextureCount) | 0;
}

function createBuffer(basicSourceTextureCount, arrayBufferViewSourceTextureCount) {
  return Worker$Wonderjs.newSharedArrayBuffer(getTotalByteLength(basicSourceTextureCount, arrayBufferViewSourceTextureCount));
}

export {
  _getBasicSourceTotalByteLength ,
  _getArrayBufferViewSourceTotalByteLength ,
  getBasicSourceTextureOffset ,
  getArrayBufferViewSourceTextureOffset ,
  getTotalByteLength ,
  createBuffer ,
  
}
/* Worker-Wonderjs Not a pure module */
