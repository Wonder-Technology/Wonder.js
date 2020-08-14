'use strict';

var CubemapTextureAPI$Wonderjs = require("../../../../../src/api/texture/CubemapTextureAPI.js");
var CubemapTextureTool$Wonderjs = require("../../../../tool/service/texture/CubemapTextureTool.js");
var OperateGlTextureMapService$Wonderjs = require("../../../../../src/service/primitive/texture/OperateGlTextureMapService.js");
var UpdateCubemapTextureRenderService$Wonderjs = require("../../../../../src/service/state/render/texture/cubemap/UpdateCubemapTextureRenderService.js");
var InitCubemapTextureRenderWorkerTool$Wonderjs = require("./InitCubemapTextureRenderWorkerTool.js");
var RecordCubemapTextureRenderWorkerService$Wonderjs = require("../../../../../src/service/state/render_worker/texture/cubemap/RecordCubemapTextureRenderWorkerService.js");

function unsafeGetAllSources(texture, state) {
  var cubemapTextureRecord = RecordCubemapTextureRenderWorkerService$Wonderjs.getRecord(state);
  return UpdateCubemapTextureRenderService$Wonderjs._getAllSources(texture, /* tuple */[
              cubemapTextureRecord[/* pxSourceMap */18],
              cubemapTextureRecord[/* nxSourceMap */19],
              cubemapTextureRecord[/* pySourceMap */20],
              cubemapTextureRecord[/* nySourceMap */21],
              cubemapTextureRecord[/* pzSourceMap */22],
              cubemapTextureRecord[/* nzSourceMap */23]
            ]);
}

var buildFakeCreateImageBitmapFunc = (
  function(param){
    window.createImageBitmap = function(imageData, config){
    return new Promise(function(resolve, reject){
      resolve([imageData.uint8ClampedArray.arrayBuffer, imageData.width, imageData.height, config ]);
    }) ;
  }


window.ImageData = function(uint8ClampedArray, width, height){
  this.uint8ClampedArray = uint8ClampedArray;
  this.width = width;
  this.height = height;
}


window.Uint8ClampedArray = function(arrayBuffer){
  this.arrayBuffer = arrayBuffer;
}

  }
  );

var clearFakeCreateImageBitmapFunc = (
  function(param){
    window.createImageBitmap = undefined;
  }
  );

function createTwoMaps(state) {
  var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state);
  var map1 = match[1];
  var match$1 = CubemapTextureAPI$Wonderjs.createCubemapTexture(match[0]);
  var map2 = match$1[1];
  var state$1 = CubemapTextureTool$Wonderjs.setAllSources(match$1[0], map1, 100, 200, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  var state$2 = CubemapTextureTool$Wonderjs.setAllSources(state$1, map2, 110, 210, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  return /* tuple */[
          state$2,
          /* tuple */[
            map1,
            map2
          ],
          /* tuple */[
            CubemapTextureTool$Wonderjs.unsafeGetAllSources(map1, state$2),
            CubemapTextureTool$Wonderjs.unsafeGetAllSources(map2, state$2)
          ]
        ];
}

function prepareStateAndCreateTwoMaps(sandbox) {
  var match = InitCubemapTextureRenderWorkerTool$Wonderjs.prepareState(sandbox, /* tuple */[
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22
      ]);
  var match$1 = createTwoMaps(match[0]);
  var match$2 = match$1[2];
  var match$3 = match$1[1];
  return /* tuple */[
          match$1[0],
          match[1],
          /* tuple */[
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22
          ],
          /* tuple */[
            match$3[0],
            match$3[1]
          ],
          /* tuple */[
            match$2[0],
            match$2[1]
          ]
        ];
}

function getTexture(texture, state) {
  return OperateGlTextureMapService$Wonderjs.getTexture(texture, RecordCubemapTextureRenderWorkerService$Wonderjs.getRecord(state)[/* glTextureMap */24]);
}

function setGlTexture(texture, glTexture, state) {
  OperateGlTextureMapService$Wonderjs.setTexture(texture, glTexture, RecordCubemapTextureRenderWorkerService$Wonderjs.getRecord(state)[/* glTextureMap */24]);
  return state;
}

exports.unsafeGetAllSources = unsafeGetAllSources;
exports.buildFakeCreateImageBitmapFunc = buildFakeCreateImageBitmapFunc;
exports.clearFakeCreateImageBitmapFunc = clearFakeCreateImageBitmapFunc;
exports.createTwoMaps = createTwoMaps;
exports.prepareStateAndCreateTwoMaps = prepareStateAndCreateTwoMaps;
exports.getTexture = getTexture;
exports.setGlTexture = setGlTexture;
/* buildFakeCreateImageBitmapFunc Not a pure module */
