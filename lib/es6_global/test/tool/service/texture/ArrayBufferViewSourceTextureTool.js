

import * as OptionService$Wonderjs from "../../../../src/service/atom/OptionService.js";
import * as TextureTypeService$Wonderjs from "../../../../src/service/primitive/texture/TextureTypeService.js";
import * as IndexSourceTextureService$Wonderjs from "../../../../src/service/record/all/texture/IndexSourceTextureService.js";
import * as BufferSourceTextureService$Wonderjs from "../../../../src/service/record/main/texture/BufferSourceTextureService.js";
import * as OperateGlTextureMapService$Wonderjs from "../../../../src/service/primitive/texture/OperateGlTextureMapService.js";
import * as IndexSourceTextureMainService$Wonderjs from "../../../../src/service/state/main/texture/IndexSourceTextureMainService.js";
import * as BufferBasicSourceTextureService$Wonderjs from "../../../../src/service/record/main/texture/BufferBasicSourceTextureService.js";
import * as BufferArrayBufferViewSourceTextureService$Wonderjs from "../../../../src/service/record/main/texture/BufferArrayBufferViewSourceTextureService.js";
import * as OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs from "../../../../src/service/record/all/texture/arrayBufferView_source/OperateTypeArrayArrayBufferViewSourceTextureService.js";

function getRecord(state) {
  return OptionService$Wonderjs.unsafeGet(state[/* arrayBufferViewSourceTextureRecord */19]);
}

var generateArrayBufferViewSourceTextureIndex = IndexSourceTextureMainService$Wonderjs.generateArrayBufferViewSourceTextureIndex;

function unsafeGetTexture(texture, state) {
  return OperateGlTextureMapService$Wonderjs.unsafeGetTexture(IndexSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), OptionService$Wonderjs.unsafeGet(state[/* arrayBufferViewSourceTextureRecord */19])[/* glTextureMap */12]);
}

function isNeedUpdate(texture, state) {
  return OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.getIsNeedUpdate(IndexSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), OptionService$Wonderjs.unsafeGet(state[/* arrayBufferViewSourceTextureRecord */19])[/* isNeedUpdates */7]) === BufferSourceTextureService$Wonderjs.getNeedUpdate(/* () */0);
}

function buildSource() {
  return new Uint8Array(/* array */[
              1,
              255,
              255,
              255
            ]);
}

function getDefaultWrapS() {
  return BufferBasicSourceTextureService$Wonderjs.getDefaultWrapS(/* () */0);
}

function getDefaultWrapT() {
  return BufferBasicSourceTextureService$Wonderjs.getDefaultWrapT(/* () */0);
}

function getDefaultMagFilter() {
  return BufferBasicSourceTextureService$Wonderjs.getDefaultMagFilter(/* () */0);
}

function getDefaultMinFilter() {
  return BufferBasicSourceTextureService$Wonderjs.getDefaultMinFilter(/* () */0);
}

function getDefaultFormat() {
  return BufferBasicSourceTextureService$Wonderjs.getDefaultFormat(/* () */0);
}

function getDefaultType() {
  return TextureTypeService$Wonderjs.getUnsignedByte(/* () */0);
}

function getDefaultIsNeedUpdate() {
  return BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultIsNeedUpdate(/* () */0);
}

function getDefaultWidth() {
  return BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultWidth(/* () */0);
}

function getDefaultHeight() {
  return BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultHeight(/* () */0);
}

export {
  getRecord ,
  generateArrayBufferViewSourceTextureIndex ,
  unsafeGetTexture ,
  isNeedUpdate ,
  buildSource ,
  getDefaultWrapS ,
  getDefaultWrapT ,
  getDefaultMagFilter ,
  getDefaultMinFilter ,
  getDefaultFormat ,
  getDefaultType ,
  getDefaultIsNeedUpdate ,
  getDefaultWidth ,
  getDefaultHeight ,
  
}
/* OptionService-Wonderjs Not a pure module */
