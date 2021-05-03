

import * as Most from "most";
import * as SceneTool$Wonderjs from "../../../../tool/service/scene/SceneTool.js";
import * as ArrayService$Wonderjs from "../../../../../src/service/atom/ArrayService.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as RenderJobsTool$Wonderjs from "../../../../tool/job/no_worker/loop/RenderJobsTool.js";
import * as BoxGeometryTool$Wonderjs from "../../../../tool/service/geometry/BoxGeometryTool.js";
import * as CubemapTextureAPI$Wonderjs from "../../../../../src/api/texture/CubemapTextureAPI.js";
import * as LightMaterialTool$Wonderjs from "../../../../tool/service/material/LightMaterialTool.js";
import * as LoaderManagerSystem$Wonderjs from "../../../../../src/asset/LoaderManagerSystem.js";
import * as AssembleWDBSystemTool$Wonderjs from "../../../no_worker/asset/tool/AssembleWDBSystemTool.js";
import * as BasicSourceTextureAPI$Wonderjs from "../../../../../src/api/texture/BasicSourceTextureAPI.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";
import * as ReadStreamChunkSystem$Wonderjs from "../../../../../src/asset/loader/ReadStreamChunkSystem.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as LoadStreamWDBSetBinBufferChunkDataSystem$Wonderjs from "../../../../../src/asset/loader/LoadStreamWDBSetBinBufferChunkDataSystem.js";

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

var setImageData = LoadStreamWDBSetBinBufferChunkDataSystem$Wonderjs._setImageData;

export {
  load ,
  read ,
  readWithHandleWhenLoadingFunc ,
  setImageData ,
  _getAllDiffuseMaps ,
  getAllDiffuseMapSources ,
  getSkyboxCubemapSourceArr ,
  getSkyboxCubemapSourceAndAllDiffuseMapSourcesArr ,
  createGameObjectWithDiffuseMap ,
  prepareStateForSkybox ,
  
}
/* most Not a pure module */
