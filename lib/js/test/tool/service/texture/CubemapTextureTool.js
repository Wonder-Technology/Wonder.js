'use strict';

var OptionService$Wonderjs = require("../../../../src/service/atom/OptionService.js");
var CubemapTextureAPI$Wonderjs = require("../../../../src/api/texture/CubemapTextureAPI.js");
var BufferTextureService$Wonderjs = require("../../../../src/service/record/main/texture/BufferTextureService.js");
var TextureSourceMapService$Wonderjs = require("../../../../src/service/primitive/texture/TextureSourceMapService.js");
var OperateGlTextureMapService$Wonderjs = require("../../../../src/service/primitive/texture/OperateGlTextureMapService.js");
var BufferCubemapTextureService$Wonderjs = require("../../../../src/service/record/main/texture/cubemap/BufferCubemapTextureService.js");
var RecordCubemapTextureMainService$Wonderjs = require("../../../../src/service/state/main/texture/cubemap/RecordCubemapTextureMainService.js");
var UpdateCubemapTextureRenderService$Wonderjs = require("../../../../src/service/state/render/texture/cubemap/UpdateCubemapTextureRenderService.js");

function getRecord(state) {
  return OptionService$Wonderjs.unsafeGet(state[/* cubemapTextureRecord */20]);
}

function getTexture(texture, state) {
  return OperateGlTextureMapService$Wonderjs.getTexture(texture, OptionService$Wonderjs.unsafeGet(state[/* cubemapTextureRecord */20])[/* glTextureMap */26]);
}

function unsafeGetTexture(texture, state) {
  return OperateGlTextureMapService$Wonderjs.unsafeGetTexture(texture, OptionService$Wonderjs.unsafeGet(state[/* cubemapTextureRecord */20])[/* glTextureMap */26]);
}

function setGlTexture(texture, glTexture, state) {
  OperateGlTextureMapService$Wonderjs.setTexture(texture, glTexture, OptionService$Wonderjs.unsafeGet(state[/* cubemapTextureRecord */20])[/* glTextureMap */26]);
  return state;
}

function getDefaultWrapS(param) {
  return BufferCubemapTextureService$Wonderjs.getDefaultWrapS(/* () */0);
}

function getDefaultWrapT(param) {
  return BufferCubemapTextureService$Wonderjs.getDefaultWrapT(/* () */0);
}

function getDefaultMagFilter(param) {
  return BufferCubemapTextureService$Wonderjs.getDefaultMagFilter(/* () */0);
}

function getDefaultMinFilter(param) {
  return BufferCubemapTextureService$Wonderjs.getDefaultMinFilter(/* () */0);
}

function getDefaultFormat(param) {
  return BufferCubemapTextureService$Wonderjs.getDefaultFormat(/* () */0);
}

function getDefaultType(param) {
  return BufferCubemapTextureService$Wonderjs.getDefaultType(/* () */0);
}

function getDefaultIsNeedUpdate(param) {
  return BufferTextureService$Wonderjs.getDefaultIsNeedUpdate(/* () */0);
}

function getDefaultFlipY(param) {
  return BufferCubemapTextureService$Wonderjs.getDefaultFlipY(/* () */0);
}

function buildSource($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var width = $staropt$star !== undefined ? $staropt$star : 4;
  var height = $staropt$star$1 !== undefined ? $staropt$star$1 : 4;
  var src = $staropt$star$2 !== undefined ? $staropt$star$2 : "";
  var name = $staropt$star$3 !== undefined ? $staropt$star$3 : "source";
  return {
          width: width,
          height: height,
          src: src,
          name: name
        };
}

function getCubemapTexturePXSource(texture, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return TextureSourceMapService$Wonderjs.getSource(texture, match[/* pxSourceMap */20]);
}

function getCubemapTextureNZSource(texture, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return TextureSourceMapService$Wonderjs.getSource(texture, match[/* nzSourceMap */25]);
}

function getAllSources(texture, state) {
  var cubemapTextureRecord = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return UpdateCubemapTextureRenderService$Wonderjs._getAllSources(texture, /* tuple */[
              cubemapTextureRecord[/* pxSourceMap */20],
              cubemapTextureRecord[/* nxSourceMap */21],
              cubemapTextureRecord[/* pySourceMap */22],
              cubemapTextureRecord[/* nySourceMap */23],
              cubemapTextureRecord[/* pzSourceMap */24],
              cubemapTextureRecord[/* nzSourceMap */25]
            ]);
}

function unsafeGetAllSources(texture, state) {
  return OptionService$Wonderjs.unsafeGet(getAllSources(texture, state));
}

