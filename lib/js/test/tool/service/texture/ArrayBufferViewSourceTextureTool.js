'use strict';

var OptionService$Wonderjs = require("../../../../src/service/atom/OptionService.js");
var TextureTypeService$Wonderjs = require("../../../../src/service/primitive/texture/TextureTypeService.js");
var IndexSourceTextureService$Wonderjs = require("../../../../src/service/record/all/texture/IndexSourceTextureService.js");
var BufferSourceTextureService$Wonderjs = require("../../../../src/service/record/main/texture/BufferSourceTextureService.js");
var OperateGlTextureMapService$Wonderjs = require("../../../../src/service/primitive/texture/OperateGlTextureMapService.js");
var IndexSourceTextureMainService$Wonderjs = require("../../../../src/service/state/main/texture/IndexSourceTextureMainService.js");
var BufferBasicSourceTextureService$Wonderjs = require("../../../../src/service/record/main/texture/BufferBasicSourceTextureService.js");
var BufferArrayBufferViewSourceTextureService$Wonderjs = require("../../../../src/service/record/main/texture/BufferArrayBufferViewSourceTextureService.js");
var OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs = require("../../../../src/service/record/all/texture/arrayBufferView_source/OperateTypeArrayArrayBufferViewSourceTextureService.js");

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

exports.getRecord = getRecord;
exports.generateArrayBufferViewSourceTextureIndex = generateArrayBufferViewSourceTextureIndex;
exports.unsafeGetTexture = unsafeGetTexture;
exports.isNeedUpdate = isNeedUpdate;
exports.buildSource = buildSource;
exports.getDefaultWrapS = getDefaultWrapS;
exports.getDefaultWrapT = getDefaultWrapT;
exports.getDefaultMagFilter = getDefaultMagFilter;
exports.getDefaultMinFilter = getDefaultMinFilter;
exports.getDefaultFormat = getDefaultFormat;
exports.getDefaultType = getDefaultType;
exports.getDefaultIsNeedUpdate = getDefaultIsNeedUpdate;
exports.getDefaultWidth = getDefaultWidth;
exports.getDefaultHeight = getDefaultHeight;
/* OptionService-Wonderjs Not a pure module */
