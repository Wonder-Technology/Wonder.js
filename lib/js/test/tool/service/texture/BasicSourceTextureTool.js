'use strict';

var Js_option = require("bs-platform/lib/js/js_option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var TextureTool$Wonderjs = require("./TextureTool.js");
var OptionService$Wonderjs = require("../../../../src/service/atom/OptionService.js");
var TextureTypeService$Wonderjs = require("../../../../src/service/primitive/texture/TextureTypeService.js");
var MaterialsMapService$Wonderjs = require("../../../../src/service/record/main/texture/MaterialsMapService.js");
var TextureIndexService$Wonderjs = require("../../../../src/service/primitive/material/TextureIndexService.js");
var BufferTextureService$Wonderjs = require("../../../../src/service/record/main/texture/BufferTextureService.js");
var BasicSourceTextureAPI$Wonderjs = require("../../../../src/api/texture/BasicSourceTextureAPI.js");
var TextureSourceMapService$Wonderjs = require("../../../../src/service/primitive/texture/TextureSourceMapService.js");
var OperateGlTextureMapService$Wonderjs = require("../../../../src/service/primitive/texture/OperateGlTextureMapService.js");
var BufferBasicSourceTextureService$Wonderjs = require("../../../../src/service/record/main/texture/source/basic_source/BufferBasicSourceTextureService.js");
var RecordBasicSourceTextureMainService$Wonderjs = require("../../../../src/service/state/main/texture/source/basic_source/RecordBasicSourceTextureMainService.js");
var DisposeBasicSourceTextureMainService$Wonderjs = require("../../../../src/service/state/main/texture/source/basic_source/DisposeBasicSourceTextureMainService.js");

function getRecord(state) {
  return OptionService$Wonderjs.unsafeGet(state[/* basicSourceTextureRecord */18]);
}

function getTexture(texture, state) {
  return OperateGlTextureMapService$Wonderjs.getTexture(texture, OptionService$Wonderjs.unsafeGet(state[/* basicSourceTextureRecord */18])[/* glTextureMap */10]);
}

function unsafeGetTexture(texture, state) {
  return OperateGlTextureMapService$Wonderjs.unsafeGetTexture(texture, OptionService$Wonderjs.unsafeGet(state[/* basicSourceTextureRecord */18])[/* glTextureMap */10]);
}

function setGlTexture(texture, glTexture, state) {
  OperateGlTextureMapService$Wonderjs.setTexture(texture, glTexture, OptionService$Wonderjs.unsafeGet(state[/* basicSourceTextureRecord */18])[/* glTextureMap */10]);
  return state;
}

function getDefaultTextureIndex(param) {
  return TextureIndexService$Wonderjs.getDefaultTextureIndex(/* () */0);
}

function getNearest(param) {
  return TextureTool$Wonderjs.getNearest(/* () */0);
}

function getNearestMipmapNearest(param) {
  return TextureTool$Wonderjs.getNearestMipmapNearest(/* () */0);
}

function getLinear(param) {
  return TextureTool$Wonderjs.getLinear(/* () */0);
}

function getNearestMipmapLinear(param) {
  return TextureTool$Wonderjs.getNearestMipmapLinear(/* () */0);
}

function getLinearMipmapNearest(param) {
  return TextureTool$Wonderjs.getLinearMipmapNearest(/* () */0);
}

function getLinearMipmapLinear(param) {
  return TextureTool$Wonderjs.getLinearMipmapLinear(/* () */0);
}

function getRgb(param) {
  return /* Rgb */0;
}

function getRgba(param) {
  return /* Rgba */1;
}

function getAlpha(param) {
  return /* Alpha */2;
}

function getUnsignedByte(param) {
  return TextureTypeService$Wonderjs.getUnsignedByte(/* () */0);
}

function getUnsignedShort565(param) {
  return TextureTypeService$Wonderjs.getUnsignedShort565(/* () */0);
}

function buildSource(width, height) {
  return {
          width: width,
          height: height
        };
}

function getDefaultWrapS(param) {
  return BufferBasicSourceTextureService$Wonderjs.getDefaultWrapS(/* () */0);
}

function getDefaultWrapT(param) {
  return BufferBasicSourceTextureService$Wonderjs.getDefaultWrapT(/* () */0);
}

function getDefaultMagFilter(param) {
  return BufferBasicSourceTextureService$Wonderjs.getDefaultMagFilter(/* () */0);
}

function getDefaultMinFilter(param) {
  return BufferBasicSourceTextureService$Wonderjs.getDefaultMinFilter(/* () */0);
}

function getDefaultFormat(param) {
  return BufferBasicSourceTextureService$Wonderjs.getDefaultFormat(/* () */0);
}

function getDefaultType(param) {
  return BufferBasicSourceTextureService$Wonderjs.getDefaultType(/* () */0);
}

function getDefaultIsNeedUpdate(param) {
  return BufferTextureService$Wonderjs.getDefaultIsNeedUpdate(/* () */0);
}

function getDefaultFlipYBool(param) {
  return false;
}

function getMaterialDataArr(texture, state) {
  return MaterialsMapService$Wonderjs.getMaterialDataArr(texture, RecordBasicSourceTextureMainService$Wonderjs.getRecord(state)[/* materialsMap */16]);
}

function unsafeGetMaterialDataArr(texture, state) {
  return OptionService$Wonderjs.unsafeGet(getMaterialDataArr(texture, state));
}

function getBasicSourceTextureSource(texture, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  return TextureSourceMapService$Wonderjs.getSource(texture, match[/* sourceMap */9]);
}

function getNeedAddedSourceArray(state) {
  return RecordBasicSourceTextureMainService$Wonderjs.getRecord(state)[/* needAddedSourceArray */12];
}

function getNeedInitedTextureIndexArray(state) {
  return RecordBasicSourceTextureMainService$Wonderjs.getRecord(state)[/* needInitedTextureIndexArray */13];
}

function getDisposedIndexArray(state) {
  return RecordBasicSourceTextureMainService$Wonderjs.getRecord(state)[/* disposedIndexArray */11];
}

function getMaterialDataArr$1(texture, state) {
  return MaterialsMapService$Wonderjs.getMaterialDataArr(texture, RecordBasicSourceTextureMainService$Wonderjs.getRecord(state)[/* materialsMap */16]);
}

function hasMaterial(texture, material, state) {
  var match = getMaterialDataArr$1(texture, state);
  if (match !== undefined) {
    return Js_option.isSome(Caml_option.undefined_to_opt(match.find((function (param) {
                          return param[0] === material;
                        }))));
  } else {
    return false;
  }
}

function isAlive(texture, engineState) {
  return DisposeBasicSourceTextureMainService$Wonderjs.isAlive(texture, RecordBasicSourceTextureMainService$Wonderjs.getRecord(engineState));
}

var getNeedUpdate = BufferTextureService$Wonderjs.getNeedUpdate;

var getNotNeedUpdate = BufferTextureService$Wonderjs.getNotNeedUpdate;

var getIsNeedUpdate = BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureIsNeedUpdate;

var setIsNeedUpdate = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureIsNeedUpdate;

exports.getRecord = getRecord;
exports.getTexture = getTexture;
exports.unsafeGetTexture = unsafeGetTexture;
exports.setGlTexture = setGlTexture;
exports.getDefaultTextureIndex = getDefaultTextureIndex;
exports.getNearest = getNearest;
exports.getNearestMipmapNearest = getNearestMipmapNearest;
exports.getLinear = getLinear;
exports.getNearestMipmapLinear = getNearestMipmapLinear;
exports.getLinearMipmapNearest = getLinearMipmapNearest;
exports.getLinearMipmapLinear = getLinearMipmapLinear;
exports.getRgb = getRgb;
exports.getRgba = getRgba;
exports.getAlpha = getAlpha;
exports.getUnsignedByte = getUnsignedByte;
exports.getUnsignedShort565 = getUnsignedShort565;
exports.buildSource = buildSource;
exports.getDefaultWrapS = getDefaultWrapS;
exports.getDefaultWrapT = getDefaultWrapT;
exports.getDefaultMagFilter = getDefaultMagFilter;
exports.getDefaultMinFilter = getDefaultMinFilter;
exports.getDefaultFormat = getDefaultFormat;
exports.getDefaultType = getDefaultType;
exports.getDefaultIsNeedUpdate = getDefaultIsNeedUpdate;
exports.getDefaultFlipYBool = getDefaultFlipYBool;
exports.getNeedUpdate = getNeedUpdate;
exports.getNotNeedUpdate = getNotNeedUpdate;
exports.getIsNeedUpdate = getIsNeedUpdate;
exports.setIsNeedUpdate = setIsNeedUpdate;
exports.unsafeGetMaterialDataArr = unsafeGetMaterialDataArr;
exports.getBasicSourceTextureSource = getBasicSourceTextureSource;
exports.getNeedAddedSourceArray = getNeedAddedSourceArray;
exports.getNeedInitedTextureIndexArray = getNeedInitedTextureIndexArray;
exports.getDisposedIndexArray = getDisposedIndexArray;
exports.getMaterialDataArr = getMaterialDataArr$1;
exports.hasMaterial = hasMaterial;
exports.isAlive = isAlive;
/* OptionService-Wonderjs Not a pure module */