function setAllSources(state, texture, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, param) {
  var width = $staropt$star !== undefined ? $staropt$star : 4;
  var height = $staropt$star$1 !== undefined ? $staropt$star$1 : 4;
  var image1Name = $staropt$star$2 !== undefined ? $staropt$star$2 : "i1";
  var image2Name = $staropt$star$3 !== undefined ? $staropt$star$3 : "i2";
  var image3Name = $staropt$star$4 !== undefined ? $staropt$star$4 : "i3";
  var image4Name = $staropt$star$5 !== undefined ? $staropt$star$5 : "i4";
  var image5Name = $staropt$star$6 !== undefined ? $staropt$star$6 : "i5";
  var image6Name = $staropt$star$7 !== undefined ? $staropt$star$7 : "i6";
  var source1 = buildSource(width, height, "px", image1Name, /* () */0);
  var source2 = buildSource(width, height, "nx", image2Name, /* () */0);
  var source3 = buildSource(width, height, "py", image3Name, /* () */0);
  var source4 = buildSource(width, height, "ny", image4Name, /* () */0);
  var source5 = buildSource(width, height, "pz", image5Name, /* () */0);
  var source6 = buildSource(width, height, "nz", image6Name, /* () */0);
  return CubemapTextureAPI$Wonderjs.setCubemapTextureNZSource(texture, source6, CubemapTextureAPI$Wonderjs.setCubemapTexturePZSource(texture, source5, CubemapTextureAPI$Wonderjs.setCubemapTextureNYSource(texture, source4, CubemapTextureAPI$Wonderjs.setCubemapTexturePYSource(texture, source3, CubemapTextureAPI$Wonderjs.setCubemapTextureNXSource(texture, source2, CubemapTextureAPI$Wonderjs.setCubemapTexturePXSource(texture, source1, state))))));
}

function getDefaultIsNeedUpdateBool(param) {
  return BufferTextureService$Wonderjs.getDefaultIsNeedUpdate(/* () */0) === BufferTextureService$Wonderjs.getNeedUpdate(/* () */0);
}

function getNeedAddedAllSourceArray(state) {
  var cubemapTextureRecord = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return /* array */[
          cubemapTextureRecord[/* needAddedPXSourceArray */28],
          cubemapTextureRecord[/* needAddedNXSourceArray */29],
          cubemapTextureRecord[/* needAddedPYSourceArray */30],
          cubemapTextureRecord[/* needAddedNYSourceArray */31],
          cubemapTextureRecord[/* needAddedPZSourceArray */32],
          cubemapTextureRecord[/* needAddedNZSourceArray */33]
        ];
}

function getNeedInitedTextureIndexArray(state) {
  return RecordCubemapTextureMainService$Wonderjs.getRecord(state)[/* needInitedTextureIndexArray */34];
}

function getDefaultFlipYBool(param) {
  return false;
}

var getIsNeedUpdate = CubemapTextureAPI$Wonderjs.getCubemapTextureIsNeedUpdate;

var setIsNeedUpdate = CubemapTextureAPI$Wonderjs.setCubemapTextureIsNeedUpdate;

exports.getRecord = getRecord;
exports.getTexture = getTexture;
exports.unsafeGetTexture = unsafeGetTexture;
exports.setGlTexture = setGlTexture;
exports.getDefaultWrapS = getDefaultWrapS;
exports.getDefaultWrapT = getDefaultWrapT;
exports.getDefaultMagFilter = getDefaultMagFilter;
exports.getDefaultMinFilter = getDefaultMinFilter;
exports.getDefaultFormat = getDefaultFormat;
exports.getDefaultType = getDefaultType;
exports.getDefaultIsNeedUpdate = getDefaultIsNeedUpdate;
exports.getDefaultFlipY = getDefaultFlipY;
exports.buildSource = buildSource;
exports.getCubemapTexturePXSource = getCubemapTexturePXSource;
exports.getCubemapTextureNZSource = getCubemapTextureNZSource;
exports.getAllSources = getAllSources;
exports.unsafeGetAllSources = unsafeGetAllSources;
exports.setAllSources = setAllSources;
exports.getIsNeedUpdate = getIsNeedUpdate;
exports.setIsNeedUpdate = setIsNeedUpdate;
exports.getDefaultIsNeedUpdateBool = getDefaultIsNeedUpdateBool;
exports.getNeedAddedAllSourceArray = getNeedAddedAllSourceArray;
exports.getNeedInitedTextureIndexArray = getNeedInitedTextureIndexArray;
exports.getDefaultFlipYBool = getDefaultFlipYBool;
/* OptionService-Wonderjs Not a pure module */
