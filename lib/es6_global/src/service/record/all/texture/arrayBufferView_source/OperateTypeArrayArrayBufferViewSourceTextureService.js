

import * as TypeArrayService$Wonderjs from "../../../../primitive/buffer/TypeArrayService.js";
import * as BufferSourceTextureService$Wonderjs from "../../../main/texture/BufferSourceTextureService.js";
import * as BufferArrayBufferViewSourceTextureService$Wonderjs from "../../../main/texture/BufferArrayBufferViewSourceTextureService.js";

function getWrapS(index, typeArr) {
  return TypeArrayService$Wonderjs.getUint8_1(BufferArrayBufferViewSourceTextureService$Wonderjs.getWrapSIndex(index), typeArr);
}

function setWrapS(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setUint8_1(BufferArrayBufferViewSourceTextureService$Wonderjs.getWrapSIndex(index), data, typeArr);
}

function getWrapT(index, typeArr) {
  return TypeArrayService$Wonderjs.getUint8_1(BufferArrayBufferViewSourceTextureService$Wonderjs.getWrapTIndex(index), typeArr);
}

function setWrapT(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setUint8_1(BufferArrayBufferViewSourceTextureService$Wonderjs.getWrapTIndex(index), data, typeArr);
}

function getMagFilter(index, typeArr) {
  return TypeArrayService$Wonderjs.getUint8_1(BufferArrayBufferViewSourceTextureService$Wonderjs.getMagFilterIndex(index), typeArr);
}

function setMagFilter(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setUint8_1(BufferArrayBufferViewSourceTextureService$Wonderjs.getMagFilterIndex(index), data, typeArr);
}

function getMinFilter(index, typeArr) {
  return TypeArrayService$Wonderjs.getUint8_1(BufferArrayBufferViewSourceTextureService$Wonderjs.getMinFilterIndex(index), typeArr);
}

function setMinFilter(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setUint8_1(BufferArrayBufferViewSourceTextureService$Wonderjs.getMinFilterIndex(index), data, typeArr);
}

function getIsNeedUpdate(index, typeArr) {
  return TypeArrayService$Wonderjs.getUint8_1(BufferArrayBufferViewSourceTextureService$Wonderjs.getIsNeedUpdateIndex(index), typeArr);
}

function setIsNeedUpdate(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setUint8_1(BufferArrayBufferViewSourceTextureService$Wonderjs.getIsNeedUpdateIndex(index), data, typeArr);
}

function getFlipY(index, typeArr) {
  return TypeArrayService$Wonderjs.getUint8_1(BufferArrayBufferViewSourceTextureService$Wonderjs.getFlipYIndex(index), typeArr);
}

function setFlipY(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setUint8_1(BufferArrayBufferViewSourceTextureService$Wonderjs.getFlipYIndex(index), data, typeArr);
}

function isFlipY(index, typeArr) {
  return TypeArrayService$Wonderjs.getUint8_1(BufferArrayBufferViewSourceTextureService$Wonderjs.getFlipYIndex(index), typeArr) === BufferSourceTextureService$Wonderjs.getFlipY(/* () */0);
}

function getFormat(index, typeArr) {
  return TypeArrayService$Wonderjs.getUint8_1(BufferArrayBufferViewSourceTextureService$Wonderjs.getFormatIndex(index), typeArr);
}

function setFormat(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setUint8_1(BufferArrayBufferViewSourceTextureService$Wonderjs.getFormatIndex(index), data, typeArr);
}

function getType(index, typeArr) {
  return TypeArrayService$Wonderjs.getUint8_1(BufferArrayBufferViewSourceTextureService$Wonderjs.getTypeIndex(index), typeArr);
}

function setType(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setUint8_1(BufferArrayBufferViewSourceTextureService$Wonderjs.getTypeIndex(index), data, typeArr);
}

function getWidth(index, typeArr) {
  return TypeArrayService$Wonderjs.getUint16_1(BufferArrayBufferViewSourceTextureService$Wonderjs.getWidthIndex(index), typeArr);
}

function setWidth(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setUint16_1(BufferArrayBufferViewSourceTextureService$Wonderjs.getWidthIndex(index), data, typeArr);
}

function getHeight(index, typeArr) {
  return TypeArrayService$Wonderjs.getUint16_1(BufferArrayBufferViewSourceTextureService$Wonderjs.getHeightIndex(index), typeArr);
}

function setHeight(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setUint16_1(BufferArrayBufferViewSourceTextureService$Wonderjs.getHeightIndex(index), data, typeArr);
}

export {
  getWrapS ,
  setWrapS ,
  getWrapT ,
  setWrapT ,
  getMagFilter ,
  setMagFilter ,
  getMinFilter ,
  setMinFilter ,
  getIsNeedUpdate ,
  setIsNeedUpdate ,
  getFlipY ,
  setFlipY ,
  isFlipY ,
  getFormat ,
  setFormat ,
  getType ,
  setType ,
  getWidth ,
  setWidth ,
  getHeight ,
  setHeight ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
