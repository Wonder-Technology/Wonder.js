

import * as Caml_int32 from "../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Worker$Wonderjs from "../../../../external/Worker.js";
import * as BufferSourceSizeTextureService$Wonderjs from "./BufferSourceSizeTextureService.js";

function _getBasicSourceTotalByteLength(basicSourceTextureCount) {
  return Caml_int32.imul(basicSourceTextureCount, Caml_int32.imul(Uint8Array.BYTES_PER_ELEMENT, ((((((BufferSourceSizeTextureService$Wonderjs.getWrapSsSize(/* () */0) + BufferSourceSizeTextureService$Wonderjs.getWrapTsSize(/* () */0) | 0) + BufferSourceSizeTextureService$Wonderjs.getMagFiltersSize(/* () */0) | 0) + BufferSourceSizeTextureService$Wonderjs.getMinFiltersSize(/* () */0) | 0) + BufferSourceSizeTextureService$Wonderjs.getFormatsSize(/* () */0) | 0) + BufferSourceSizeTextureService$Wonderjs.getTypesSize(/* () */0) | 0) + BufferSourceSizeTextureService$Wonderjs.getIsNeedUpdatesSize(/* () */0) | 0) + BufferSourceSizeTextureService$Wonderjs.getFlipYsSize(/* () */0) | 0));
}

function _getArrayBufferViewSourceTotalByteLength(arrayBufferViewSourceTextureCount) {
  return Caml_int32.imul(arrayBufferViewSourceTextureCount, Caml_int32.imul(Uint8Array.BYTES_PER_ELEMENT, ((((((BufferSourceSizeTextureService$Wonderjs.getWrapSsSize(/* () */0) + BufferSourceSizeTextureService$Wonderjs.getWrapTsSize(/* () */0) | 0) + BufferSourceSizeTextureService$Wonderjs.getMagFiltersSize(/* () */0) | 0) + BufferSourceSizeTextureService$Wonderjs.getMinFiltersSize(/* () */0) | 0) + BufferSourceSizeTextureService$Wonderjs.getFormatsSize(/* () */0) | 0) + BufferSourceSizeTextureService$Wonderjs.getTypesSize(/* () */0) | 0) + BufferSourceSizeTextureService$Wonderjs.getIsNeedUpdatesSize(/* () */0) | 0) + BufferSourceSizeTextureService$Wonderjs.getFlipYsSize(/* () */0) | 0) + Caml_int32.imul(Uint16Array.BYTES_PER_ELEMENT, BufferSourceSizeTextureService$Wonderjs.getWidthsSize(/* () */0) + BufferSourceSizeTextureService$Wonderjs.getHeightsSize(/* () */0) | 0) | 0);
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

function getNeedUpdate(param) {
  return /* NeedUpdate */1;
}

function getNotNeedUpdate(param) {
  return /* Not_needUpdate */0;
}

function getDefaultIsNeedUpdate(param) {
  return /* NeedUpdate */1;
}

function getFlipY(param) {
  return /* Flipy */1;
}

function getNotFlipY(param) {
  return /* Not_flipy */0;
}

function getFlipYTypeArrayValue(isFlipY) {
  if (isFlipY) {
    return /* Flipy */1;
  } else {
    return /* Not_flipy */0;
  }
}

function getFlipYFromTypeArrayValue(isFlipY) {
  if (isFlipY) {
    return true;
  } else {
    return false;
  }
}

function getDefaultFlipY(param) {
  return /* Flipy */1;
}

function getIsNeedUpdateIndex(index) {
  return Caml_int32.imul(index, BufferSourceSizeTextureService$Wonderjs.getIsNeedUpdatesSize(/* () */0));
}

export {
  _getBasicSourceTotalByteLength ,
  _getArrayBufferViewSourceTotalByteLength ,
  getBasicSourceTextureOffset ,
  getArrayBufferViewSourceTextureOffset ,
  getTotalByteLength ,
  createBuffer ,
  getNeedUpdate ,
  getNotNeedUpdate ,
  getDefaultIsNeedUpdate ,
  getFlipY ,
  getNotFlipY ,
  getFlipYTypeArrayValue ,
  getFlipYFromTypeArrayValue ,
  getDefaultFlipY ,
  getIsNeedUpdateIndex ,
  
}
/* Worker-Wonderjs Not a pure module */
