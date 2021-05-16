'use strict';

var Most = require("most");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var StateAPI$Wonderjs = require("../../../../../src/api/StateAPI.js");
var SceneTool$Wonderjs = require("../../../../tool/service/scene/SceneTool.js");
var CameraTool$Wonderjs = require("../../../../tool/service/camera/CameraTool.js");
var TextureTool$Wonderjs = require("../../../../tool/service/texture/TextureTool.js");
var ArrayService$Wonderjs = require("../../../../../src/service/atom/ArrayService.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var RenderJobsTool$Wonderjs = require("../../../../tool/job/no_worker/loop/RenderJobsTool.js");
var BoxGeometryTool$Wonderjs = require("../../../../tool/service/geometry/BoxGeometryTool.js");
var CubemapTextureAPI$Wonderjs = require("../../../../../src/api/texture/CubemapTextureAPI.js");
var LightMaterialTool$Wonderjs = require("../../../../tool/service/material/LightMaterialTool.js");
var DirectionLightTool$Wonderjs = require("../../../../tool/service/light/DirectionLightTool.js");
var LoaderManagerSystem$Wonderjs = require("../../../../../src/asset/LoaderManagerSystem.js");
var AssembleWDBSystemTool$Wonderjs = require("../../../no_worker/asset/tool/AssembleWDBSystemTool.js");
var BasicSourceTextureAPI$Wonderjs = require("../../../../../src/api/texture/BasicSourceTextureAPI.js");
var NoWorkerJobConfigTool$Wonderjs = require("../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js");
var ReadStreamChunkSystem$Wonderjs = require("../../../../../src/asset/loader/ReadStreamChunkSystem.js");
var MutableSparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/MutableSparseMapService.js");
var LoadStreamWDBSetBinBufferChunkDataSystem$Wonderjs = require("../../../../../src/asset/loader/LoadStreamWDBSetBinBufferChunkDataSystem.js");

function load(wdbPath, fetchFunc, $staropt$star, $staropt$star$1, param) {
  var handleWhenLoadingFunc = $staropt$star !== undefined ? $staropt$star : (function (totalLoadedByteLength, contentLength, wdbPath) {
        return /* () */0;
      });
  var handleWhenLoadWholeWDBFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : (function (state, param, rootGameObject) {
        return /* () */0;
      });
  return Most.drain(LoaderManagerSystem$Wonderjs.loadStreamWDB(wdbPath, /* tuple */[
                  fetchFunc,
                  handleWhenLoadingFunc,
                  (function (state, rootGameObject) {
                      return state;
                    }),
                  (function (state, rootGameObject) {
                      return state;
                    }),
                  handleWhenLoadWholeWDBFunc
                ], MainStateTool$Wonderjs.unsafeGetState(/* () */0)));
}

function read(param, reader) {
  return ReadStreamChunkSystem$Wonderjs.read(/* tuple */[
              param[0],
              param[1],
              /* tuple */[
                0,
                "",
                (function (totalLoadedByteLength, contentLength, wdbPath) {
                    return /* () */0;
                  })
              ],
              param[2],
              param[3]
            ], /* tuple */[
              /* array */[],
              new Uint8Array(1000000)
            ], /* tuple */[
              undefined,
              /* array */[],
              undefined,
              0,
              /* array */[],
              MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
            ], reader);
}

function readWithHandleWhenLoadingFunc(param, reader) {
  var match = param[2];
  return ReadStreamChunkSystem$Wonderjs.read(/* tuple */[
              param[0],
              param[1],
              /* tuple */[
                match[0],
                match[1],
                match[2]
              ],
              param[3],
              param[4]
            ], /* tuple */[
              /* array */[],
              new Uint8Array(1000000)
            ], /* tuple */[
              undefined,
              /* array */[],
              undefined,
              0,
              /* array */[],
              MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
            ], reader);
}

var _getAllDiffuseMaps = AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps;

function getAllDiffuseMapSources(rootGameObject, state) {
  return AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(rootGameObject, state).map((function (diffuseMap) {
                return BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureSource(diffuseMap, state);
              }));
}

function getSkyboxCubemapSourceArr(rootGameObject, state) {
  var match = SceneTool$Wonderjs.getCubemapTexture(state);
  if (match !== undefined) {
    var cubemapTexture = match;
    return /* array */[
            CubemapTextureAPI$Wonderjs.unsafeGetCubemapTexturePXSource(cubemapTexture, state),
            CubemapTextureAPI$Wonderjs.unsafeGetCubemapTextureNXSource(cubemapTexture, state),
            CubemapTextureAPI$Wonderjs.unsafeGetCubemapTexturePYSource(cubemapTexture, state),
            CubemapTextureAPI$Wonderjs.unsafeGetCubemapTextureNYSource(cubemapTexture, state),
            CubemapTextureAPI$Wonderjs.unsafeGetCubemapTexturePZSource(cubemapTexture, state),
            CubemapTextureAPI$Wonderjs.unsafeGetCubemapTextureNZSource(cubemapTexture, state)
          ];
  } else {
    return /* array */[];
  }
}

function getSkyboxCubemapSourceAndAllDiffuseMapSourcesArr(rootGameObject, state) {
  return ArrayService$Wonderjs.fastConcat(getSkyboxCubemapSourceArr(rootGameObject, state), getAllDiffuseMapSources(rootGameObject, state));
}

function createGameObjectWithDiffuseMap(state) {
  var match = LightMaterialTool$Wonderjs.createGameObjectWithDiffuseMap(state);
  var gameObject1 = match[1];
  var match$1 = BoxGeometryTool$Wonderjs.createBoxGeometry(match[0]);
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject1, match$1[1], match$1[0]);
  return /* tuple */[
          state$1,
          gameObject1,
          match[2]
        ];
}

