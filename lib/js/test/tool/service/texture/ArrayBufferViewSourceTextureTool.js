'use strict';

var Js_option = require("bs-platform/lib/js/js_option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var OptionService$Wonderjs = require("../../../../src/service/atom/OptionService.js");
var MaterialsMapService$Wonderjs = require("../../../../src/service/record/main/texture/MaterialsMapService.js");
var BufferTextureService$Wonderjs = require("../../../../src/service/record/main/texture/BufferTextureService.js");
var TextureSourceMapService$Wonderjs = require("../../../../src/service/primitive/texture/TextureSourceMapService.js");
var OperateGlTextureMapService$Wonderjs = require("../../../../src/service/primitive/texture/OperateGlTextureMapService.js");
var IndexAllSourceTextureService$Wonderjs = require("../../../../src/service/record/all/texture/source/IndexAllSourceTextureService.js");
var IndexSourceTextureMainService$Wonderjs = require("../../../../src/service/state/main/texture/source/IndexSourceTextureMainService.js");
var BufferArrayBufferViewSourceTextureService$Wonderjs = require("../../../../src/service/record/main/texture/source/arrayBufferView_source/BufferArrayBufferViewSourceTextureService.js");
var NameArrayBufferViewSourceTextureMainService$Wonderjs = require("../../../../src/service/state/main/texture/source/arrayBufferView_source/NameArrayBufferViewSourceTextureMainService.js");
var RecordArrayBufferViewSourceTextureMainService$Wonderjs = require("../../../../src/service/state/main/texture/source/arrayBufferView_source/RecordArrayBufferViewSourceTextureMainService.js");
var OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs = require("../../../../src/service/record/all/texture/source/arrayBufferView_source/OperateTypeArrayAllArrayBufferViewSourceTextureService.js");

function getRecord(state) {
  return OptionService$Wonderjs.unsafeGet(state[/* arrayBufferViewSourceTextureRecord */19]);
}

var generateArrayBufferViewSourceTextureIndex = IndexSourceTextureMainService$Wonderjs.generateArrayBufferViewSourceTextureIndex;

function isNeedUpdate(texture, state) {
  return OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.getIsNeedUpdate(IndexAllSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), OptionService$Wonderjs.unsafeGet(state[/* arrayBufferViewSourceTextureRecord */19])[/* isNeedUpdates */7]) === BufferTextureService$Wonderjs.getNeedUpdate(/* () */0);
}

function buildSource(param) {
  return new Uint8Array(/* array */[
              1,
              255,
              255,
              255
            ]);
}

function buildSource2(param) {
  return new Uint8Array(/* array */[
              2,
              255,
              255,
              100
            ]);
}

function getDefaultWrapS(param) {
  return BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultWrapS(/* () */0);
}

function getDefaultWrapT(param) {
  return BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultWrapT(/* () */0);
}

function getDefaultMagFilter(param) {
  return BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultMagFilter(/* () */0);
}

function getDefaultMinFilter(param) {
  return BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultMinFilter(/* () */0);
}

function getDefaultFormat(param) {
  return BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultFormat(/* () */0);
}

function getDefaultType(param) {
  return BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultType(/* () */0);
}

function getDefaultIsNeedUpdate(param) {
  return BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultIsNeedUpdate(/* () */0);
}

function getDefaultWidth(param) {
  return BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultWidth(/* () */0);
}

function getDefaultHeight(param) {
  return BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultHeight(/* () */0);
}

function getMaterialDataArr(texture, state) {
  return MaterialsMapService$Wonderjs.getMaterialDataArr(texture, RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state)[/* materialsMap */18]);
}

function unsafeGetMaterialDataArr(texture, state) {
  return OptionService$Wonderjs.unsafeGet(getMaterialDataArr(texture, state));
}

function getNeedAddedSourceArray(state) {
  return RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state)[/* needAddedSourceArray */14];
}

function getNeedInitedTextureIndexArray(state) {
  return RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state)[/* needInitedTextureIndexArray */15];
}

function getArrayBufferViewSourceTextureSource(texture, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  return TextureSourceMapService$Wonderjs.getSource(texture, match[/* sourceMap */11]);
}

function getTexture(texture, state) {
  return OperateGlTextureMapService$Wonderjs.getTexture(texture, OptionService$Wonderjs.unsafeGet(state[/* arrayBufferViewSourceTextureRecord */19])[/* glTextureMap */12]);
}

function unsafeGetTexture(texture, state) {
  return OperateGlTextureMapService$Wonderjs.unsafeGetTexture(texture, OptionService$Wonderjs.unsafeGet(state[/* arrayBufferViewSourceTextureRecord */19])[/* glTextureMap */12]);
}

function setGlTexture(texture, glTexture, state) {
  OperateGlTextureMapService$Wonderjs.setTexture(texture, glTexture, OptionService$Wonderjs.unsafeGet(state[/* arrayBufferViewSourceTextureRecord */19])[/* glTextureMap */12]);
  return state;
}

var getArrayBufferViewSourceTextureName = NameArrayBufferViewSourceTextureMainService$Wonderjs.getName;

function hasMaterial(texture, material, state) {
  var match = MaterialsMapService$Wonderjs.getMaterialDataArr(texture, RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state)[/* materialsMap */18]);
  if (match !== undefined) {
    return Js_option.isSome(Caml_option.undefined_to_opt(match.find((function (param) {
                          return param[0] === material;
                        }))));
  } else {
    return false;
  }
}

exports.getRecord = getRecord;
exports.generateArrayBufferViewSourceTextureIndex = generateArrayBufferViewSourceTextureIndex;
exports.isNeedUpdate = isNeedUpdate;
exports.buildSource = buildSource;
exports.buildSource2 = buildSource2;
exports.getDefaultWrapS = getDefaultWrapS;
exports.getDefaultWrapT = getDefaultWrapT;
exports.getDefaultMagFilter = getDefaultMagFilter;
exports.getDefaultMinFilter = getDefaultMinFilter;
exports.getDefaultFormat = getDefaultFormat;
exports.getDefaultType = getDefaultType;
exports.getDefaultIsNeedUpdate = getDefaultIsNeedUpdate;
exports.getDefaultWidth = getDefaultWidth;
exports.getDefaultHeight = getDefaultHeight;
exports.getMaterialDataArr = getMaterialDataArr;
exports.unsafeGetMaterialDataArr = unsafeGetMaterialDataArr;
exports.getNeedAddedSourceArray = getNeedAddedSourceArray;
exports.getNeedInitedTextureIndexArray = getNeedInitedTextureIndexArray;
exports.getArrayBufferViewSourceTextureSource = getArrayBufferViewSourceTextureSource;
exports.getTexture = getTexture;
exports.unsafeGetTexture = unsafeGetTexture;
exports.setGlTexture = setGlTexture;
exports.getArrayBufferViewSourceTextureName = getArrayBufferViewSourceTextureName;
exports.hasMaterial = hasMaterial;
/* OptionService-Wonderjs Not a pure module */
