'use strict';

var CameraTool$Wonderjs = require("../../../../tool/service/camera/CameraTool.js");
var WorkerWorkerTool$Wonderjs = require("../WorkerWorkerTool.js");
var BasicSourceTextureAPI$Wonderjs = require("../../../../../src/api/texture/BasicSourceTextureAPI.js");
var BasicSourceTextureTool$Wonderjs = require("../../../../tool/service/texture/BasicSourceTextureTool.js");
var FrontRenderLightJobTool$Wonderjs = require("../../../../tool/job/no_worker/loop/FrontRenderLightJobTool.js");
var TextureSourceMapService$Wonderjs = require("../../../../../src/service/primitive/texture/TextureSourceMapService.js");
var OperateGlTextureMapService$Wonderjs = require("../../../../../src/service/primitive/texture/OperateGlTextureMapService.js");
var InitBasicSourceTextureRenderWorkerTool$Wonderjs = require("./InitBasicSourceTextureRenderWorkerTool.js");
var RecordBasicSourceTextureRenderWorkerService$Wonderjs = require("../../../../../src/service/state/render_worker/texture/basic_source/RecordBasicSourceTextureRenderWorkerService.js");

function unsafeGetSource(texture, state) {
  var match = RecordBasicSourceTextureRenderWorkerService$Wonderjs.getRecord(state);
  return TextureSourceMapService$Wonderjs.unsafeGetSource(texture, match[/* sourceMap */8]);
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
  var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state);
  var map1 = match[1];
  var match$1 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match[0]);
  var map2 = match$1[1];
  var source1 = BasicSourceTextureTool$Wonderjs.buildSource(100, 200);
  var source2 = BasicSourceTextureTool$Wonderjs.buildSource(110, 210);
  var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(map1, source1, match$1[0]);
  var state$2 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(map2, source2, state$1);
  return /* tuple */[
          state$2,
          /* tuple */[
            map1,
            map2
          ],
          /* tuple */[
            source1,
            source2
          ]
        ];
}

function prepareStateAndCreateTwoMaps(sandbox) {
  var match = InitBasicSourceTextureRenderWorkerTool$Wonderjs.prepareState(sandbox, /* tuple */[
        11,
        12,
        13,
        14
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
            14
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

function prepareStateAndCreateTwoGameObjects(sandbox) {
  var match = InitBasicSourceTextureRenderWorkerTool$Wonderjs.prepareState(sandbox, /* tuple */[
        11,
        12,
        13,
        14
      ]);
  var match$1 = createTwoMaps(match[0]);
  var match$2 = match$1[2];
  var match$3 = match$1[1];
  var match$4 = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithDiffuseMap(sandbox, match$3[0], match$1[0]);
  var match$5 = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithDiffuseMap(sandbox, match$3[1], match$4[0]);
  var state = WorkerWorkerTool$Wonderjs.setFakeWorkersAndSetState(match$5[0]);
  var match$6 = CameraTool$Wonderjs.createCameraGameObject(state);
  return /* tuple */[
          match$6[0],
          match[1],
          /* tuple */[
            11,
            12,
            13,
            14
          ],
          /* tuple */[
            match$4[1],
            match$5[1]
          ],
          /* tuple */[
            match$4[5],
            match$5[5]
          ],
          /* tuple */[
            match$2[0],
            match$2[1]
          ]
        ];
}

function getTexture(texture, state) {
  return OperateGlTextureMapService$Wonderjs.getTexture(texture, RecordBasicSourceTextureRenderWorkerService$Wonderjs.getRecord(state)[/* glTextureMap */9]);
}

function setGlTexture(texture, glTexture, state) {
  OperateGlTextureMapService$Wonderjs.setTexture(texture, glTexture, RecordBasicSourceTextureRenderWorkerService$Wonderjs.getRecord(state)[/* glTextureMap */9]);
  return state;
}

exports.unsafeGetSource = unsafeGetSource;
exports.buildFakeCreateImageBitmapFunc = buildFakeCreateImageBitmapFunc;
exports.clearFakeCreateImageBitmapFunc = clearFakeCreateImageBitmapFunc;
exports.createTwoMaps = createTwoMaps;
exports.prepareStateAndCreateTwoMaps = prepareStateAndCreateTwoMaps;
exports.prepareStateAndCreateTwoGameObjects = prepareStateAndCreateTwoGameObjects;
exports.getTexture = getTexture;
exports.setGlTexture = setGlTexture;
/* buildFakeCreateImageBitmapFunc Not a pure module */