function prepareStateForSkybox(sandbox) {
  return RenderJobsTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n[\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"preget_glslData\"\n        },\n        {\n          \"name\": \"init_no_material_shader\"\n        },\n        {\n          \"name\": \"init_texture\"\n        },\n        {\n          \"name\": \"init_skybox\"\n        }\n        ]\n    }\n]\n        ", "\n[\n    {\n        \"name\": \"default\",\n        \"jobs\": [\n            {\n                \"name\": \"get_camera_data\"\n            },\n            {\n                \"name\": \"render_skybox\"\n            }\n        ]\n    }\n]\n        ", NoWorkerJobConfigTool$Wonderjs.buildNoWorkerInitJobConfigWithoutInitMain(/* () */0), NoWorkerJobConfigTool$Wonderjs.buildNoWorkerLoopJobConfig(/* () */0), /* () */0));
}

function buildChunkData(arrayBuffer, $staropt$star, param) {
  var done_ = $staropt$star !== undefined ? $staropt$star : false;
  return Promise.resolve({
              done: done_,
              value: arrayBuffer !== undefined ? new Uint8Array(Caml_option.valFromOption(arrayBuffer)) : -1
            });
}

function getDefault11Image(param) {
  return TextureTool$Wonderjs.buildSource(undefined, undefined, "default", /* () */0);
}

function prepareWithReadStub(sandbox, readStub, state) {
  var default11Image = getDefault11Image(/* () */0);
  StateAPI$Wonderjs.setState(state);
  var handleBeforeStartLoop = function (state, rootGameObject) {
    var match = DirectionLightTool$Wonderjs.createGameObject(state);
    return CameraTool$Wonderjs.createCameraGameObject(match[0])[0];
  };
  var handleWhenDoneFunc = function (state, rootGameObject) {
    return state;
  };
  return /* tuple */[
          default11Image,
          readStub,
          handleBeforeStartLoop,
          handleWhenDoneFunc,
          state
        ];
}

function buildController(sandbox) {
  return {
          close: Sinon.createEmptyStubWithJsObjSandbox(sandbox)
        };
}

function buildReader(readStub) {
  return {
          read: readStub
        };
}

var setImageData = LoadStreamWDBSetBinBufferChunkDataSystem$Wonderjs._setImageData;

exports.load = load;
exports.read = read;
exports.readWithHandleWhenLoadingFunc = readWithHandleWhenLoadingFunc;
exports.setImageData = setImageData;
exports._getAllDiffuseMaps = _getAllDiffuseMaps;
exports.getAllDiffuseMapSources = getAllDiffuseMapSources;
exports.getSkyboxCubemapSourceArr = getSkyboxCubemapSourceArr;
exports.getSkyboxCubemapSourceAndAllDiffuseMapSourcesArr = getSkyboxCubemapSourceAndAllDiffuseMapSourcesArr;
exports.createGameObjectWithDiffuseMap = createGameObjectWithDiffuseMap;
exports.prepareStateForSkybox = prepareStateForSkybox;
exports.buildChunkData = buildChunkData;
exports.getDefault11Image = getDefault11Image;
exports.prepareWithReadStub = prepareWithReadStub;
exports.buildController = buildController;
exports.buildReader = buildReader;
/* most Not a pure module */
