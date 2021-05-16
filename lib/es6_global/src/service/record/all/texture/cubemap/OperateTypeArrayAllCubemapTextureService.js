

import * as TypeArrayService$Wonderjs from "../../../../primitive/buffer/TypeArrayService.js";
import * as BufferTextureService$Wonderjs from "../../../main/texture/BufferTextureService.js";
import * as BufferCubemapTextureService$Wonderjs from "../../../main/texture/cubemap/BufferCubemapTextureService.js";
import * as OperateTypeArrayTextureService$Wonderjs from "../OperateTypeArrayTextureService.js";

function getWrapS(index, typeArr) {
  return TypeArrayService$Wonderjs.getUint8_1(BufferCubemapTextureService$Wonderjs.getWrapSIndex(index), typeArr);
}

function setWrapS(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setUint8_1(BufferCubemapTextureService$Wonderjs.getWrapSIndex(index), data, typeArr);
}

function getWrapT(index, typeArr) {
  return TypeArrayService$Wonderjs.getUint8_1(BufferCubemapTextureService$Wonderjs.getWrapTIndex(index), typeArr);
}

function setWrapT(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setUint8_1(BufferCubemapTextureService$Wonderjs.getWrapTIndex(index), data, typeArr);
}

function getMagFilter(index, typeArr) {
  return TypeArrayService$Wonderjs.getUint8_1(BufferCubemapTextureService$Wonderjs.getMagFilterIndex(index), typeArr);
}

function setMagFilter(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setUint8_1(BufferCubemapTextureService$Wonderjs.getMagFilterIndex(index), data, typeArr);
}

function getMinFilter(index, typeArr) {
  return TypeArrayService$Wonderjs.getUint8_1(BufferCubemapTextureService$Wonderjs.getMinFilterIndex(index), typeArr);
}

function setMinFilter(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setUint8_1(BufferCubemapTextureService$Wonderjs.getMinFilterIndex(index), data, typeArr);
}

function getIsNeedUpdate(index, typeArr) {
  return TypeArrayService$Wonderjs.getUint8_1(BufferCubemapTextureService$Wonderjs.getIsNeedUpdateIndex(index), typeArr);
}

function getFlipY(index, typeArr) {
  return TypeArrayService$Wonderjs.getUint8_1(BufferCubemapTextureService$Wonderjs.getFlipYIndex(index), typeArr);
}

function setFlipY(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setUint8_1(BufferCubemapTextureService$Wonderjs.getFlipYIndex(index), data, typeArr);
}

function isFlipY(index, typeArr) {
  return TypeArrayService$Wonderjs.getUint8_1(BufferCubemapTextureService$Wonderjs.getFlipYIndex(index), typeArr) === BufferTextureService$Wonderjs.getFlipY(/* () */0);
}

function getFormat(index, typeArr) {
  return TypeArrayService$Wonderjs.getUint8_1(BufferCubemapTextureService$Wonderjs.getFormatIndex(index), typeArr);
}

function setFormat(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setUint8_1(BufferCubemapTextureService$Wonderjs.getFormatIndex(index), data, typeArr);
}

function getType(index, typeArr) {
  return TypeArrayService$Wonderjs.getUint8_1(BufferCubemapTextureService$Wonderjs.getTypeIndex(index), typeArr);
}

function setType(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setUint8_1(BufferCubemapTextureService$Wonderjs.getTypeIndex(index), data, typeArr);
}

var setIsNeedUpdate = OperateTypeArrayTextureService$Wonderjs.setIsNeedUpdate;

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
  
}
/* TypeArrayService-Wonderjs Not a pure module */
